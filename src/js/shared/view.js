function updateView() {
  const app = document.getElementById('app');
  const content = createCurrentPageHtml();
  const currentPage = model.pages[model.app.currentPageIndex];

  // Håndter innholdet basert på type
  if (content instanceof HTMLElement) {
    app.replaceChildren(content);
  } else {
    const container = document.createElement('div');
    container.innerHTML = content;
    app.replaceChildren(container);
  }

  // Oppdater nettleserhistorikken
  history.pushState({ page: currentPage }, '', `#${currentPage}`);
}

function createCurrentPageHtml() {
  if (model.app.currentPageIndex === cafeMenu) {
    return createCafeMenuHtml();
  }
  if (model.app.currentPageIndex === cakeThemes) {
    return createThemesMenuHtml();
  }
  if (model.app.currentPageIndex === cakes) {
    return createCakeMenuHtml();
  }
  if (model.app.currentPageIndex === shoppingCart) {
    if (model.inputs.shoppingCart.case !== 'Overview') {
      return createCheckoutView();
    }
    return createShoppingCartHtml();
  }
  return '';
}

// Håndter tilbake/frem-knapper i nettleseren
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    model.app.currentPageIndex = model.pages.indexOf(event.state.page);
    document.getElementById('app').replaceChildren(createCurrentPageHtml());
  }
});

// Håndter initial sidelasting
window.addEventListener('DOMContentLoaded', () => {
  model.app.currentPageIndex = model.pages.indexOf(window.location.hash)
    ? window.location.hash.substring(1)
    : model.pages[cafeMenu];
  updateView();
});
