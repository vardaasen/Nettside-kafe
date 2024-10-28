// cartView.js
function createShoppingCartHtml() {
  const shoppingCart = document.createElement('div');
  shoppingCart.id = 'cart';
  shoppingCart.classList.add('cart');
  shoppingCart.innerHTML = /* HTML*/ `
      <div class="cart-content">
          <div class="cart-header">
              <h1>Handlekurv</h1>
              <button id="clearCartButton" onclick="clearCart()">Tøm handlekurven</button>
          </div>
          <div class="cart-items" id="cartItems">
            ${createCartItemsHtml()}
          </div>
          <div class="cart-total-container">
              <p>Totalt: &nbsp;</p>
              <span id="cartTotal">${getSumOfAllItemsInCart()}</span>&nbsp; kr
          </div>
          <button id="checkoutButton"
                  onclick="goToPickupTime()"
                  ${getCartItems().length === 0 ? 'disabled' : ''}>
              Til kassen
          </button>
      </div>
  `;
  // setTimeout(renderCart, 0);
  return shoppingCart;
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutButton = document.getElementById('checkoutButton');
  const cart = getCartItems();

  if (!cartItems) {
    return;
  }

  cartItems.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  cart.forEach((item, itemIndex) => {
    cartItems.innerHTML += createCartItemHtml(itemIndex, item);
    total += item.price * item.quantity;
    itemCount += item.quantity;
  });

  if (cartCount) {
    cartCount.textContent = itemCount;
  }
  if (cartTotal) {
    cartTotal.textContent = total;
  }
  if (checkoutButton) {
    checkoutButton.disabled = itemCount === 0;
  }
}

function createCartItemsHtml() {
  let items = '';
  model.inputs.shoppingCart.products.forEach((item, itemIndex) => {
    items += createCartItemHtml(itemIndex, item);
  });
  return items;
}

function createCartItemHtml(itemIndex, item) {
  const totalProductCost = item.price * item.quantity;
  return /* HTML*/ `
    <div class="cart-item">
        <div class="cart-item-info">
            <div class="cart-item-name"><strong>${item.name}</strong></div>
        </div>
        <div class="cart-item-message">
          <label for="cart-item-message-input-${itemIndex}">Tilpasninger:</label>
          <textarea id='cart-item-message-input-${itemIndex}' value='${item.message}' onchange="setCartItemMessage(${itemIndex}, this.value)">${item.message}</textarea>
        </div>
        <div class="cart-item-aligned-right">
          <div class="cart-item-price">${item.price} Kr</div>
          <div class="cart-item-quantity-container">
            <label for="cart-item-input-${itemIndex}">Antall:</label>
            <input id="cart-item-input-${itemIndex}" type="number" min=1 class="cart-item-quantity" value=${item.quantity} onchange="setCartItemQuantity(${itemIndex}, this.valueAsNumber)">
          </div>
          <div class="cart-item-total">Totalt ${totalProductCost} Kr</div>
          <button class="remove-btn" onclick="removeFromCart(${itemIndex})">Fjern</button>
        </div>
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

function updateCartButtonView() {
  const cartLink = document.getElementById('cartLink');
  document.getElementById('cartCount').innerText = getNrOfItemsInCart();

  if (cartLink) {
    cartLink.classList.add('bounce', 'pulse');
    setTimeout(() => {
      cartLink.classList.remove('bounce', 'pulse');
    }, 600);
  }
}

function updateCartView() {}

// Gjør funksjonene globalt tilgjengelige
// window.renderCart = renderCart;
window.showCartNotification = showCartNotification;

console.log('cartView.js loaded');
