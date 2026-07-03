/* Alfalah Academy — lightweight, dependency-free service worker.
 *
 * Strategy
 *   - App shell (same-origin static assets): cache-first.
 *   - API calls (path starts with /api): network-first, never cached.
 *   - Navigation requests: network, falling back to cached index.html offline.
 *   - Cross-origin (CDN) requests: passed straight through, never cached.
 *
 * The whole worker is guarded so a browser without the Cache Storage API
 * still loads the site (it simply behaves like there is no worker).
 */
'use strict';

var CACHE_NAME = 'alfalah-cache-v1';

// Core app shell — resolved relative to the worker scope (public/).
var APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/theme.css',
  './assets/css/main.css',
  './assets/css/portal.css',
  './assets/css/animations.css',
  './assets/img/logo.svg',
  './assets/img/og-cover.svg',
  './assets/img/hero/hero-1.svg',
  './assets/img/hero/hero-2.svg',
  './assets/img/hero/hero-3.svg'
];

var hasCaches = (typeof caches !== 'undefined');

// ---------------------------------------------------------------- install
self.addEventListener('install', function (event) {
  self.skipWaiting();
  if (!hasCaches) { return; }
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        // addAll is atomic; use individual best-effort puts so one missing
        // asset does not abort the whole install.
        return Promise.all(APP_SHELL.map(function (url) {
          return cache.add(url).catch(function () { /* ignore individual failures */ });
        }));
      })
      .catch(function () { /* ignore — worker still installs */ })
  );
});

// --------------------------------------------------------------- activate
self.addEventListener('activate', function (event) {
  if (!hasCaches) { return; }
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (key) {
          if (key !== CACHE_NAME) { return caches.delete(key); }
          return null;
        }));
      })
      .then(function () { return self.clients.claim(); })
      .catch(function () { /* ignore */ })
  );
});

// ------------------------------------------------------------------ fetch
self.addEventListener('fetch', function (event) {
  var req = event.request;

  // Only handle GET; let the browser deal with POST/PUT/DELETE etc.
  if (req.method !== 'GET') { return; }
  if (!hasCaches) { return; }

  var url;
  try { url = new URL(req.url); } catch (e) { return; }

  // Cross-origin (CDN fonts/bootstrap/angular): fetch through, don't cache.
  if (url.origin !== self.location.origin) { return; }

  // API: network-first, never cache. Path may be "/api" on the API host or
  // proxied; match anywhere in the pathname to be safe.
  if (url.pathname.indexOf('/api/') !== -1 || url.pathname.indexOf('/api') === 0) {
    event.respondWith(fetch(req));
    return;
  }

  // Navigation requests (SPA entry): network, fall back to cached shell.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(function () {
        return caches.match('./index.html').then(function (cached) {
          return cached || caches.match('./');
        });
      })
    );
    return;
  }

  // Static same-origin assets: cache-first, then populate cache on miss.
  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) { return cached; }
      return fetch(req).then(function (res) {
        // Only cache good, basic (same-origin) responses.
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(req, copy).catch(function () {});
          });
        }
        return res;
      });
    }).catch(function () {
      // Last resort for asset requests when fully offline.
      return caches.match('./index.html');
    })
  );
});
