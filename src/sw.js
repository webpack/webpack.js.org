/* eslint-disable import/no-extraneous-dependencies */
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { cacheNames } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import {
  registerRoute,
  setCatchHandler,
  setDefaultHandler,
} from "workbox-routing";
import {
  NetworkFirst,
  NetworkOnly,
  StaleWhileRevalidate,
} from "workbox-strategies";
/* eslint-enable import/no-extraneous-dependencies */

const cacheName = cacheNames.runtime;

const manifest = self.__WB_MANIFEST;
const otherManifest = [
  {
    url: "/manifest.json",
  },
  {
    url: "/app-shell/index.html",
  },
];
const manifestURLs = [...manifest, ...otherManifest].map((entry) => {
  const url = new URL(entry.url, self.location);
  return url.href;
});
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);

      await Promise.all(
        manifestURLs.map(async (url) => {
          try {
            const response = await fetch(url, { cache: "no-store" });
            if (response && response.ok) {
              await cache.put(url, response);
            }
          } catch (err) {
            console.warn("[sw] Failed to precache:", url, err);
          }
        }),
      );
    })(),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.keys().then((keys) => {
        for (const request of keys) {
          if (!manifestURLs.includes(request.url)) {
            cache.delete(request);
          }
        }
      });
    })
  );
});

registerRoute(
  ({ url }) => manifestURLs.includes(url.href),
  new NetworkFirst({
    cacheName,
  }),
);

// Cache Google Fonts
registerRoute(
  /https:\/\/fonts\.gstatic\.com/,
  new StaleWhileRevalidate({
    cacheName: "google-fonts-cache",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        // Cache for one year
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  }),
);

setDefaultHandler(new NetworkOnly());

// fallback to app-shell for document request
setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case "document":
      return caches.match("/app-shell/index.html");
    default:
      return Response.error();
  }
});
