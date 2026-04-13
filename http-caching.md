# HTTP Caching in Node.js with Undici

HTTP caching is a game-changer when building performant applications, as it reduces response times and server load. While it has long been a staple for browsers and CDNs, bringing client-side HTTP caching to Node.js has been a missing piece — until the arrival of **Undici v7.0.0**.

### HTTP Caching Visualization

#### Initial Request

Client makes a request to the server through Undici

## What is Undici?

[Undici](https://undici.nodejs.org/) is an HTTP/1.1 client built specifically for Node.js. It powers the `fetch()` implementation in Node.js and is written entirely in JavaScript, providing an efficient and modern approach to handling HTTP requests.

## Understanding HTTP Caching

Caching allows responses to HTTP requests to be stored and reused. This avoids repeated requests to the origin server, saving time and resources. By caching responses effectively:

- Applications become faster as cached responses are served locally or from intermediate storage.
- Server load is distributed as cached responses reduce direct hits to the origin server.
- Resources like bandwidth and computational effort are saved.

## How to Enable HTTP Caching in Node.js

The caching functionality in Undici is opt-in and can be integrated using interceptors. Here's a simple way to enable it:

```
import { getGlobalDispatcher, setGlobalDispatcher, interceptors, request } from &apos;undici&apos;;

setGlobalDispatcher(getGlobalDispatcher().compose(
  interceptors.cache({ /* optional configuration */ })
));

// Make a request
await request(&apos;http://localhost:3000&apos;);

// Alternatively, with fetch()
await fetch(&apos;http://localhost:3000&apos;);
```

### Configuration Options

You can configure the cache interceptor using various options:

- **store**: Defines the underlying cache store, such as memory or SQLite.
- **methods**: Specifies the HTTP methods to cache (e.g., GET).
- **cacheByDefault**: Sets a default duration for caching responses without explicit expiration.
- **type**: Determines the type of cache (e.g., private or shared).

## Cache Stores

Undici provides two types of cache stores:

1.  **In-Memory Store**: Stores cached responses in memory for quick access.
2.  **SQLite Store**: Uses the experimental SQLite API to store cached responses in a database.

```
import { setGlobalDispatcher, getGlobalDispatcher, interceptors, cacheStores } from &apos;undici&apos;;

setGlobalDispatcher(getGlobalDispatcher().compose(
  interceptors.cache({
    store: new cacheStores.SqliteCacheStore({ location: &apos;./cache.db&apos; })
  })
));

const res = await fetch(&apos;http://localhost:3000&apos;);
console.log(await res.text());
```

## Testing Caching Behavior

Here's a basic Node.js server to test caching:

```
import { createServer } from &apos;node:http&apos;;

let count = 0;
const server = createServer((req, res) => {
  console.log(&apos;Request:&apos;, req.url);
  res.setHeader(&apos;Cache-Control&apos;, &apos;public, max-age=60&apos;);
  res.end(&apos;Hello World &apos; + count++);
});

server.listen(3000);
```

## Why This Matters

This new caching feature is a significant milestone for Node.js. It brings a standards-compliant solution for client-side HTTP caching, empowering developers to build faster and more resilient applications. By reducing server load and enhancing response times, it's a step forward in optimizing performance and resource utilization.

## Conclusion

With the introduction of HTTP caching in Undici v7.0.0, Node.js developers now have a robust tool to improve application performance. Whether you're working on APIs, web services, or distributed systems, this feature enables better resource management and faster user experiences. Start experimenting with it today to unlock new levels of efficiency in your Node.js projects.
