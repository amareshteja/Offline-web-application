var cacheName = 'weatherPWA-v3';
var dataCacheName = 'weatherData-v3';
var filestoCache = ['/',
    '/index.html',
    '/scripts/app.js',
    '/scripts/localforage.js',
    '/styles/ud811.css',
    'images/clear.png',
    'images/cloudy.png',
    'images/cloudy-scattered-showers.png',
    'images/fog.png'];

var wetherAPI = 'https://publicdata-weather.firebaseio.com/'

self.addEventListener('install', function (e) {
    console.log('install event');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filestoCache);
        })
        )
});

self.addEventListener('activate', function (e) {
    console.log('activate event');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key!==dataCacheName) {
                    console.log(key+" cache removed");
                    return cache.delete(key);
                }
            }));
        })
        )
});

self.addEventListener('fetch', function (e) {
    console.log('fetching ' + e.request.url);
    if (e.request.url.startsWith(wetherAPI)) {
        e.respondWith(
            fetch(e.request).then(function (resp) {
                return caches.open(dataCacheName).then(function (cache) {
                    cache.put(e.request.url, resp.clone())
                    console.log('API response cloned');
                    return resp;
                })
            })
            );
    } else {
        e.respondWith(
            caches.match(e.request).then(function (resp) {
                return resp || fetch(e.request);
            })
            )
    }
});
