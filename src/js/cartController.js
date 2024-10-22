/**
 * Oppdaterer handlekurven med antall varer og viser relevant varselmelding basert på handlingen.
 *
 * @param {string} action - Handlingen som ble utført, kan være 'add', 'remove' eller 'clear'
 */
function updateCart(action) {
  const cartLink = document.getElementById('cartLink');
  const cartCount = document.getElementById('cartCount');

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (action === 'add') {
    showCartNotification('Produkt lagt til i handlekurven!');
  } else if (action === 'remove') {
    showCartNotification('Produkt fjernet fra handlekurven!');
  } else if (action === 'clear') {
    showCartNotification('Handlekurven er nå tom!');
  }

  cartLink.classList.add('bounce', 'pulse');

  setTimeout(() => {
    cartLink.classList.remove('bounce', 'pulse');
  }, 600);

  if (model.app.currentPage === 'shoppingCart') {
    renderCart();
  }
}
