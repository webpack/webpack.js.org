import { cacheNames } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import {
  NetworkFirst,
  StaleWhileRevalidate,
  NetworkOnly,
} from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { setCatchHandler, setDefaultHandler } from 'workbox-routing';

const cacheName = cacheNames.runtime;

const manifest = self.__WB_MANIFEST;
const otherManifest = [
  {
    url: '/manifest.json',
  },
  {
    url: '/app-shell/index.html',
  },
];
const manifestURLs = [...manifest, ...otherManifest].map((entry) => {
  const url = new URL(entry.url, self.location);
  return url.href;
});
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(manifestURLs);
    })
  );
});

self.addEventListener('activate', (event) => {
  // - [x] clean up outdated runtime cache
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      // clean up those who are not listed in manifestURLs
      cache.keys().then((keys) => {
        keys.forEach((request) => {
          if (!manifestURLs.includes(request.url)) {
            cache.delete(request);
          }
        });
      });
    })
  );
});

registerRoute(
  ({ url }) => manifestURLs.includes(url.href),
  new NetworkFirst({
    cacheName,
  })
);

// Cache Google Fonts
registerRoute(
  /https:\/\/fonts\.gstatic\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-cache',
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
  })
);

setDefaultHandler(new NetworkOnly());

// fallback to app-shell for document request
setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return caches.match('/app-shell/index.html');
    default:
      return Response.error();
  }
});
