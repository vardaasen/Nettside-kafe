function switchTab(value) {
  model.inputs.cafeMenu.tab = value;
  updateView();
}

function switchMenu(value) {
  model.app.currentPage = value;
  updateView();
}

function openCafeMenuProductInfo(id) {
  model.inputs.cafeMenu.selectedProduct = id;
  updateView();
}

function closeCafeProductInfo() {
  model.inputs.cafeMenu.selectedProduct = null;
  model.inputs.cafeMenu.quantity = 1;
  model.inputs.cafeMenu.message = '';
  updateView();
}

function updateComment(value) {
  model.inputs.cafeMenu.message = value;
}

function addCafeProductToCart(id) {
  const product = getProductById();
  const quantity = model.inputs.cafeMenu.quantity;
  if (quantity > 0) {
    const productId = product.productId;
    const comment = model.inputs.cafeMenu.message;
    const quantity = model.inputs.cafeMenu.quantity;
    model.inputs.shoppingCart.products.push({
      productId,
      quantity,
      comment,
    });
    closeCafeProductInfo();
  }
}
