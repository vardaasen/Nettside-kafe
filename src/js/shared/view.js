function updateView() {
  const currentPage = model.app.currentPage;
  document.getElementById('app').replaceChildren(createCurrentPageHtml());
  history.pushState({ page: currentPage }, '', `#${currentPage}`);
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
    return createShoppingCartHtml();
  }
  return '';
}

window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    model.app.currentPage = event.state.page;
    document.getElementById('app').replaceChildren(createCurrentPageHtml());
  }
});

window.addEventListener('DOMContentLoaded', () => {
  model.app.currentPage = window.location.hash
    ? window.location.hash.substring(1)
    : 'cafeMenu';
  updateView();
});
