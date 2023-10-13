self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    clients.claim();
});

self.addEventListener('fetch', event => {
    
    // 攔截到我想要攔截的圖片，並且回傳我想要的圖片
    if (/cute1.jpg$/.test(event.request.url)) {
        return event.respondWith(fetch("/cute2.jpg"))
    }

    
});


