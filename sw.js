const CACHE_NAME = 'pwa-cache';

self.addEventListener('install', event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll([
                "cute1.jpg",
                "cute2.jpg",
                "/",
                "/index.html",
                "/404.html",
            ]))
    );
});

self.addEventListener('activate', event => {
    clients.claim();
});

self.addEventListener('fetch', event => {
    
    return event.respondWith(
        fetch(event.request)
            .then(res => {
                if (event.request.mode === 'navigate' && res.status === 404) {
                    return fetch('/404.html');
                }
                return res;
            })
            .catch(err => {
                return caches.open(CACHE_NAME)
                    .then(cache => {
                        return cache.match(event.request).then(response => {
                            if (response) {
                                return response;
                            }
                            return cache.match('/404.html');
                        })
                    });
            })
    );
});


