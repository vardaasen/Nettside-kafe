function updateView() {
  const app = document.getElementById('app');
  const content = createCurrentPageHtml();
  
  // Hvis content er et HTML element
  if (content instanceof HTMLElement) {
      app.replaceChildren(content);
  } else {
      // Hvis content er en string, lag et div element
      const container = document.createElement('div');
      container.innerHTML = content;
      app.replaceChildren(container);
  }
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