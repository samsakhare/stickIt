self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then((caches) => {
      return caches.addAll([
        "./",
        "/resources/css/style.css",
        "/resources/icons/app_icon.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  console.log("Install enabled");
});
