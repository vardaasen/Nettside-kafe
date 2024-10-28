function switchTab(value) {
  model.inputs.cafeMenu.tab = value;
  updateView();
}
// function openCafeMenuProductInfo(id) {
//   const product = getProductFromId(id);
//   model.app.selectedProduct = {
//     productId: id,
//     productName: getProductFromId(id).productName,
//     unitPrice: getProductFromId(id).unitPrice,
//     message: '',
//     quantity: 1,
//   };
//   updateView();
// }

// function closeCafeProductInfo() {
//   model.inputs.cafeMenu.selectedProduct = null;
//   model.inputs.cafeMenu.quantity = 1;
//   model.inputs.cafeMenu.message = '';
//   updateView();
// }

function updateCafeProductComment(value) {
  model.inputs.cafeMenu.message = value;
}

function addCafeProductToCart(id) {
  const product = getProductFromId(id);

  if (!product) {
    console.error('Produktet ble ikke funnet.');
    return;
  }

  const quantity =
    model.app.selectedProduct != null ? model.inputs.cafeMenu.quantity : 1;
  const message = model.inputs.cafeMenu.message;

  // Kombiner produktnavn med eventuelle tilpasninger (f.eks. kommentar)
  const productName = product.productName;

  // Kall `addToCart` direkte med alle nødvendige parametere
  addToCart(
    productName,
    product.unitPrice,
    product.productId,
    quantity,
    message,
  );

  // Lukk overlay hvis det er åpent
  closeOverlay();
  updateView();
}

window.addCafeProductToCart = addCafeProductToCart;
