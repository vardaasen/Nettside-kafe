function updateView() {
  const app = document.getElementById('app');
  const content = createCurrentPageHtml();
  const currentPage = model.app.currentPage;
  
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

function updateView() {
  const app = document.getElementById('app');
  const content = createCurrentPageHtml();
  const currentPage = model.app.currentPage;
  
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

// Håndter tilbake/frem-knapper i nettleseren
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    model.app.currentPage = event.state.page;
    document.getElementById('app').replaceChildren(createCurrentPageHtml());
  }
});

// Håndter initial sidelasting
window.addEventListener('DOMContentLoaded', () => {
  model.app.currentPage = window.location.hash
    ? window.location.hash.substring(1)
    : 'cafeMenu';
  updateView();
});