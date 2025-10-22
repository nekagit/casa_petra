/**
 * Casa-Petrada Service Worker
 * Provides offline functionality and caching for better performance
 */

const CACHE_NAME = 'casa-petrada-v1.0.0';
const STATIC_CACHE = 'casa-petrada-static-v1.0.0';
const DYNAMIC_CACHE = 'casa-petrada-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/about.html',
    '/contact.html',
    '/cart.html',
    '/checkout.html',
    '/products/bracelets.html',
    '/assets/css/main.css',
    '/assets/css/components.css',
    '/assets/css/pages.css',
    '/assets/js/main.js',
    '/assets/js/cart.js',
    '/assets/js/form-validation.js',
    '/assets/js/products.js',
    '/design-system/index.ts',
    '/design-system/types.ts',
    '/design-system/tokens/colors.json',
    '/design-system/tokens/typography.json',
    '/design-system/tokens/spacing.json',
    '/design-system/tokens/breakpoints.json',
    '/design-system/tokens/shadows.json',
    '/design-system/tokens/borders.json',
    '/design-system/tokens/animations.json',
    '/design-system/components/buttons.json',
    '/design-system/components/forms.json',
    '/design-system/components/cards.json',
    '/design-system/components/modals.json',
    '/design-system/components/navigation.json',
    '/design-system/components/products.json',
    '/design-system/layouts/grid.json',
    '/design-system/layouts/containers.json',
    '/design-system/utilities/utility-classes.json',
    '/design-system/utilities/responsive-helpers.json'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('[SW] Static files cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Failed to cache static files:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Service worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip external requests
    if (url.origin !== location.origin) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('[SW] Serving from cache:', request.url);
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                return fetch(request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Cache dynamic content
                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                cache.put(request, responseToCache);
                            });
                        
                        console.log('[SW] Caching new resource:', request.url);
                        return response;
                    })
                    .catch((error) => {
                        console.error('[SW] Fetch failed:', error);
                        
                        // Return offline page for navigation requests
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Return a custom offline response
                        return new Response(
                            JSON.stringify({
                                error: 'Offline',
                                message: 'This content is not available offline',
                                url: request.url
                            }),
                            {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        );
                    });
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync triggered:', event.tag);
    
    if (event.tag === 'cart-sync') {
        event.waitUntil(syncCartData());
    }
    
    if (event.tag === 'form-sync') {
        event.waitUntil(syncFormData());
    }
});

// Push notifications
self.addEventListener('push', (event) => {
    console.log('[SW] Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/assets/images/icon-192x192.png',
        badge: '/assets/images/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Details',
                icon: '/assets/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/images/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Casa-Petrada', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification clicked:', event.action);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper functions
async function syncCartData() {
    try {
        const cartData = await getStoredCartData();
        if (cartData && cartData.length > 0) {
            // Sync cart data with server
            const response = await fetch('/api/cart/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartData)
            });
            
            if (response.ok) {
                console.log('[SW] Cart data synced successfully');
                // Clear local cart data
                localStorage.removeItem('cart');
            }
        }
    } catch (error) {
        console.error('[SW] Failed to sync cart data:', error);
    }
}

async function syncFormData() {
    try {
        const formData = await getStoredFormData();
        if (formData && formData.length > 0) {
            // Sync form data with server
            for (const form of formData) {
                const response = await fetch('/api/forms/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });
                
                if (response.ok) {
                    console.log('[SW] Form data synced successfully');
                }
            }
            
            // Clear local form data
            localStorage.removeItem('offline_forms');
        }
    } catch (error) {
        console.error('[SW] Failed to sync form data:', error);
    }
}

function getStoredCartData() {
    return new Promise((resolve) => {
        const cartData = localStorage.getItem('cart');
        resolve(cartData ? JSON.parse(cartData) : []);
    });
}

function getStoredFormData() {
    return new Promise((resolve) => {
        const formData = localStorage.getItem('offline_forms');
        resolve(formData ? JSON.parse(formData) : []);
    });
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        const urlsToCache = event.data.urls;
        event.waitUntil(
            caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                    return cache.addAll(urlsToCache);
                })
        );
    }
});

console.log('[SW] Service worker script loaded');
