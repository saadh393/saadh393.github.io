The guided flow can emit `offer_type_bn`, while the campaign listing page reads and forwards only `offer_type_en`. Normalize both languages to one backend filter key or extend the listing page to support both.

### Recommended next improvements

| Priority | Improvement | Reason |
| --- | --- | --- |
| P1 | Enable strict TypeScript incrementally and remove `ignoreBuildErrors` | Prevents production builds from accepting known type failures |
| P1 | Make lint pass and enforce it in CI | Restores a reliable merge/deploy gate |
| P1 | Add tests for pure business logic and critical routes | Protects filtering, localization, and campaign discovery |
| P1 | Move every deployment secret to environment storage | Prevents account compromise and unsafe repository sharing |
| P2 | Replace direct client Nominatim calls with a cached, rate-limited server endpoint | Improves provider-policy compliance and high-traffic reliability |
| P2 | Avoid plain-HTTP upstream IP geolocation | Protects data in transit from the application server |
| P2 | Narrow the CSP `connect-src` policy | Reduces the allowed exfiltration surface |
| P2 | Re-enable Next.js image optimization where infrastructure permits | Can reduce image bandwidth and improve responsive delivery |
| P2 | Remove the duplicate npm lockfile and standardize on pnpm | Avoids dependency-resolution drift |
| P2 | Remove legacy, commented, unused, and misspelled modules | Lowers maintenance cost and lint noise |
| P2 | Add resilient error handling to thin proxy routes | Prevents malformed upstream responses from becoming unhandled failures |
| P3 | Align README environment names with the actual code | The README uses a different API-base variable name from the implementation |
| P3 | Document data ownership and campaign publishing workflow | Makes content freshness and cache invalidation operationally clear |

## 16. Verification snapshot

### Local repository checks on 3 September 2026

| Check | Result |
| --- | --- |
| `pnpm build` | Passed |
| Production compilation | Passed in approximately 5.1 seconds |
| Static page generation | Completed, with a non-fatal backend `/banners` fetch failure during the local build |
| Route output | 14 dynamic App Router endpoints plus middleware |
| Type validation | Skipped by project configuration |
| `pnpm lint` | Failed with 39 errors and 45 warnings |
| Automated tests | None found |
| Existing user change preserved | `src/constant/sentry.ts` was already modified and was not changed during this analysis |

### Live-product checks on 3 September 2026

- The home page returned HTTP 200.
- Cloudflare reported a cache hit.
- The response identified Next.js as the application runtime.
- The live home page exposed Bengali and English switching.
- The live content included current campaign, category, terms, and guided-offer experiences.
- Security headers included CSP, HSTS, frame denial, MIME-sniffing protection, referrer policy, and permissions policy.

## 17. Evidence map

| Claim | Evidence |
| --- | --- |
| Product is live | [offer-finder.com](https://offer-finder.com/) |
| Bengali-first categories and Offer Guide | Live home page and local home/smart-filter components |
| Campaign, coupon, merchant, and terms content | Live campaign and terms pages plus local feature modules |
| 2.2M Bangladesh active users | Supplied GA4 screenshot for 4 August–2 September 2026 |
| Next.js 16 and React 19 | `package.json` |
| Server rendering and App Router | `src/app` routes and production build output |
| Bilingual route reuse | `src/proxy.ts`, language context, dictionaries, and localized links |
| Server-backed bounded search | Navigation search, `/api/brands`, and brand service |
| Paginated campaign brands | Campaign page, campaign-brand API route, and pagination hook |
| Cache and security policy | `next.config.ts` and live response headers |
| Sentry monitoring | Instrumentation and browser/server/edge Sentry configuration |
| Blue/green deployment | `deploy.sh`, Dockerfile, cluster server, and health route |

## 18. Interview talking points

### Why Next.js App Router?

The project is content-heavy and benefits from server-rendered campaign pages, dynamic metadata, server-side data access, route handlers, Suspense streaming, and cache revalidation in one framework.

### What was the most important performance change?

The strongest code-evidenced change was bounding data transfer. Merchant search stopped downloading more than 15 MB to the browser, and campaign pages stopped requesting approximately 12 MB of brand data in one response. Server filtering, field selection, cancellation, pagination, and streaming address both network cost and Node worker pressure.

### How does localization work?

Bengali is the default route. English uses `/en`, which middleware rewrites internally to the same page tree while attaching an `x-lang` header. Server code loads the correct dictionary, and the client language context changes localized content and URLs.

### How does location discovery work?

Users can select a district/thana manually or grant browser location permission. Coordinates are reverse-geocoded, then fuzzy-matched against backend-provided offer locations. The selected location narrows categories and offer types before generating a filtered campaign URL.

### How is high traffic handled?

The application layers Cloudflare delivery, shared HTML caching, Next.js data caching, bounded API responses, request timeouts, multiple Node workers, health checks, and blue/green deployment. The analytics screenshot provides audience scale, while request-volume and latency claims require separate CDN or APM evidence.

### What would be improved next?

The first priorities are credential rotation, a passing lint/type gate, targeted automated tests, analytics validation, and correction of the Bengali offer-type filter. Those changes improve security and correctness without changing the product architecture.

## 19. Publication checklist

- [ ] Replace the project-role placeholder with the exact personal contribution.
- [ ] Confirm permission to use the bKash name, brand assets, and screenshots in a public portfolio.
- [ ] Rotate and purge the committed deployment credential before sharing repository access.
- [ ] Confirm that the GA4 metric is deduplicated and safe to publish.
- [ ] Label 2.2M as active users, not requests or transactions.
- [ ] Add desktop and mobile product screenshots.
- [ ] Add one architecture image only if the portfolio layout benefits from it.
- [ ] Include the live product link.
- [ ] Avoid unsupported revenue, conversion, uptime, or latency claims.
- [ ] Remove internal hostnames, key paths, and operational commands from any public README.

## 20. Recommended final portfolio version

> **Offer Finder** is a bilingual, location-aware discovery platform that helps bKash customers find active discounts, cashback campaigns, coupon codes, participating merchants, and eligible outlets across Bangladesh. I built the Next.js frontend with server-rendered discovery, Bengali/English routing, debounced brand search, GPS-assisted filtering, campaign and merchant detail experiences, analytics, and production monitoring. For high-traffic delivery, I introduced bounded and paginated API queries, Suspense streaming, one-hour application/CDN caching, request timeouts, clustered Node workers, and a health-checked blue/green Docker deployment behind Nginx and Cloudflare. According to the supplied GA4 User attributes report, the product served approximately **2.2 million active users from Bangladesh during 4 August–2 September 2026**.
