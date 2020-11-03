import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute } from 'workbox-routing/registerRoute';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration/ExpirationPlugin';

// Precache assets built with webpack
precacheAndRoute(self.__WB_MANIFEST);

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

// TODO Cache /app-shell/index.html

// TODO Cache /index.html, /concepts/index.html, etc.