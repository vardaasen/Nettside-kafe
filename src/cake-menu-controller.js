function addCakeProductToCart(id) {
  const product = getProductFromId(id);
  const quantity = model.inputs.cakeMenu.quantity;
  if (quantity > 0) {
    const productId = product.productId;
    const quantity = model.inputs.cakeMenu.quantity;
    model.inputs.shoppingCart.products.push({
      productId,
      quantity,
      comment,
    });
    closeOverlay();
  }
}
