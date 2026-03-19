const CACHE_NAME = "chitlan-cache-v1";

const ASSETS = [
  "./",
  "./app.html",
  "./style.css",
  "./script.js",
  "https://unpkg.com/peerjs@1.5.5/dist/peerjs.min.js"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Fetch (cache-first)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => {
        return res || fetch(event.request);
      })
      .catch(() => {
        // 🔴 This runs when completely offline
        if (event.request.mode === "navigate") {
          return caches.match("./app.html");
        }

        return new Response("You are offline 🚫", {
          headers: { "Content-Type": "text/plain" }
        });
      })
  );
});