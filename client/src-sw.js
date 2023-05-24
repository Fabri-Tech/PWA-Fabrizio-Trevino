import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

const assetCache = new StaleWhileRevalidate({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  assetCache
);

const offlineFallbackStrategy = new CacheFirst({
  cacheName: 'offline-fallback',
});

registerRoute(
  ({ request }) => request.mode === 'navigate',
  ({ event }) => {
    try {
      return pageCache.handle({ event });
    } catch (error) {
      return offlineFallbackStrategy.handle({ event });
    }
  }
);

