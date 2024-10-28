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
  const selectedProduct = model.app.selectedProduct;

  if (selectedProduct && selectedProduct.type === 'customizable') {
    model.inputs.themeCakeMenu.size = 8;
    model.inputs.themeCakeMenu.selectedThemeId = 1;
    model.inputs.themeCakeMenu.selectedFlavor = 'Vanilje';
    model.inputs.themeCakeMenu.quantity = 1;
  } else if (selectedProduct) {
    model.inputs.cakeMenu.size = 8;
    model.inputs.cakeMenu.quantity = 1;
  }

  model.app.selectedProduct = null;

  model.inputs.cafeMenu.message = '';
  model.inputs.cafeMenu.quantity = 1;
  model.inputs.cakeMenu.size = 8;
  model.inputs.cakeMenu.quantity = 1;
  model.inputs.cakeMenu.message = '';
  updateView();
}

function getProductsForCurrentPage() {
  if (model.app.currentPageIndex === cafeMenu) {
    return getProductsForCurrentTab();
  } else if (model.app.currentPageIndex === cakes) {
    return getProductsForCategory('cakes');
  }
}

function safeText(text) {
  const sanitizedText = DOMPurify.sanitize(text);
  return sanitizedText
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
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

function addProductToCart(productId) {
  const product = getProductFromId(productId);
  const isCustomizable = product.type === 'customizable';
  let name = product.productName;
  let price = product.unitPrice;
  let quantity;
  let message = '';

  if (isCustomizable) {
    name += ` - ${model.inputs.themeCakeMenu.selectedFlavor} (${model.inputs.themeCakeMenu.size} personer)`;
    price = model.calculateCustomCakePrice(
      model.inputs.themeCakeMenu.selectedThemeId,
      model.inputs.themeCakeMenu.size,
    );
    quantity = model.inputs.themeCakeMenu.quantity;
    message = model.inputs.themeCakeMenu.message || '';
  } else {
    quantity = model.inputs.cafeMenu
      ? model.inputs.cafeMenu.quantity
      : model.inputs.cakeMenu.quantity;
    message = model.inputs.cafeMenu
      ? model.inputs.cafeMenu.message
      : model.inputs.cakeMenu.message;
  }

  addToCart(name, price, productId, quantity);

  console.log('Lagt til handlekurven:', {
    name,
    price,
    productId,
    quantity,
    message,
  });

  closeOverlay();

  window.addProductToCart = addProductToCart;
}
