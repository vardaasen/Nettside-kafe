## Nettside Kafè

En nettside hvor kunden skal kunne se gjennom typiske kafe produkter som baguetter, snitter og kaffe, samt kaker.

kunden skal kunne sende en bestilling som må hentes selv. Man skal kunne gjøre enkle tilpasninger på kafe produktene med mer avanserte tilpasninger for kake.

Siste versjon av siden kan testes her:
https://aleanon.github.io/Nettside-kafe/

# Project Architecture

```mermaid
flowchart TB
    subgraph Frontend["Browser Entry Points"]
        direction TB
        IndexHTML["index.html"]
        AdminHTML["admin/*.html"]
    end

    subgraph Core["Core System"]
        direction TB
        Model["model.js<br>- products[]<br>- orders[]<br>- app{}<br>- inputs{}"]
        BaseView["view.js<br>- updateView()<br>- createCurrentPageHtml()"]
        BaseController["controller.js<br>- switchMenu()"]
        Common["common.js<br>- getProductsForCategory()<br>- openProductInfo()<br>- closeOverlay()"]
    end

    subgraph Products["Product Management"]
        direction TB
        CafeMenu["cafeMenuController.js<br>- switchTab()<br>- addCafeProductToCart()"]
        CafeView["cafeMenuView.js<br>- createCafeMenuHtml()<br>- createProductCardHtml()"]
        
        CakeMenu["cakeMenuController.js<br>- updateCakeSize()<br>- updateTheme()<br>- addCakeProductToCart()"]
        CakeView["cakeMenuView.js<br>- createCakeMenuHtml()<br>- createProductCardHtml()"]
        
        ProductInv["productInventoryController.js<br>- updateProductQuantity()<br>- filterByCategory()"]
        ProductInvView["productInventoryView.js<br>- renderInventory()"]
    end

    subgraph Cart["Shopping Cart"]
        direction TB
        CartCtrl["cartController.js<br>- addToCart()<br>- removeFromCart()<br>- clearCart()"]
        CartView["cartView.js<br>- createShoppingCartHtml()<br>- updateCartView()"]
        
        CheckoutCtrl["checkoutController.js<br>- submitOrder()<br>- updatePickupDate()"]
        CheckoutView["checkoutView.js<br>- createCheckoutView()<br>- generateTimeOptions()"]
    end

    subgraph Admin["Admin System"]
        direction TB
        OrdersCtrl["ordersController.js<br>- displayOrders()<br>- updateStatus()<br>- filterOrders()"]
        OrdersView["ordersView.js<br>- renderOrders()<br>- renderNoResultsMessage()"]
        
        PickedUpCtrl["pickedUpOrdersController.js<br>- displayOrders()<br>- searchOrders()"]
        PickedUpView["pickedUpOrdersView.js<br>- renderOrders()"]
    end

    subgraph Auth["Authentication"]
        direction TB
        AuthCtrl["authController.js<br>- checkAuth()"]
        LoginCtrl["loginController.js<br>- init()<br>- setLoggedIn()"]
        LoginModel["loginModel.js<br>- checkCredentials()"]
        LoginView["loginView.js<br>- showError()<br>- hideError()"]
    end

    %% Core connections
    IndexHTML --> BaseView
    AdminHTML --> BaseView
    BaseView --> Model
    BaseController --> Model
    Common --> Model

    %% Product flows
    CafeMenu --> Model
    CafeMenu --> CafeView
    CafeView --> Common
    
    CakeMenu --> Model
    CakeMenu --> CakeView
    CakeView --> Common

    ProductInv --> Model
    ProductInv --> ProductInvView

    %% Cart flows
    CartCtrl --> Model
    CartCtrl --> CartView
    CheckoutCtrl --> Model
    CheckoutCtrl --> CheckoutView

    %% Admin flows
    OrdersCtrl --> Model
    OrdersCtrl --> OrdersView
    PickedUpCtrl --> Model
    PickedUpCtrl --> PickedUpView

    %% Auth flows
    LoginCtrl --> LoginModel
    LoginCtrl --> LoginView
    AuthCtrl --> LoginModel

    classDef coreClass fill:#f9f,stroke:#333,stroke-width:2px
    classDef moduleClass fill:#bbf,stroke:#333,stroke-width:2px
    classDef viewClass fill:#bfb,stroke:#333,stroke-width:2px

    class Core coreClass
    class Products,Cart,Admin,Auth moduleClass
    class CafeView,CakeView,CartView,CheckoutView,OrdersView,PickedUpView,LoginView viewClass
```
# Fullstendig Funksjonsoversikt

