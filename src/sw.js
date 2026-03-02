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

const allManifestURLs = [
  new Set(
    [...manifest, ...otherManifest].map(
      (entry) => new URL(entry.url, self.location).href,
    ),
  ),
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);

      // Optional assets: don't fail SW install if these fail
      await Promise.allSettled(allManifestURLs.map((url) => cache.add(url)));
    })(),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      // clean up those who are not listed in manifestURLs
      const keys = await cache.keys();
      for (const request of keys) {
        if (!allManifestURLs.includes(request.url)) {
          await cache.delete(request);
        }
      }
    })(),
  );
});
registerRoute(
  ({ url }) => allManifestURLs.includes(url.href),
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
