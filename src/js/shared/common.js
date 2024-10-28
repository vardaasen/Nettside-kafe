function getProductsForCategory(category) {
  const categoryIndex = model.categories.indexOf(category);
  const list = [];
  for (const product of model.products) {
    if (product.categoryIndex === categoryIndex) {
      list.push(product);
    }
  }
  return list;
}

function getProductFromId(id) {
  return model.products.find((product) => product.productId === id) || null;
}

function openProductInfo(id) {
  model.app.selectedProduct = id;
  updateView();
}

/*
function createOverlayWithContent(content) {
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.innerHTML = `<div id="overlay-content">${content}</div>`;
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });
  return overlay;
} */

function closeOverlay() {
  model.app.selectedProduct = null;
  model.inputs.cafeMenu.message = '';
  model.inputs.cafeMenu.quantity = 1;
  model.inputs.cakeMenu.size = 8;
  model.inputs.cakeMenu.quantity = 1;
  updateView();
}

function getProductsForCurrentPage() {
  if (model.app.currentPageIndex === cafeMenu) {
    return getProductsForCurrentTab();
  } else if (model.app.currentPageIndex === cakes) {
    return getProductsForCategory('cakes');
  }
}

/**
 * Håndterer toggling av hamburger-menyen og lukker menyen når en navigasjonsknapp klikkes.
 */
function hamburger() {
  document
    .getElementById('hamburger-menu')
    .addEventListener('click', function () {
      document.querySelector('#header-container').classList.toggle('is-active');
    });

  const navButtons = document.querySelectorAll('.header__nav button');

  navButtons.forEach((button) => {
    button.addEventListener('click', function () {
      document.querySelector('#header-container').classList.remove('is-active');
    });
  });
}
