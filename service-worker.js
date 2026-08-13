const CACHE_NAME = "skyfire-quality-cache-v1";
const CACHE_VERSION = "quality-v1";

const SHELL_CACHE = [
  "./",
  `./index.html?v=${CACHE_VERSION}`,
  `./styles.css?v=${CACHE_VERSION}`,
  "./feedback.css",
  `./app.js?v=${CACHE_VERSION}`,
  `./risk-matrix.js?v=${CACHE_VERSION}`,
  "./feedback.js",
  `./mobile-quality.js?v=${CACHE_VERSION}`,
  `./ppm-guidance.js?v=${CACHE_VERSION}`,
  `./manifest.json?v=${CACHE_VERSION}`,
  "./Icons/icon-192.png",
  "./Icons/icon-512.png",
  "./Icons/lynx-logo.png",
  "./Icons/mss-logo.png",
  "./Icons/skyfire-logo.jpg",
  "./docs/SkyFire-Risk-Matrix.png",
  "./docs/MSHA-form-2000-7.pdf",
  "./docs/MSHA-form-2000-38.pdf",
  "./docs/MSHA-form-2000-224.pdf",
  "./docs/MSHA-form-2000-238.pdf",
  "./docs/MSHA-form-4000-9.pdf",
  "./docs/MSHA-form-5000-1.pdf",
  "./docs/MSHA-form-5000-3.pdf",
  "./docs/MSHA-form-5000-23.pdf",
  "./docs/MSHA-form-5000-41.pdf",
  "./docs/MSHA-form-5000-46.pdf",
  "./docs/MSHA-form-7000-1.pdf",
  "./docs/MSHA-form-7000-2.pdf",
  "./docs/MSHA-form-7000-51.pdf",
  "./docs/MSHA-form-7000-52.pdf"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const asset of SHELL_CACHE) {
        try {
          await cache.add(asset);
        } catch (error) {
          console.warn("Install cache skipped:", asset, error);
        }
      }
    })()
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );

      await self.clients.claim();

      const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of clients) {
        client.postMessage({
          type: "SW_UPDATED",
          cacheName: CACHE_NAME
        });
      }
    })()
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  const isNavigation = request.mode === "navigate";
  const isShellAsset =
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/styles.css") ||
    url.pathname.endsWith("/feedback.css") ||
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/risk-matrix.js") ||
    url.pathname.endsWith("/feedback.js") ||
    url.pathname.endsWith("/mobile-quality.js") ||
    url.pathname.endsWith("/ppm-guidance.js") ||
    url.pathname.endsWith("/manifest.json") ||
    url.pathname.includes("/Icons/");

  const isDataFile =
    url.pathname.includes("/Data/") &&
    url.pathname.endsWith(".xml");

  const isDocumentFile =
    url.pathname.includes("/docs/") &&
    (url.pathname.endsWith(".pdf") || url.pathname.endsWith(".png"));

  if (isNavigation || isShellAsset) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);

        try {
          const fresh = await fetch(request, { cache: "no-store" });
          cache.put(request, fresh.clone()).catch(() => {});
          return fresh;
        } catch (error) {
          const cached =
            (await cache.match(request)) ||
            (await cache.match(url.pathname, { ignoreSearch: true })) ||
            (isNavigation ? await cache.match("./") : null);

          if (cached) return cached;

          return new Response("Offline content not available yet.", {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "text/plain" }
          });
        }
      })()
    );
    return;
  }

  if (isDataFile || isDocumentFile) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request) || await cache.match(url.pathname, { ignoreSearch: true });

        if (cached) {
          fetch(request, { cache: "no-store" })
            .then(response => {
              if (response && response.ok) {
                cache.put(request, response.clone()).catch(() => {});
              }
            })
            .catch(() => {});

          return cached;
        }

        try {
          const fresh = await fetch(request, { cache: "no-store" });
          if (fresh && fresh.ok) {
            cache.put(request, fresh.clone()).catch(() => {});
          }
          return fresh;
        } catch (error) {
          return new Response("Offline file not available yet.", {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "text/plain" }
          });
        }
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        const fresh = await fetch(request);
        cache.put(request, fresh.clone()).catch(() => {});
        return fresh;
      } catch (error) {
        const cached = await cache.match(request) || await cache.match(url.pathname, { ignoreSearch: true });
        if (cached) return cached;

        return new Response("Offline content not available yet.", {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "text/plain" }
        });
      }
    })()
  );
});