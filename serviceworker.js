self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then((caches) => {
      return caches.addAll([
        "./",
        "./resources/css/style.css",
        "./resources/icons/app_icon.png",
        "./resources/js/main.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
