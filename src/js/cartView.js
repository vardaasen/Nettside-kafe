/**
 * Oppretter HTML-strukturen for handlekurven.
 *
 * @returns {HTMLElement} Handlekurv-elementet
 */
function createShoppingCartHtml() {
  const shoppingCart = document.createElement('div');
  shoppingCart.id = 'cart';
  shoppingCart.classList.add('cart');
  shoppingCart.innerHTML = `
    <div class="cart-content">
      <div class="cart-header">
        <h1>Handlekurv</h1>
        <button id="clearCartButton" onclick="clearCart()">Tøm handlekurven</button>
      </div>
      <div class="cart-items" id="cartItems"></div>
      <div class="cart-total-container">
        <p>Totalt: &nbsp;</p>
        <span id="cartTotal">0</span>&nbsp; kr
      </div>
      <button id="checkoutButton" onclick="goToPickupTime()" ${cart.length === 0 ? 'disabled' : ''}>
  Til kassen
</button>
    </div>
  `;
  return shoppingCart;
}

/**
 * Gjengir handlekurvens innhold på siden.
 */
function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutButton = document.getElementById('checkoutButton');
  const cart = getCartItems();

  cartItems.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  cart.forEach((item) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name"><strong>${item.name}</strong></div>
          <div class="cart-item-details">${item.quantity} x ${item.price} kr</div>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.name}'); updateCart();">Fjern</button>
      </div>
    `;
    total += item.price * item.quantity;
    itemCount += item.quantity;
  });

  cartCount.textContent = itemCount;
  cartTotal.textContent = total;
  checkoutButton.disabled = itemCount === 0;
}

/**
 * Viser handlekurven på siden.
 */
function showShoppingCart() {
  model.app.currentPage = 'shoppingCart';
  updateView();
  setTimeout(renderCart, 100);
}

/**
 * Viser en melding i handlekurv-varslingen.
 *
 * @param {string} message - Melding som skal vises i varselet
 */
function showCartNotification(message) {
  const notification = document.getElementById('cartNotification');
  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

let cart = [];

/**
 * Legger til et produkt i handlekurven.
 *
 * @param {string} name - Navnet på produktet som skal legges til.
 * @param {number} price - Prisen på produktet.
 * @param {number} [quantity=1] - Antall enheter som skal legges til. Standard er 1.
 */
function addToCart(name, price, quantity = 1) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
  updateCart('add');
}

/**
 * Fjerner et produkt fra handlekurven basert på produktets navn.
 *
 * @param {string} name - Navnet på produktet som skal fjernes.
 */
function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCart('remove');
}

/**
 * Tømmer hele handlekurven ved å fjerne alle produkter.
 */
function clearCart() {
  cart = [];
  updateCart('clear');
}

/**
 * Henter alle produkter som er lagt til i handlekurven.
 *
 * @returns {Array} En liste over produkter i handlekurven
 */
function getCartItems() {
  return cart;
}
