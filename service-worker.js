const CACHE_NAME = "skyfire-cfr-cache-v3";
const APP_BASE = "/skyfire-safety-library/";

const CORE_FILES = [
  `${APP_BASE}`,
  `${APP_BASE}index.html`,
  `${APP_BASE}styles.css`,
  `${APP_BASE}app.js`,
  `${APP_BASE}manifest.json`,
  `${APP_BASE}Icons/icon-192.png`,
  `${APP_BASE}Icons/icon-512.png`,
  `${APP_BASE}Data/ECFR-title30.xml`
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE_FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);

  if (!requestUrl.pathname.startsWith(APP_BASE)) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(`${APP_BASE}index.html`, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          return caches.match(`${APP_BASE}index.html`);
        })
    );
    return;
  }

  if (
    requestUrl.pathname.endsWith("styles.css") ||
    requestUrl.pathname.endsWith("app.js") ||
    requestUrl.pathname.endsWith("manifest.json") ||
    requestUrl.pathname.endsWith("service-worker.js")
  ) {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  if (
    requestUrl.pathname.endsWith(".png") ||
    requestUrl.pathname.endsWith(".jpg") ||
    requestUrl.pathname.endsWith(".jpeg") ||
    requestUrl.pathname.endsWith(".xml")
  ) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          fetch(request)
            .then(networkResponse => {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, networkResponse.clone());
              });
            })
            .catch(() => {});
          return cachedResponse;
        }

        return fetch(request).then(networkResponse => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return networkResponse;
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
