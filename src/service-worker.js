const CACHE_NAME = "bakst-og-brygg-cache-v1.0.0-beta";
const urlsToCache = [
  "./",
  "./index.html",
  "./admin/produkter/index.html",
  "./admin/produkter/opprett.html",
  "./admin/produkter/rediger.html",
  "./admin/produkter/bestillinger.html",
  "./admin/produkter/hentede-bestillinger.html",
  "./css/admin-styles.min.css",
  "./css/styles.min.css",
  "./data/products.js",
  "./data/products.json",
  "./img/logo.webp",
  "./img/logo_bakst-og-brygg.webp",

  "./img/cafe_menu/americano.webp",
  "./img/cafe_menu/biff_lakbaguette.webp",
  "./img/cafe_menu/blt_sandwich.webp",
  "./img/cafe_menu/brie_avokadobaguette.webp",
  "./img/cafe_menu/cappuccino.webp",
  "./img/cafe_menu/caprese_sandwich.webp",
  "./img/cafe_menu/capresebaguette.webp",
  "./img/cafe_menu/cortado.webp",
  "./img/cafe_menu/egg_baconbaguette.webp",
  "./img/cafe_menu/egg_rekebaguette.webp",
  "./img/cafe_menu/eggesalat_sandwich.webp",
  "./img/cafe_menu/espresso.webp",
  "./img/cafe_menu/falafelbaguette.webp",
  "./img/cafe_menu/flat_white.webp",
  "./img/cafe_menu/grillet_ost_sandwich.webp",
  "./img/cafe_menu/iskaffe.webp",
  "./img/cafe_menu/kaffe_frappe.webp",
  "./img/cafe_menu/kalkun_avokado_sandwich.webp",
  "./img/cafe_menu/klubb_sandwich_kylling.webp",
  "./img/cafe_menu/kyllingbaguette.webp",
  "./img/cafe_menu/laks_kremostbaguette.webp",
  "./img/cafe_menu/latte.webp",
  "./img/cafe_menu/macchiato.webp",
  "./img/cafe_menu/mocha.webp",
  "./img/cafe_menu/nybrygget-kaffe.webp",
  "./img/cafe_menu/rekebaguette.webp",
  "./img/cafe_menu/ribbe_baguette.webp",
  "./img/cafe_menu/roastbeefbaguette.webp",
  "./img/cafe_menu/roastbiff_sandwich.webp",
  "./img/cafe_menu/skinke_sveitser_sandwich.webp",
  "./img/cafe_menu/skinkebaguette.webp",
  "./img/cafe_menu/snitter_assortert.webp",
  "./img/cafe_menu/snitter_avocado.webp",
  "./img/cafe_menu/snitter_karbonade.webp",
  "./img/cafe_menu/snitter_laks.webp",
  "./img/cafe_menu/snitter_reker.webp",
  "./img/cafe_menu/snitter_roastbiff.webp",
  "./img/cafe_menu/spekematbaguette.webp",
  "./img/cafe_menu/standard-produktbilde.webp",
  "./img/cafe_menu/tunfiskbaguette.webp",
  "./img/cafe_menu/tunfisksalat_sandwich.webp",
  "./img/cafe_menu/vegetarbaguette.webp",

  "./img/cakes/Barnebursdag.webp",
  "./img/cakes/brownies.webp",
  "./img/cakes/Bryllup.webp",
  "./img/cakes/Bursdag_voksen.webp",
  "./img/cakes/cupcakes.webp",
  "./img/cakes/eplekake.webp",
  "./img/cakes/frukttaerte.webp",
  "./img/cakes/gulrotkake.webp",
  "./img/cakes/Halloween.webp",
  "./img/cakes/Jubileum.webp",
  "./img/cakes/Jul.webp",
  "./img/cakes/Konfirmasjon.webp",
  "./img/cakes/konfirmasjon.webp",
  "./img/cakes/makroner.webp",
  "./img/cakes/marmorkake.webp",
  "./img/cakes/ostekake_baer.webp",
  "./img/cakes/pavlova.webp",
  "./img/cakes/red_velvet.webp",
  "./img/cakes/sitronkake.webp",
  "./img/cakes/sjokoladefondant.webp",
  "./img/cakes/sjokolademousse.webp",
  "./img/cakes/standard-produktbilde.webp",
  "./img/cakes/tiramisu.webp",
  "./img/cakes/uten-tema.webp",
  "./img/cakes/Valentin.webp",

  "./js/admin/ordersController.js",
  "./js/admin/ordersView.js",
  "./js/admin/pickedUpOrdersController.js",
  "./js/admin/pickedUpOrdersView.js",
  "./js/auth/authController.js",
  "./js/auth/loginController.js",
  "./js/auth/loginModel.js",
  "./js/auth/loginView.js",
  "./js/products/productAddController.js",
  "./js/products/productAddView.js",
  "./js/products/productEditController.js",
  "./js/products/productEditView.js",
  "./js/products/productInventoryController.js",
  "./js/products/productInventoryView.js",
  "./js/shared/common.js",
  "./js/shared/model.js",
  "./js/vendors/dayjs.min.js",
  "./js/vendors/nb.js",
  "./js/vendors/purify.min.js",
  "./js/vendors/scripts.min.js",

  "./favicon.ico",
  "./img/icons/icon-192x192.png",
  "./img/icons/icon-512x512.png",
  "./img/logo.webp",
  "./img/logo_bakst-og-brygg.webp"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
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
