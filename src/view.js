function updateView() {
  document.getElementById('app').replaceChildren(createCurrentPageHtml());
}

function createCurrentPageHtml() {
  if (model.app.currentPage === 'cafeMenu') {
    return createCafeMenuHtml();
  }
  if (model.app.currentPage === 'cakeThemes') {
    return createThemesMenuHtml();
  }
  if (model.app.currentPage === 'cakes') {
    return createCakeMenuHtml();
  }
  if (model.app.currentPage === 'shoppingCart') {
    if (model.inputs.shoppingCart.case !== 'Overview') {
        return createCheckoutView();
    }
    return createShoppingCartHtml();
  }
  return '';
}