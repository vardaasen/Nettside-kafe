function switchTab(value) {
  model.inputs.cafeMenu.tab = value;
  updateView();
}
// function openCafeMenuProductInfo(id) {
//   model.app.overlayForProductId = id;
//   updateView();
// }

// function closeCafeProductInfo() {
//   model.inputs.cafeMenu.selectedProduct = null;
//   model.inputs.cafeMenu.quantity = 1;
//   model.inputs.cafeMenu.message = '';
//   updateView();
// }

function updateComment(value) {
  model.inputs.cafeMenu.message = value;
}

function addCafeProductToCart(id) {
  const product = getProductFromId(id);

  if (!product) {
    console.error("Produktet ble ikke funnet.");
    return;
  }

  const quantity = model.inputs.cafeMenu.quantity || 1;
  const comment = model.inputs.cafeMenu.message || '';

  // Kombiner produktnavn med eventuelle tilpasninger (f.eks. kommentar)
  let productName = product.productName;
  if (comment) {
    productName += ` - ${comment}`;
  }

  // Kall `addToCart` direkte med alle nødvendige parametere
  addToCart(productName, product.unitPrice, product.productId, quantity);

  // Lukk overlay hvis det er åpent
  closeOverlay();
  updateView();
}

window.addCafeProductToCart = addCafeProductToCart;
