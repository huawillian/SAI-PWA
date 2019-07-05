const staticCacheName = 'static_v1';

const staticCache = [
    '/',
    'index.html',
    '/images/icon-192.png',
    '/images/icon-512.png'
];

self.addEventListener('install', (event) => {
    // Cache Static Files
    caches.open(staticCacheName).then(cache => {
        cache.addAll(staticCache).then(res => {
            console.log('Static Cache Success!');
        }).catch(err => {
            console.log('Static Cache Failed!');
        })
    })
});

self.addEventListener('activate', (event) => {

});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
    );
});