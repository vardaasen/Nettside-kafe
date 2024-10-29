const CACHE_NAME = "bakst-og-brygg-cache-v1.0.0-beta";
const urlsToCache = [
  "/Nettside-kafe/",
  "/Nettside-kafe/index.html",
  "/Nettside-kafe/admin/produkter/index.html",
  "/Nettside-kafe/admin/produkter/opprett.html",
  "/Nettside-kafe/admin/produkter/rediger.html",
  "/Nettside-kafe/admin/bestillinger.html",
  "/Nettside-kafe/admin/hentede-bestillinger.html",
  "/Nettside-kafe/css/admin-styles.min.css",
  "/Nettside-kafe/css/styles.min.css",
  "/Nettside-kafe/data/products.js",
  "/Nettside-kafe/data/products.json",
  "/Nettside-kafe/img/cafe_menu/americano.webp",
  "/Nettside-kafe/img/cafe_menu/biff_lokbaguette.webp",
  "/Nettside-kafe/img/cafe_menu/blt_sandwich.webp",
  "/Nettside-kafe/img/cafe_menu/brie_avokadobaguette.webp",
  "/Nettside-kafe/img/cafe_menu/cappuccino.webp",
  "/Nettside-kafe/img/cafe_menu/caprese_sandwich.webp",
  "/Nettside-kafe/img/cafe_menu/capresebaguette.webp",
  "/Nettside-kafe/img/cafe_menu/cortado.webp",
  "/Nettside-kafe/img/cafe_menu/egg_baconbaguette.webp",
  "/Nettside-kafe/img/cafe_menu/egg_rekebaguette.webp",
  "/Nettside-kafe/img/cafe_menu/eggesalat_sandwich.webp",
  "/Nettside-kafe/img/cafe_menu/espresso.webp",
  "/Nettside-kafe/img/cafe_menu/falafelbaguette.webp",
  "/Nettside-kafe/img/cafe_menu/flat_white.webp",
  "/Nettside-kafe/img/cafe_menu/grillet_ost_sandwich.webp",
  "/Nettside-kafe/img/cafe_menu/iskaffe.webp",
  "/Nettside-kafe/img/cafe_menu/kaffe_frappe.webp",
  "/Nettside-kafe/img/cafe_menu/kalkun_avokado_sandwich.webp",
  "/Nettside-kafe/img/cafe_menu/klubb_sandwich_kylling.webp",
  "/Nettside-kafe/img/cafe_menu/kyllingbaguette.webp",
  "/Nettside-kafe/img/cafe_menu/laks_kremostbaguette.webp",
  "/Nettside-kafe/img/cafe_menu/latte.webp",
  "/Nettside-kafe/img/cafe_menu/macchiato.webp",
  "/Nettside-kafe/img/cafe_menu/mocha.webp",
  "/Nettside-kafe/img/cafe_menu/nybrygget-kaffe.webp",
  "/Nettside-kafe/img/cafe_menu/rekebaguette.webp",
  "/Nettside-kafe/img/cafe_menu/ribbe_baguette.webp",
  "/Nettside-kafe/img/cafe_menu/roastbeefbaguette.webp",
  "/Nettside-kafe/img/cafe_menu/roastbiff_sandwich.webp",
  "/Nettside-kafe/img/cafe_menu/skinke_sveitser_sandwich.webp",
  "/Nettside-kafe/img/cafe_menu/skinkebaguette.webp",
  "/Nettside-kafe/img/cafe_menu/snitter_assortert.webp",
  "/Nettside-kafe/img/cafe_menu/snitter_avocado.webp",
  "/Nettside-kafe/img/cafe_menu/snitter_karbonade.webp",
  "/Nettside-kafe/img/cafe_menu/snitter_laks.webp",
  "/Nettside-kafe/img/cafe_menu/snitter_reker.webp",
  "/Nettside-kafe/img/cafe_menu/snitter_roastbiff.webp",
  "/Nettside-kafe/img/cafe_menu/spekematbaguette.webp",
  "/Nettside-kafe/img/cafe_menu/standard-produktbilde.webp",
  "/Nettside-kafe/img/cafe_menu/tunfiskbaguette.webp",
  "/Nettside-kafe/img/cafe_menu/tunfisksalat_sandwich.webp",
  "/Nettside-kafe/img/cafe_menu/vegetarbaguette.webp",
  "/Nettside-kafe/img/cakes/Barnebursdag.webp",
  "/Nettside-kafe/img/cakes/brownies.webp",
  "/Nettside-kafe/img/cakes/Bryllup.webp",
  "/Nettside-kafe/img/cakes/bursdag-voksen.webp",
  "/Nettside-kafe/img/cakes/cupcakes.webp",
  "/Nettside-kafe/img/cakes/eplekake.webp",
  "/Nettside-kafe/img/cakes/frukttaerte.webp",
  "/Nettside-kafe/img/cakes/gulrotkake.webp",
  "/Nettside-kafe/img/cakes/Halloween.webp",
  "/Nettside-kafe/img/cakes/Jubileum.webp",
  "/Nettside-kafe/img/cakes/Jul.webp",
  "/Nettside-kafe/img/cakes/Konfirmasjon.webp",
  "/Nettside-kafe/img/cakes/konfirmasjon.webp",
  "/Nettside-kafe/img/cakes/makroner.webp",
  "/Nettside-kafe/img/cakes/marmorkake.webp",
  "/Nettside-kafe/img/cakes/ostekake_baer.webp",
  "/Nettside-kafe/img/cakes/pavlova.webp",
  "/Nettside-kafe/img/cakes/red_velvet.webp",
  "/Nettside-kafe/img/cakes/sitronkake.webp",
  "/Nettside-kafe/img/cakes/sjokoladefondant.webp",
  "/Nettside-kafe/img/cakes/sjokolademousse.webp",
  "/Nettside-kafe/img/cakes/standard-produktbilde.webp",
  "/Nettside-kafe/img/cakes/tiramisu.webp",
  "/Nettside-kafe/img/cakes/uten-tema.webp",
  "/Nettside-kafe/img/cakes/Valentin.webp",
  "/Nettside-kafe/js/admin/ordersController.js",
  "/Nettside-kafe/js/admin/ordersView.js",
  "/Nettside-kafe/js/admin/pickedUpOrdersController.js",
  "/Nettside-kafe/js/admin/pickedUpOrdersView.js",
  "/Nettside-kafe/js/auth/authController.js",
  "/Nettside-kafe/js/auth/loginController.js",
  "/Nettside-kafe/js/auth/loginModel.js",
  "/Nettside-kafe/js/auth/loginView.js",
  "/Nettside-kafe/js/products/productAddController.js",
  "/Nettside-kafe/js/products/productAddView.js",
  "/Nettside-kafe/js/products/productEditController.js",
  "/Nettside-kafe/js/products/productEditView.js",
  "/Nettside-kafe/js/products/productInventoryController.js",
  "/Nettside-kafe/js/products/productInventoryView.js",
  "/Nettside-kafe/js/shared/common.js",
  "/Nettside-kafe/js/shared/model.js",
  "/Nettside-kafe/js/vendors/dayjs.min.js",
  "/Nettside-kafe/js/vendors/nb.js",
  "/Nettside-kafe/js/vendors/purify.min.js",
  "/Nettside-kafe/js/scripts.min.js",
  "/Nettside-kafe/favicon.ico",
  "/Nettside-kafe/img/icons/icon-192x192.png",
  "/Nettside-kafe/img/icons/icon-512x512.png",
  "/Nettside-kafe/img/logo.webp",
  "/Nettside-kafe/img/logo_bakst-og-brygg.webp"
];


self.addEventListener("install", (event) => {
  urlsToCache.forEach((url) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${url}`);
        }
        console.log(`Cached successfully: ${url}`);
      })
      .catch(error => console.error(error.message));
  });

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      try {
        return cache.addAll(urlsToCache);
      } catch (error) {
        console.error("Error caching files:", error);
      }
    })
  );
});


self.addEventListener("fetch", event => {
  const { request } = event;

  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clonedResponse));
          return response;
        })
        .catch(() => caches.match(request))
    );
  } else if (request.url.endsWith('.css') || request.url.endsWith('.js')) {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
          return networkResponse;
        });
      })
    );
  } else if (request.url.endsWith('.png') || request.url.endsWith('.jpg') || request.url.endsWith('.webp')) {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
          return networkResponse;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request);
      })
    );
  }
});

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
