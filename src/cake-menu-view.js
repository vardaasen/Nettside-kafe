function createCakeMenuHtml() {
  const cakes = document.createElement('div');
  cakes.id = 'cakes';
  cakes.innerHTML = /* HTML */ ` ${createCakeProductsHtml()}`;
  const overlay = createCakeProductInfoOverlayElement();
  if (overlay) {
    cakes.appendChild(overlay);
  }
  return cakes;
}

function createCakeProductsHtml() {
  const products = getProductsForCurrentPage();
  let cards = '';
  for (const product of products) {
    cards += createCakeProductCardHtml(product);
  }
  return /* HTML*/ `
      <div id='cards-grid-container'>
        <div id='cards-grid'>${cards}</div>
      </div>
    `;
}

function createCakeProductCardHtml(product) {
  return /* HTML*/ `
      <div class="product-card">
        <div class='card-header-image' onclick='openProductInfo(${product.productId})'>
          <div class='product-card-header'>${product.productName}</div>
          <img src="./img/cakes/${product.image}" alt="${product.productName}">
        </div>
        <div class="price-row">
          <div>${product.unitPrice} Kr</div>
          <button class='button-primary cart-icon' onclick='addCakeProductToCart(${product.productId})'>Legg til</button>
        </div>
      </div>
    `;
}

function createCakeProductInfoOverlayElement() {
  const product = getProductFromId(model.app.selectedProduct);
  if (product != null) {
    return createOverlayWithContent(/* HTML*/ `
        <h2>${product.productName}</h2>
        <img src='./img/cakes/${product.image}' alt="Bilde av ${product.productName}">
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
          <button id='overlay-buy' class='button-primary' onclick='addCafeProductToCart(${product.productId})'>Legg til 🛒</button>
        </div>
      `);
  }
  return null;
}
