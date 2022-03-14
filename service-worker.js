/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-2597f70';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./pohadky_ii_002.html","./pohadky_ii_005.html","./pohadky_ii_006.html","./pohadky_ii_007.html","./pohadky_ii_008.html","./pohadky_ii_009.html","./pohadky_ii_010.html","./pohadky_ii_011.html","./pohadky_ii_012.html","./pohadky_ii_013.html","./pohadky_ii_014.html","./pohadky_ii_015.html","./pohadky_ii_016.html","./pohadky_ii_017.html","./pohadky_ii_018.html","./pohadky_ii_019.html","./pohadky_ii_020.html","./pohadky_ii_021.html","./pohadky_ii_022.html","./pohadky_ii_023.html","./pohadky_ii_024.html","./pohadky_ii_025.html","./pohadky_ii_026.html","./pohadky_ii_027.html","./pohadky_ii_028.html","./pohadky_ii_029.html","./pohadky_ii_030.html","./pohadky_ii_031.html","./pohadky_ii_032.html","./pohadky_ii_033.html","./pohadky_ii_034.html","./pohadky_ii_035.html","./pohadky_ii_036.html","./pohadky_ii_037.html","./pohadky_ii_038.html","./pohadky_ii_039.html","./pohadky_ii_040.html","./pohadky_ii_041.html","./pohadky_ii_042.html","./pohadky_ii_043.html","./pohadky_ii_044.html","./pohadky_ii_045.html","./pohadky_ii_046.html","./pohadky_ii_047.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.jpeg","./resources/image002_fmt.jpeg","./resources/obalka_pohadky_ii_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
