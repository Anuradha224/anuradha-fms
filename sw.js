const CACHE = "at-fms-v3";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(["/", "/index.html"]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  // Never cache Supabase API calls - always fetch live
  if (e.request.url.includes("supabase.co")) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