## Kjernesystemfunksjoner

### model.js (Sentral Tilstand)
- `replaceModel(model)`: Oppdaterer modelltilstand
- `calculateCustomCakePrice(themeId, size)`: Beregner kakepriser
- `subtractOrderedQuantityFromUnitsInStock(products)`: Oppdaterer varebeholdning
- `updateOrderStatus(orderId, newStatus)`: Endrer ordrestatus
- `addCustomQuantity(productId, quantity)`: Legger til i varebeholdning

### view.js (Basisvisning)
- `updateView()`: Hovedfunksjon for visningsoppdatering
- `createCurrentPageHtml()`: Genererer innhold for gjeldende side
- Lyttere for historikk og DOM-tilstand

### common.js (Delte Verktøy)
- `getProductsForCategory(category)`: Filtrerer produkter
- `getProductFromId(id)`: Produktoppslag
- `openProductInfo(id)`: Viser produktdetaljer
- `closeOverlay()`: Lukker detaljvisning
- `formatDateTime(dateString, timeString)`: Datoformatering

## Produkthåndtering

### Kafémeny
**Kontroller (cafeMenuController.js)**
- `switchTab(value)`: Endrer menykategori
- `updateCafeProductComment(value)`: Oppdaterer produktnotater
- `addCafeProductToCart(id)`: Legger kaféartikler i handlekurv

**Visning (cafeMenuView.js)**
- `createCafeMenuHtml()`: Rendrer kafémeny
- `createCafeProductCardHtml(product)`: Lager produktkort
- `createProductInfoOverlayElement()`: Produktdetaljvisning

### Kakemeny
**Kontroller (cakeMenuController.js)**
- `updateCakeSize(size)`: Oppdaterer kakestørrelse
- `updateTheme(themeId)`: Endrer kaketema
- `updateFlavor(flavor)`: Setter kakesmak
- `addCakeProductToCart(productId)`: Legger kaker i handlekurv

**Visning (cakeMenuView.js)**
- `createCakeMenuHtml()`: Rendrer kakemeny
- `createCakeProductCardHtml(product)`: Lager kakekort
- `createCakeProductInfoOverlayElement()`: Kakedetaljvisning

## Handlekurv

### Kurvhåndtering
**Kontroller (cartController.js)**
- `addToCart(name, price, productId, quantity, message)`: Legger til i kurv
- `removeFromCart(itemIndex)`: Fjerner fra kurv
- `clearCart()`: Tømmer handlekurven
- `setCartItemQuantity(itemIndex, quantity)`: Endrer antall

**Visning (cartView.js)**
- `createShoppingCartHtml()`: Rendrer handlekurv
- `createCartItemHtml(itemIndex, item)`: Lager kurvartikler
- `showCartNotification(message)`: Viser varsler

### Utsjekking
**Kontroller (checkoutController.js)**
- `goToPickupTime()`: Starter utsjekking
- `updatePickupDate(date)`: Setter hentetidspunkt
- `submitOrder()`: Behandler bestilling

**Visning (checkoutView.js)**
- `createCheckoutView()`: Rendrer utsjekking
- `generateTimeOptions()`: Lager tidsvelger
- `createOrderConfirmation()`: Viser bekreftelse

## Administrasjonssystem

### Ordrehåndtering
**Kontroller (ordersController.js)**
- `displayOrders()`: Viser bestillinger
- `updateStatus(orderId, newStatus)`: Oppdaterer ordrestatus
- `filterOrders()`: Filtrerer ordreliste
- `searchOrders()`: Søker i bestillinger

**Visning (ordersView.js)**
- `renderOrders()`: Viser bestillinger
- `renderNoResultsMessage()`: Viser ingen treff
- `renderOrderedProductsHtml()`: Viser ordredetaljer

