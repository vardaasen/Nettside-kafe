function showShoppingCart() {
  model.app.currentPage = 'shoppingCart';
  updateView();
}

function createShoppingCartHtml() {
  const shoppingCart = document.createElement('div');
  shoppingCart.innerHTML = /* HTML*/ `
        <div></div>
    `;
  return shoppingCart;
}
