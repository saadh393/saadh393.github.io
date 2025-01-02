import React from "react";
import BlogLayout from "@/components/blogPage/BlogLayout";
import CachingVisualizer from "@/components/blogPage/CachingVisualizer";
import metaData from "./metaData";

export const metadata = metaData;

const HttpCachingBlog = () => {
  return (
    <BlogLayout>
      <article className="mx-auto px-4">
        <header className="max-w-[815px] mx-auto mb-12">
          <h1 className="text-4xl font-bold text-center mb-4">
            HTTP Caching in Node.js with Undici
          </h1>
          <p className="text-center text-gray-600">
            Learn how to implement efficient HTTP caching in Node.js
            applications
          </p>
        </header>

        <section className="prose mx-auto prose-invert prose-lg prose-h2:text-primary">
          <p>
            HTTP caching is a game-changer when building performant
            applications, as it reduces response times and server load. While it
            has long been a staple for browsers and CDNs, bringing client-side
            HTTP caching to Node.js has been a missing piece &mdash; until the
            arrival of <strong>Undici v7.0.0</strong>.
          </p>

          <CachingVisualizer />

          <h2>What is Undici?</h2>
          <p>
            <a
              href="https://undici.nodejs.org/"
              className="text-primary hover:text-primary/80"
            >
              Undici
            </a>{" "}
            is an HTTP/1.1 client built specifically for Node.js. It powers the{" "}
            <code>fetch()</code> implementation in Node.js and is written
            entirely in JavaScript, providing an efficient and modern approach
            to handling HTTP requests.
          </p>

          <h2>Understanding HTTP Caching</h2>
          <p>
            Caching allows responses to HTTP requests to be stored and reused.
            This avoids repeated requests to the origin server, saving time and
            resources. By caching responses effectively:
          </p>
          <ul>
            <li>
              Applications become faster as cached responses are served locally
              or from intermediate storage.
            </li>
            <li>
              Server load is distributed as cached responses reduce direct hits
              to the origin server.
            </li>
            <li>
              Resources like bandwidth and computational effort are saved.
            </li>
          </ul>

          <h2>How to Enable HTTP Caching in Node.js</h2>
          <p>
            The caching functionality in Undici is opt-in and can be integrated
            using interceptors. Here&apos;s a simple way to enable it:
          </p>

          <pre>
            <code className="language-javascript">{`import { getGlobalDispatcher, setGlobalDispatcher, interceptors, request } from &apos;undici&apos;;

setGlobalDispatcher(getGlobalDispatcher().compose(
  interceptors.cache({ /* optional configuration */ })
));

// Make a request
await request(&apos;http://localhost:3000&apos;);

// Alternatively, with fetch()
await fetch(&apos;http://localhost:3000&apos;);`}</code>
          </pre>

          <h3>Configuration Options</h3>
          <p>You can configure the cache interceptor using various options:</p>
          <ul>
            <li>
              <strong>store</strong>: Defines the underlying cache store, such
              as memory or SQLite.
            </li>
            <li>
              <strong>methods</strong>: Specifies the HTTP methods to cache
              (e.g., GET).
            </li>
            <li>
              <strong>cacheByDefault</strong>: Sets a default duration for
              caching responses without explicit expiration.
            </li>
            <li>
              <strong>type</strong>: Determines the type of cache (e.g., private
              or shared).
            </li>
          </ul>

          <h2>Cache Stores</h2>
          <p>Undici provides two types of cache stores:</p>
          <ol>
            <li>
              <strong>In-Memory Store</strong>: Stores cached responses in
              memory for quick access.
            </li>
            <li>
              <strong>SQLite Store</strong>: Uses the experimental SQLite API to
              store cached responses in a database.
            </li>
          </ol>

          <pre>
            <code className="language-javascript">{`import { setGlobalDispatcher, getGlobalDispatcher, interceptors, cacheStores } from &apos;undici&apos;;

setGlobalDispatcher(getGlobalDispatcher().compose(
  interceptors.cache({
    store: new cacheStores.SqliteCacheStore({ location: &apos;./cache.db&apos; })
  })
));

const res = await fetch(&apos;http://localhost:3000&apos;);
console.log(await res.text());`}</code>
          </pre>

          <h2>Testing Caching Behavior</h2>
          <p>Here&apos;s a basic Node.js server to test caching:</p>

          <pre>
            <code className="language-javascript">{`import { createServer } from &apos;node:http&apos;;

let count = 0;
const server = createServer((req, res) => {
  console.log(&apos;Request:&apos;, req.url);
  res.setHeader(&apos;Cache-Control&apos;, &apos;public, max-age=60&apos;);
  res.end(&apos;Hello World &apos; + count++);
});

server.listen(3000);`}</code>
          </pre>

          <h2>Why This Matters</h2>
          <p>
            This new caching feature is a significant milestone for Node.js. It
            brings a standards-compliant solution for client-side HTTP caching,
            empowering developers to build faster and more resilient
            applications. By reducing server load and enhancing response times,
            it&apos;s a step forward in optimizing performance and resource
            utilization.
          </p>

          <h2>Conclusion</h2>
          <p>
            With the introduction of HTTP caching in Undici v7.0.0, Node.js
            developers now have a robust tool to improve application
            performance. Whether you&apos;re working on APIs, web services, or
            distributed systems, this feature enables better resource management
            and faster user experiences. Start experimenting with it today to
            unlock new levels of efficiency in your Node.js projects.
          </p>
        </section>
      </article>
    </BlogLayout>
  );
};

export default HttpCachingBlog;
