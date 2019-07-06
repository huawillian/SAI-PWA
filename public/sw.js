const staticCacheName = "static_v1";

const staticCache = [
  "/",
  "/index.html",
  "/create",
  "/create/index.html",
  "/detail",
  "/detail/index.html",
  "/images/icon-192.png",
  "/images/icon-512.png",
  "/favicon.png",
  "/css/style.css",
  "/js/main.js",
  "/js/create.js",
  "/js/home.js",
  "/js/detail.js"
];

self.addEventListener("install", event => {
  // Cache Static Files
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return Promise.all(
        staticCache.map(url =>
          fetch(url)
            .then(res => {
              // Clone response to allow cache html, no follow
              cache.put(url, new Response(res.body));
            })
            .catch(err => err)
        )
      )
        .then(res => {
          console.log("Static Cache Success!");
        })
        .catch(err => {
          console.log("Static Cache Failed!");
        });
    })
  );
});

self.addEventListener("activate", event => {});

self.addEventListener("fetch", event => {
  if (
    staticCache.find(
      url => event.request.url.split("?")[0] === self.location.origin + url
    )
  ) {
    // Remove params and body
    let request = new Request(event.request.url.split("?")[0], {
      method: "GET",
      headers: event.request.headers,
      mode: event.request.mode == "navigate" ? "cors" : event.request.mode,
      credentials: event.request.credentials,
      redirect: event.request.redirect
    });

    // Cache First and Network Fallback
    event.respondWith(
      caches.open(staticCacheName).then(cache => {
        return cache.match(request).then(res => {
          if (res) {
            return res;
          } else {
            return fetch(event.request);
          }
        });
      })
    );
  } else {
    // Network Only for others
    event.respondWith(fetch(event.request));
  }
});
