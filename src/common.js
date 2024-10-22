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
  updateView();
}

function getProductsForCurrentPage() {
  const currentPage = model.app.currentPage;
  if (currentPage === 'cafeMenu') {
    return getProductsForCurrentTab();
  } else {
    return getProductsForCategory(currentPage);
  }
}
