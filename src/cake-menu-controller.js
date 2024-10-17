function openCakeMenuProductInfo(id) {
  model.inputs.cakeMenu.selectedProduct = id;
  updateView();
}

function closeCakeProductInfo() {
  model.inputs.cakeMenu.selectedProduct = null;
  model.inputs.cakeMenu.quantity = 1;
  updateView();
}
