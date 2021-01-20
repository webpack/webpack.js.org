import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { CacheFirst, NetworkOnly } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { setDefaultHandler, setCatchHandler } from 'workbox-routing';
import ssgManifest from '../dist/ssg-manifest.json';

// Precache assets built with webpack
precacheAndRoute(self.__WB_MANIFEST);

precacheAndRoute(ssgManifest);

// Precache manifest.json as ssgManifest couldn't catch it
precacheAndRoute([
  {
    url: '/manifest.json',
    revision: '2', // manually update needed when content changed
  },
]);

// Cache Google Fonts
registerRoute(
  /https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
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
setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return matchPrecache('/app-shell/index.html');
    default:
      return Response.error();
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
