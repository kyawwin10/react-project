// console.warn("sw file is public folder");

const CACHE_NAME = "version-1";
const urlsToCache = [
  "/index.html",
  "/offline.html",
  "/salesinvoicelist.js",
  "/customerlist.js",
];

const self = this;

// install sw
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response;
//       }

//       return fetch(event.request).catch(() => {
//         if (
//           event.request.method === "GET" &&
//           event.request.headers.get("accept").includes("text/html")
//         ) {
//           const offlineData = localStorage.getItem(event.request.url);
//           if (offlineData) {
//             return new Response(offlineData, {
//               headers: { "Content-Type": "text/html" },
//             });
//           }
//         }
//         return caches.match("offline.html");
//       });
//     })
//   );
// });

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