### Hentede Bestillinger
**Kontroller (pickedUpOrdersController.js)**
- `displayOrders()`: Viser fullførte bestillinger
- `searchOrders()`: Søker i fullførte bestillinger

**Visning (pickedUpOrdersView.js)**
- `renderOrders()`: Viser fullførte bestillinger

## Autentisering

### Innloggingssystem
**Kontroller (loginController.js)**
- `init()`: Initialiserer innlogging
- `setLoggedIn()`: Setter innloggingstilstand

**Modell (loginModel.js)**
- `checkCredentials(enteredID, enteredPassword)`: Sjekker påloggingsdetaljer

**Visning (loginView.js)**
- `showError()`: Viser innloggingsfeil
- `hideError()`: Skjuler feilmeldinger
- `togglePasswordVisibility()`: Håndterer passordvisning

### Autentiseringskontroller (authController.js)
- Håndterer øktadministrasjon
- Omdirigerer uautorisert tilgang

```mermaid
flowchart TB
    subgraph Infrastructure["Infrastructure"]
        SW["service-worker.js<br>- Cache handling<br>- Offline support"]
        Manifest["manifest.json<br>- PWA config"]
        Assets["Static Assets<br>- Images<br>- Styles<br>- Vendor libs"]
    end

    subgraph Core["Core System"]
        Model["model.js<br>State Management"]
        BaseView["view.js"]
        BaseController["controller.js"]
        Common["common.js"]
    end

    subgraph Products["Product Management"]
        CafeMenu["cafeMenuController.js"]
        CakeMenu["cakeMenuController.js"]
        ProductInv["productInventoryController.js"]
    end

    subgraph Cart["Shopping Cart"]
        CartCtrl["cartController.js"]
        CheckoutCtrl["checkoutController.js"]
    end

    subgraph Admin["Admin System"]
        OrdersCtrl["ordersController.js"]
        PickedUpCtrl["pickedUpOrdersController.js"]
    end

    subgraph Auth["Authentication"]
        AuthCtrl["authController.js"]
        LoginCtrl["loginController.js"]
    end

    subgraph Data["Data Layer"]
        ProductsJSON["products.json"]
        ProductsJS["products.js"]
        LocalStorage["localStorage"]
    end

    Browser[/"Browser"/] --> SW
    SW --> Assets
    SW --> ProductsJSON
    SW --> ProductsJS

    Infrastructure --> Core
    Core --> Data
    Products --> Core
    Cart --> Core
    Admin --> Core
    Auth --> Core

    %% Data flow
    LocalStorage <--> Model
    ProductsJSON --> Model
    Model --> SW

    classDef infrastructure fill:#f9f,stroke:#333
    classDef core fill:#bbf,stroke:#333
    classDef module fill:#bfb,stroke:#333
    classDef data fill:#fbb,stroke:#333

    class Infrastructure infrastructure
    class Core core
    class Products,Cart,Admin,Auth module
    class Data data
```

# Systemarkitektur

## Infrastruktur og Hovedkomponenter

### Service Worker
Service workeren (`service-worker.js`) er sentral for applikasjonens offline-funksjonalitet og ytelse:
- Cacher statiske ressurser for offline-bruk
- Håndterer nettverksforespørsler med ulike strategier
- Versjonskontroll av cache
- Optimaliserer lasting av ressurser

### PWA-konfigurasjon
`manifest.json` definerer Progressive Web App-funksjonaliteter:
- App-ikon og splash-screens
- Installasjonsmuligheter
- Tema- og fargeinnstillinger

## Kjernesystem

### Modell (model.js)
Sentral tilstandshåndtering for:
- Produktkatalog
- Ordre og bestillinger
- Brukerinnstillinger
- Handlevogn

### Visning (view.js)
Basis-visningshåndtering:
- Hovedoppdateringer av GUI
- Sidenavigasjon
- DOM-manipulasjon

### Kontroller (controller.js)
Koordinerer brukerinteraksjoner:
- Hendelseshåndtering
- Forretningslogikk
- Tilstandsoppdateringer

## Moduler

### Produkthåndtering
- **Kafémeny**: Visning og bestilling av kaféprodukter
- **Kakemeny**: Spesialisert for kakebestillinger og tilpasninger
- **Lagerstyring**: Administrasjon av varebeholdning

