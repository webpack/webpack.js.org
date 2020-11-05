import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute } from 'workbox-routing/registerRoute';
import { CacheFirst, NetworkOnly } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin';
import { NavigationRoute } from 'workbox-routing/NavigationRoute';
import { createHandlerBoundToURL } from 'workbox-precaching/createHandlerBoundToURL';
import { setDefaultHandler, setCatchHandler } from 'workbox-routing';
import ssgManifest from '../dist/ssg-manifest.json';

// Precache assets built with webpack
precacheAndRoute(self.__WB_MANIFEST);

precacheAndRoute(ssgManifest);

// Precache manifest.json as ssgManifest couldn't catch it
precacheAndRoute([
  {
    url: '/manifest.json',
    revision: '1', // manually update needed when content changed
  },
]);

// Cache Google Fonts
registerRoute(
  /https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
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
      return caches.match('/app-shell/index.html');
    default:
      return Response.error();
  }
});
