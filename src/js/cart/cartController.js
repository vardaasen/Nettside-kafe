function addToCart(name, price, productId, quantity = 1) {
  const cart = model.inputs.shoppingCart.products;
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity, productId });
  }
  updateCart('add');
}

function removeFromCart(name) {
  const cart = model.inputs.shoppingCart.products;
  model.inputs.shoppingCart.products = cart.filter(
    (item) => item.name !== name,
  );
  updateCart('remove');
}

function clearCart() {
  model.inputs.shoppingCart.products = [];
  // updateView();
  updateCart('clear');
}

function updateCart(action) {
  const cartLink = document.getElementById('cartLink');
  const cartCount = document.getElementById('cartCount');
  const count = model.inputs.shoppingCart.products.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

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

  if (model.app.currentPageIndex === shoppingCart) {
    renderCart();
  }
}

function showShoppingCart() {
  model.app.currentPageIndex = shoppingCart;
  model.inputs.shoppingCart.case = 'Overview';
  updateView();
}

function getCartItems() {
  return model.inputs.shoppingCart.products;
}

// Gjør funksjonene globalt tilgjengelige
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.showShoppingCart = showShoppingCart;
window.getCartItems = getCartItems;

// Initialisering av handlevogn

console.log('cartController.js loaded');
