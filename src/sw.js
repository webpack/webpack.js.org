import { cacheNames } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { NetworkFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { setCatchHandler, setDefaultHandler } from 'workbox-routing';
import ssgManifest from '../dist/ssg-manifest.json';

const cacheName = cacheNames.runtime;

const manifest = self.__WB_MANIFEST;
const otherManifest = [
  {
    url: '/manifest.json',
  },
];
const manifestURLs = [...manifest, ...ssgManifest, ...otherManifest].map(
  (entry) => {
    const url = new URL(entry.url, self.location);
    return url.href;
  }
);
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(manifestURLs);
    })
  );
});

self.addEventListener('activate', () => {
  // TODO clean up old caches
  // - [ ] clean up workbox precached data
  // - [ ] clean up outdated runtime cache
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

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
