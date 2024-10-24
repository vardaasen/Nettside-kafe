function addToCart(name, price, productId, quantity = 1) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
      existingItem.quantity += quantity;
  } else {
      cart.push({ name, price, quantity, productId });
  }
  updateCart('add');
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCart('remove');
}

function clearCart() {
  cart = [];
  updateCart('clear');
}

function updateCart(action) {
  const cartLink = document.getElementById('cartLink');
  const cartCount = document.getElementById('cartCount');
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCount) cartCount.textContent = count;

  if (action === 'add') {
      showCartNotification('Produkt lagt til i handlekurven!');
  } else if (action === 'remove') {
      showCartNotification('Produkt fjernet fra handlekurven!');
  } else if (action === 'clear') {
      showCartNotification('Handlekurven er nå tom!');
  }

  if (cartLink) {
      cartLink.classList.add('bounce', 'pulse');
      setTimeout(() => {
          cartLink.classList.remove('bounce', 'pulse');
      }, 600);
  }

  if (model.app.currentPage === 'shoppingCart') {
      renderCart();
  }
}

function showShoppingCart() {
  model.app.currentPage = 'shoppingCart';
  model.inputs.shoppingCart.case = 'Overview';
  updateView();
}

function getCartItems() {
  return cart;
}

// Gjør funksjonene globalt tilgjengelige
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.showShoppingCart = showShoppingCart;
window.getCartItems = getCartItems;

// Initialisering av handlevogn
let cart = [];

console.log('cartController.js loaded');