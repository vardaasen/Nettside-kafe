function createCakeMenuHtml() {
  const cafeMenu = document.createElement('div');
  cafeMenu.id = 'cafe-menu';
  cafeMenu.innerHTML = /* HTML */ ` ${createTabRowHtml() +
  createProductsHtml()}`;
  const overlay = createCakeProductInfoOverlayElement();
  if (overlay) {
    cafeMenu.appendChild(overlay);
  }
  return cafeMenu;
}

function createCakeProductInfoOverlayElement() {
  const product = getProductFromId(model.inputs.cafeMenu.selectedProduct);
  if (product != null) {
    return createOverlayWithContent(/* HTML*/ `
        <h2>${product.productName}</h2>
        <img src='./img/${product.image}'>
        <h3>${product.unitPrice} Kr</h3>
        <div id='overlay-description'>${product.description}</div>
        <div id='overlay-comment-row'>
          <label for='product-comment'>Tilpasninger:</label>
          <textarea id='product-comment' oninput='updateComment(this.value)'></textarea>
        </div>
  
        <div id='overlay-buy-row'>
          <div id='quantity-row'>
            <label for='quantity-input'>Antall:</label>
            <input value=1 type='number' id='quantity-input' oninput='model.inputs.cafeMenu.quantity=this.valueAsNumber'/>
          </div>
          <button id='overlay-buy' class='button-primary' onclick='addCafeProductToCart(${product.productId})'>Kjøp 🛒</button>
        </div>
      `);
  }
  return null;
}
