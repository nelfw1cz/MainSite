/* ========================================
   PythonPath - Service Worker
   ======================================== */

const CACHE_NAME = 'pythonpath-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/tasks.html',
    '/progress.html',
    '/profile.html',
    '/about.html',
    '/contacts.html',
    '/admin.html',
    '/admin.js',
    '/game.html',
    '/game.js',
    '/blog.html',
    '/blog.js',
    '/quiz.html',
    '/quiz.js',
    '/cheatsheet.html',
    '/cheatsheet.js',
    '/guestbook.html',
    '/guestbook.js'
];

// ========================================
// Установка Service Worker
// ========================================
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch((err) => {
                console.log('Cache install error:', err);
            })
    );
    self.skipWaiting();
});

// ========================================
// Активация Service Worker
// ========================================
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// ========================================
// Перехват запросов
// ========================================
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Возвращаем из кэша или делаем запрос
                if (response) {
                    return response;
                }
                
                return fetch(event.request)
                    .then((response) => {
                        // Проверяем валидность ответа
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Клонируем ответ
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch((err) => {
                        console.log('Fetch error:', err);
                        // Возвращаем офлайн-страницу для навигации
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// ========================================
// Обновление по сети
// ========================================
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
