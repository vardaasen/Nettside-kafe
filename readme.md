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