### Handlevogn
- Produkthåndtering i kurv
- Bestillingsprosess
- Hentetidsbestilling
- Betalingshåndtering

### Administrasjon
- Ordrebehandling
- Bestillingsoversikt
- Produktadministrasjon
- Statistikk og rapporter

### Autentisering
- Innlogging for ansatte
- Sesjonshåndtering
- Tilgangskontroll

## Datalag

### Lokal Lagring
- Produktdata i JSON-format
- Handlevogndata i localStorage
- Brukerinnstillinger

### Backend-integrasjon
- REST API-integrasjon
- Sanntidsoppdateringer
- Datasynkronisering

## Tekniske Detaljer

### Cachingstrategier
1. **Statiske Ressurser**
   - Full caching av bilder, stiler, scripts
   - Versjonskontroll med cache-busting

2. **API-responser**
   - Cache-then-network strategi
   - Fallback til cached data offline

3. **Dynamisk Innhold**
   - Selektiv caching basert på innholdstype
   - Periodisk oppdatering av cache

### Ytelsesoptimalisering
- Lazy loading av bilder
- Minifiserte ressurser
- Effektiv DOM-manipulasjon
- Progressive enhancement

## Avhengigheter
- dayjs: Datohåndtering
- DOMPurify: XSS-beskyttelse
- Moderne nettleserstøtte påkrevd

## Utvikling og Deployment
- Gulp for building og minifisering
- Jest for testing
- ESLint/Prettier for kodeformatering
- GitHub Actions for CI/CD

# Prosjektinfrastruktur

## Byggeverktøy og Konfigurasjon

### Gulp (gulpfile.js)
Håndterer byggeprosessen:
```javascript
// Hovedoppgaver
- combine-main-css    // Kombinerer CSS-filer
- combine-admin-css   // Kombinerer admin CSS
- combine-main-js     // Bundler hovedscripts
- uglify-admin-js     // Minifiserer admin-scripts
- uglify-auth-js      // Minifiserer auth-scripts
- uglify-product-js   // Minifiserer produkt-scripts
- copy-files          // Kopierer statiske filer
```

### Babel (.babelrc)
JavaScript kompilering:
```json
{
  "presets": ["@babel/preset-env"]
}
```

### ESLint (eslint.config.mjs)
Kodestandard og linting:
- Google style guide
- Prettier integrasjon
- Customiserte regler

### Prettier (.prettierrc)
Kodeformatering:
```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "singleQuote": true
}
```

## GitHub Workflows

### build_n_deploy.yml
```yaml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  - Sjekker repository
  - Bygger prosjektet
  - Deployer til GitHub Pages
```

