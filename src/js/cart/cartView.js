// cartView.js
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
          <button id="checkoutButton" 
                  onclick="goToPickupTime()" 
                  ${getCartItems().length === 0 ? 'disabled' : ''}>
              Til kassen
          </button>
      </div>
  `;
  setTimeout(renderCart, 0);
  return shoppingCart;
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutButton = document.getElementById('checkoutButton');
  const cart = getCartItems();

  if (!cartItems) return;

  cartItems.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  cart.forEach((item) => {
    cartItems.innerHTML += createCartItemHtml(item);
    total += item.price * item.quantity;
    itemCount += item.quantity;
  });

  if (cartCount) cartCount.textContent = itemCount;
  if (cartTotal) cartTotal.textContent = total;
  if (checkoutButton) checkoutButton.disabled = itemCount === 0;
}

function createCartItemHtml(item) {
  return /* HTML*/ `
    <div class="cart-item">
        <div class="cart-item-info">
            <div class="cart-item-name"><strong>${item.name}</strong></div>
            <div class="cart-item-details">${item.quantity} x ${item.price} kr</div>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.name}')">Fjern</button>
    </div>
  `;
}

function showCartNotification(message) {
  const notification = document.getElementById('cartNotification');
  if (notification) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}

// Gjør funksjonene globalt tilgjengelige
window.renderCart = renderCart;
window.showCartNotification = showCartNotification;

console.log('cartView.js loaded');
