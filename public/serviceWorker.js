/* eslint-disable no-restricted-globals */
// public/service-worker.js
const CACHE_NAME = 'my-site-cache-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/fonts/IRANSansXFaNum-Medium.ttf'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  )
})