### publish.yml
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [1.0.0-beta]
```

## Progressive Web App

### manifest.json
```json
{
  "name": "Bakst og Brygg",
  "start_url": "/Nettside-kafe/index.html",
  "display": "standalone"
}
```

### service-worker.js
- Cache-håndtering
- Offline støtte
- Ressursoptimalisering

## Prosjektstruktur

### Rotkatalog
```
├── package.json        # Prosjektavhengigheter
├── gulpfile.js        # Byggekonfigurasjon
├── .babelrc           # Babel-konfigurasjon
├── .editorconfig      # Editor-innstillinger
├── .gitattributes     # Git-filhåndtering
├── .gitignore         # Git-ignoreringer
├── .prettierrc        # Kodeformatering
├── eslint.config.mjs  # Linting-regler
├── jest.config.js     # Test-konfigurasjon
└── jsdoc.json         # Dokumentasjonsgenerering
```

### GitHub Workflows
```
.github/workflows/
├── build_n_deploy.yml
└── publish.yml
```

## NPM Scripts (package.json)
```json
{
  "scripts": {
    "build": "gulp",
    "lint": "eslint ./src",
    "format": "prettier --write ./src",
    "doc": "jsdoc -c jsdoc.json",
    "test": "jest"
  }
}
```

## Testing og Dokumentasjon
- Jest for enhetstesting
- JSDoc for dokumentasjon
- Testing av:
  - Menu Controller
  - View
  - Café Menu View

## Deployment
GitHub Pages via Actions:
1. Bygger prosjektet med Gulp
2. Kjører tester
3. Genererer dokumentasjon
4. Deployer til GitHub Pages

## Avhengigheter
Hovedavhengigheter:
- Gulp for bygging
- Babel for JS-kompilering
- ESLint/Prettier for kodeformatering
- Jest for testing
- Firebase for backend
- Express for lokal utvikling

Utviklingsavhengigheter er definert i package.json

## Miljøkonfigurasjon
- .editorconfig for konsistent koding
- .gitattributes for linjeskift
- .gitignore for versjonskontr

## Prosjektstruktur
#update_structure_start#
```
.
├── __tests__
│   ├── test.cafe-menu-view.js
│   ├── test.index.html.js
│   ├── test.menu-controller.js
│   ├── test.model.js
│   └── test.view.js
├── eslint.config.mjs
├── gulpfile.js
├── img_originals
│   ├── cakes
│   │   ├── brownies.webp
│   │   ├── cupcakes.webp
│   │   ├── eplekake.webp
│   │   ├── frukttaerte.webp
│   │   ├── gulrotkake.webp
│   │   ├── makroner.webp
│   │   ├── marmorkake.webp
│   │   ├── ostekake_baer.webp
│   │   ├── pavlova.webp
│   │   ├── red_velvet.webp
│   │   ├── sitronkake.webp
│   │   ├── sjokoladefondant.webp
│   │   ├── sjokoladekake.webp
│   │   ├── sjokolademousse.webp
│   │   └── tiramisu.webp
│   └── themes
│       ├── anniversary.webp
│       ├── birthday_adult.webp
│       ├── birthday_child.webp
│       ├── christmas.webp
│       ├── easter.webp
│       ├── halloween.webp
│       ├── no_theme.webp
│       ├── valentine.webp
│       └── wedding.webp
├── jest.setup.cjs
├── jsdoc.json
├── package.json
├── readme.md
├── src
│   ├── admin
│   │   ├── bestillinger.html
│   │   ├── hentede-bestillinger.html
│   │   ├── index.html
│   │   └── produkter
│   │       ├── index.html
│   │       ├── opprett.html
│   │       └── rediger.html
│   ├── css
│   │   ├── base
│   │   │   └── base.css
│   │   ├── components
│   │   │   ├── admin.css
│   │   │   ├── buttons.css
│   │   │   ├── cart.css
│   │   │   ├── checkout.css
│   │   │   ├── modal.css
│   │   │   ├── overlay.css
│   │   │   ├── product-cards.css
│   │   │   └── tabs.css
│   │   ├── layout
│   │   │   ├── footer.css
│   │   │   ├── header.css
│   │   │   ├── page.css
│   │   │   └── product-grid.css
│   │   ├── modern-normalize.css
│   │   ├── state
│   │   │   └── animation.css
│   │   ├── styles.css
│   │   └── variables.css
│   ├── data
│   │   ├── products.js
│   │   └── products.json
│   ├── docs
│   │   ├── admin_ordersController.js.html
│   │   ├── admin_ordersView.js.html
│   │   ├── admin_pickedUpOrdersController.js.html
│   │   ├── admin_pickedUpOrdersView.js.html
│   │   ├── auth_authController.js.html
│   │   ├── auth_loginController.js.html
│   │   ├── auth_loginModel.js.html
│   │   ├── auth_loginView.js.html
│   │   ├── docs-assets
│   │   │   ├── chill-cafe-music-in-perfect-fourth.mp3
│   │   │   ├── docs.custom.css
│   │   │   ├── index.html.md
│   │   │   └── lighthouse.webp
│   │   ├── fonts
│   │   │   ├── Montserrat
│   │   │   │   ├── Montserrat-Bold.eot
│   │   │   │   ├── Montserrat-Bold.ttf
│   │   │   │   ├── Montserrat-Bold.woff
│   │   │   │   ├── Montserrat-Bold.woff2
│   │   │   │   ├── Montserrat-Regular.eot
│   │   │   │   ├── Montserrat-Regular.ttf
│   │   │   │   ├── Montserrat-Regular.woff
│   │   │   │   └── Montserrat-Regular.woff2
│   │   │   └── Source-Sans-Pro
│   │   │       ├── sourcesanspro-light-webfont.eot
│   │   │       ├── sourcesanspro-light-webfont.svg
│   │   │       ├── sourcesanspro-light-webfont.ttf
│   │   │       ├── sourcesanspro-light-webfont.woff
│   │   │       ├── sourcesanspro-light-webfont.woff2
│   │   │       ├── sourcesanspro-regular-webfont.eot
│   │   │       ├── sourcesanspro-regular-webfont.svg
│   │   │       ├── sourcesanspro-regular-webfont.ttf
│   │   │       ├── sourcesanspro-regular-webfont.woff
│   │   │       └── sourcesanspro-regular-webfont.woff2
│   │   ├── global.html
│   │   ├── index.html
│   │   ├── products_cafeMenuController.js.html
│   │   ├── products_cafeMenuView.js.html
│   │   ├── products_cakeMenuController.js.html
│   │   ├── products_cakeMenuView.js.html
│   │   ├── products_productAddView.js.html
│   │   ├── scripts
│   │   │   ├── collapse.js
│   │   │   ├── commonNav.js
│   │   │   ├── linenumber.js
│   │   │   ├── nav.js
│   │   │   ├── polyfill.js
│   │   │   ├── prettify
│   │   │   │   ├── Apache-License-2.0.txt
│   │   │   │   ├── lang-css.js
│   │   │   │   └── prettify.js
│   │   │   └── search.js
│   │   ├── shared_common.js.html
│   │   ├── shared_controller.js.html
│   │   ├── shared_model.js.html
│   │   ├── shared_view.js.html
│   │   ├── styles
│   │   │   ├── jsdoc.css
│   │   │   └── prettify.css
│   │   └── utils_clearLocalStorage.js.html
│   ├── favicon.ico
│   ├── img
│   │   ├── cafe_menu
│   │   │   ├── americano.webp
│   │   │   ├── biff_lokbaguette.webp
│   │   │   ├── blt_sandwich.webp
│   │   │   ├── brie_avokadobaguette.webp
│   │   │   ├── cappuccino.webp
│   │   │   ├── caprese_sandwich.webp
│   │   │   ├── capresebaguette.webp
│   │   │   ├── cortado.webp
│   │   │   ├── egg_baconbaguette.webp
│   │   │   ├── egg_rekebaguette.webp
│   │   │   ├── eggesalat_sandwich.webp
│   │   │   ├── espresso.webp
│   │   │   ├── falafelbaguette.webp
│   │   │   ├── flat_white.webp
│   │   │   ├── grillet_ost_sandwich.webp
│   │   │   ├── iskaffe.webp
│   │   │   ├── kaffe_frappe.webp
│   │   │   ├── kalkun_avokado_sandwich.webp
│   │   │   ├── klubb_sandwich_kylling.webp
│   │   │   ├── kyllingbaguette.webp
│   │   │   ├── laks_kremostbaguette.webp
│   │   │   ├── latte.webp
│   │   │   ├── macchiato.webp
│   │   │   ├── mocha.webp
│   │   │   ├── nybrygget-kaffe.webp
│   │   │   ├── rekebaguette.webp
│   │   │   ├── ribbe_baguette.webp
│   │   │   ├── roastbeefbaguette.webp
│   │   │   ├── roastbiff_sandwich.webp
│   │   │   ├── skinke_sveitser_sandwich.webp
│   │   │   ├── skinkebaguette.webp
│   │   │   ├── snitter_assortert.webp
│   │   │   ├── snitter_avocado.webp
│   │   │   ├── snitter_karbonade.webp
│   │   │   ├── snitter_laks.webp
│   │   │   ├── snitter_reker.webp
│   │   │   ├── snitter_roastbiff.webp
│   │   │   ├── spekematbaguette.webp
│   │   │   ├── standard-produktbilde.webp
│   │   │   ├── tunfiskbaguette.webp
│   │   │   ├── tunfisksalat_sandwich.webp
│   │   │   └── vegetarbaguette.webp
│   │   ├── cakes
│   │   │   ├── Barnebursdag.webp
│   │   │   ├── Bryllup.webp
│   │   │   ├── Halloween.webp
│   │   │   ├── Jubileum.webp
│   │   │   ├── Jul.webp
│   │   │   ├── Konfirmasjon.webp
│   │   │   ├── Valentin.webp
│   │   │   ├── brownies.webp
│   │   │   ├── bursdag-voksen.webp
│   │   │   ├── cupcakes.webp
│   │   │   ├── eplekake.webp
│   │   │   ├── frukttaerte.webp
│   │   │   ├── gulrotkake.webp
│   │   │   ├── konfirmasjon.webp
│   │   │   ├── makroner.webp
│   │   │   ├── marmorkake.webp
│   │   │   ├── ostekake_baer.webp
│   │   │   ├── pavlova.webp
│   │   │   ├── red_velvet.webp
│   │   │   ├── sitronkake.webp
│   │   │   ├── sjokoladefondant.webp
│   │   │   ├── sjokoladekake.webp
│   │   │   ├── sjokolademousse.webp
│   │   │   ├── standard-produktbilde.webp
│   │   │   ├── tiramisu.webp
│   │   │   └── uten-tema.webp
│   │   ├── icons
│   │   │   ├── icon-192x192.png
│   │   │   └── icon-512x512.png
│   │   ├── logo.webp
│   │   └── logo_bakst-og-brygg.webp
│   ├── index.html
│   ├── js
│   │   ├── admin
│   │   │   ├── ordersController.js
│   │   │   ├── ordersView.js
│   │   │   ├── pickedUpOrdersController.js
│   │   │   └── pickedUpOrdersView.js
│   │   ├── auth
│   │   │   ├── authController.js
│   │   │   ├── loginController.js
│   │   │   ├── loginModel.js
│   │   │   └── loginView.js
│   │   ├── cart
│   │   │   ├── cartController.js
│   │   │   ├── cartView.js
│   │   │   ├── checkoutController.js
│   │   │   └── checkoutView.js
│   │   ├── checkout
│   │   │   └── checkoutView.js
│   │   ├── products
│   │   │   ├── cafeMenuController.js
│   │   │   ├── cafeMenuView.js
│   │   │   ├── cakeMenuController.js
│   │   │   ├── cakeMenuView.js
│   │   │   ├── productAddController.js
│   │   │   ├── productAddView.js
│   │   │   ├── productEditController.js
│   │   │   ├── productEditView.js
│   │   │   ├── productInventoryController.js
│   │   │   └── productInventoryView.js
│   │   ├── shared
│   │   │   ├── common.js
│   │   │   ├── controller.js
│   │   │   ├── model.js
│   │   │   └── view.js
│   │   ├── utils
│   │   │   ├── clearLocalStorage.js
│   │   │   └── version.js
│   │   └── vendors
│   │       ├── dayjs.min.js
│   │       ├── nb.js
│   │       └── purify.min.js
│   ├── manifest.json
│   └── service-worker.js
└── update-readme.js

