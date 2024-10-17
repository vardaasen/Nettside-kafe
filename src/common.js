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

function createOverlayWithContent(content) {
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.innerHTML = /* HTML */ `<div id="overlay-content">${content}</div>`;
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeCafeProductInfo();
    }
  });
  return overlay;
}
