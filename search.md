Semantic search API for Amazon-style product data. Two-stage retrieval: vector search + optional LLM reranking.

## Quick Start

```bash
# Run the API server
uvicorn app.api:app --reload

# Ingest product data into Pinecone
python -m scripts.ingest

# Run one-off scripts
python -m scripts.test_search
python -m scripts.test_rerank
```

## Environment

Requires a `.env` file with:

```
PINECONE_API_KEY=...
GEMINI_API_KEY=...
```

## Architecture

```
HTTP Request
     │
     ▼
┌─────────────────────────────────────────────┐
│  app/api.py                                 │
│  /search endpoint                           │
│  - validates query, top_k, price_max,       │
│    min_rating, rerank params                 │
│  - catches RateLimitError → HTTP 429        │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  app/search.py                              │
│  1. Rate limit check (30 req / 60s)        │
│  2. Cache lookup (LRU, SHA-256 key, 1h TTL)│
│  3. embed_query → Gemini embedding          │
│  4. query_index → Pinecone vector search    │
│  5. Apply metadata filters                  │
│  6. Format results                          │
│  7. Cache set                               │
│  + optional rerank step                     │
└──────────────────┬──────────────────────────┘
                   │
          ┌────────┴────────┐
          ▼                 ▼
   ┌──────────────┐  ┌──────────────────┐
   │ search()     │  │ search_with_     │
   │ direct flow  │  │ rerank()         │
   └──────────────┘  │ 1. call search() │
                     │    (retrive_k=20)│
                     │ 2. call rerank() │
                     └────────┬─────────┘
                              ▼
                     ┌──────────────────┐
                     │ app/reranker.py  │
                     │ Gemini cross-    │
                     │ encoder scoring  │
                     │ returns top_k    │
                     └──────────────────┘
```

### Request Flow (detailed)

```
GET /search?q=<query>&top_k=5&price_max=100&min_rating=4&rerank=true

api.py
 └── search_with_rerank (rerank=True)
      └── search(query, top_k=20)          ← retrive_k=20 for reranking
           ├── api_limiter.allow()         ← RateLimiter, 30/60s
           ├── search_cache.get()          ← LRU + TTL cache
           ├── embed_query(query)          ← Gemini embedding-001
           ├── query_index(vector)         ← Pinecone ANN search
           │    └── filters: price $lte, avg_rating $gte
           ├── format matches
           └── search_cache.set()

      └── rerank(query, raw_results)      ← Gemini 3.1-flash-lite
           └── returns sorted by rerank_score
```

### Data Ingestion Flow

```
scripts/clean_data.py
 └── raw/amazon_products.csv → data/clean/products_clean.csv
      ├── dedup by title
      ├── clean price (strip $, commas)
      ├── clean rating
      └── rename columns

app/ingestion.py
 └── load_clean_data()
      ├── embed_texts(batch) → Gemini embedding-001
      └── index.upsert(records) → Pinecone
           └── BATCH_SIZE=50, 2s sleep between batches
```

## File Reference

| File                        | Responsibility                                                             |
| --------------------------- | -------------------------------------------------------------------------- |
| `app/api.py`                | FastAPI app, `/` static UI, `/health`, `/search` endpoint, lifespan warmup |
| `app/search.py`             | `search()` and `search_with_rerank()` — orchestrates full pipeline         |
| `app/embedding.py`          | `embed_query()` / `embed_texts()` — Gemini `gemini-embedding-001`          |
| `app/pinecone.py`           | Lazy singleton index, `query_index()`, `create_index_if_not_exists()`      |
| `app/reranker.py`           | `rerank()` — Gemini `gemini-3.1-flash-lite-preview` cross-encoder scoring  |
| `app/cache.py`              | `SearchCache` — SHA-256 key, LRU eviction, 1h TTL, 500 max entries         |
| `app/rate_limiter.py`       | `RateLimiter` — sliding window, 30 req/60s. `RateLimitError` exception     |
| `app/config.py`             | Loads `.env`, exposes `PINECONE_API_KEY`, `GEMINI_API_KEY`                 |
| `app/perf.py`               | `@timed` decorator — logs function name + execution time in ms             |
| `app/ingestion.py`          | `ingest()` — batches CSV, embeds titles, upserts to Pinecone               |
| `scripts/clean_data.py`     | Cleans raw CSV → `data/clean/products_clean.csv`                           |
| `scripts/ingest.py`         | CLI entrypoint: calls `ingest()`                                           |
| `scripts/test_search.py`    | Dry-run search queries                                                     |
| `scripts/test_rerank.py`    | Dry-run reranking                                                          |
| `scripts/test_embedding.py` | Dry-run embeddings                                                         |
| `scripts/setup_pinecone.py` | Create index if not exists                                                 |
| `static/index.html`         | Search UI served at `/`                                                    |

## Pinecone Index Config

- **Index name:** `support-assistant`
- **Dimension:** 3072 (gemini-embedding-001 output)
- **Metric:** cosine
- **Spec:** serverless, AWS ap-southeast-1

## Metadata Schema (Pinecone)

Each vector metadata:

```python
{
    "title": str,       # product name
    "url": str,         # product page URL
    "price": float,     # price in USD
    "avg_rating": float, # 0-5 star rating
    "num_ratings": int,  # number of ratings
    "color": str,        # color category
}
```

## Query-Time Filters

| Filter       | Field        | Operator |
| ------------ | ------------ | -------- |
| `price_max`  | `price`      | `$lte`   |
| `min_rating` | `avg_rating` | `$gte`   |

## Caching

- **Key:** SHA-256 of `query.lower().strip() | sorted(kwargs.items())`
- **Scope:** per query + filter param combination
- **TTL:** 3600s (1 hour)
- **Max entries:** 500 (LRU eviction)
