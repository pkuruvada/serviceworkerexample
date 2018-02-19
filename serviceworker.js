const CACHE_NAME ='sw-1-sample';

// Install event fired first after register
self.addEventListener('install', event => {
  event.waitUntil(async function() {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(['/']);
  }());
});


/** Since the scope of the service worker is the root of the application
  all fetch calls are caught.
  We listent to every fetch call and return the response from cache if
  available , else we make a network request and cache the response.
**/
self.addEventListener('fetch', event => {

  event.respondWith(async function() {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(event.request);
    if (response) {
      return response;
    }

    try {
      const cloneResuest = event.request.clone();
      const actualResponse = await fetch(cloneResuest);
      if (!actualResponse || actualResponse.status !== 200 || actualResponse.type !== 'basic') {
        return actualResponse;
      }
      const cloneResponse = actualResponse.clone();
      await cache.put(event.request, cloneResponse);
      return actualResponse;
    } catch (ex) {
      throw ex;
    }
  }());
});

/**
  * 'activate' is called when a change is detected in the service worker.
  * Caches can be cleared in this stage
**/
self.addEventListener('activate', (event) => {
  event.waitUntil(async function() {
    const keys = await caches.keys();
    const currentCache = keys.find((key) => key === CACHE_NAME);
    caches.delete(currentCache);
  }());
});