34 directories, 222 files
```
#update_structure_end#

## Arkitektur

#update_architecture_start#
```mermaid
flowchart TB
  subgraph Frontend["Browser Entry Points"]
    IndexHTML["index.html"]
    AdminHTML["admin/*.html"]
  end

  subgraph Core["Core System"]
    Model["model.js<br>- products[]<br>- orders[]<br>- app{}<br>- inputs{}"]
    BaseView["view.js<br>- updateView()<br>- createCurrentPageHtml()"]
    BaseController["controller.js<br>- switchMenu()"]
    Common["common.js<br>- getProductsForCategory()<br>- openProductInfo()"]
  end

  subgraph Products["Product Management"]
    CafeMenu["cafeMenuController.js<br>- switchTab()<br>- addToCart()"]
    CafeView["cafeMenuView.js"]
    CakeMenu["cakeMenuController.js"]
    CakeView["cakeMenuView.js"]
    ProductInv["productInventoryController.js"]
  end

  subgraph Cart["Shopping Cart"]
    CartCtrl["cartController.js"]
    CartView["cartView.js"]
    CheckoutCtrl["checkoutController.js"]
  end

  subgraph Admin["Admin System"]
    OrdersCtrl["ordersController.js"]
    OrdersView["ordersView.js"]
    Auth["authController.js"]
  end

  Core --> Products
  Core --> Cart
  Core --> Admin
  Frontend --> Core
```
#update_architecture_end#

