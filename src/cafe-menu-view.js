function createCafeMenuHtml() {
  const cafeMenu = document.createElement('div');
  cafeMenu.id = 'cafe-menu';
  cafeMenu.innerHTML = /* HTML */ ` ${createTabRowHtml() +
  createCafeProductsHtml()}`;
  const overlay = createCafeProductInfoOverlayElement();
  if (overlay) {
    cafeMenu.appendChild(overlay);
  }
  return cafeMenu;
}

function createTabRowHtml() {
  const selectedTab = model.inputs.cafeMenu.tab;
  return /* HTML*/ `
    <div id="cafe-menu-tab-row">
      <button onclick="switchTab('baguette')" class='${selectedTab === 'baguette' ? 'selected-tab' : 'tab-button'}'>Baguetter</button>
      <button onclick="switchTab('canapes')" id='middle-tab-button' class='${selectedTab === 'canapes' ? 'selected-tab' : 'tab-button'}'>Snitter</button>
      <button onclick="switchTab('coffee')" class='${selectedTab === 'coffee' ? 'selected-tab' : 'tab-button'}'>Kaffe</button>
    </div>
  `;
}

function getProductsForCurrentTab() {
  const tab = model.inputs.cafeMenu.tab;
  return getProductsForCategory(tab);
}

function createCafeProductsHtml() {
  const products = getProductsForCurrentPage();
  let cards = '';
  for (const product of products) {
    cards += createCafeProductCardHtml(product);
  }
  return /* HTML*/ `
    <div id='cards-grid-container'>
      <div id='cards-grid'>${cards}</div>
    </div>
  `;
}

function createCafeProductCardHtml(product) {
  return /* HTML*/ `
    <div class="product-card">
      <div class='card-header-image' onclick='openProductInfo(${product.productId})'>
        <div class='product-card-header'>${product.productName}</div>
        <img src="./img/cafe_menu/${product.image}" alt="${product.productName}">
      </div>
      <div class="price-row">
        <div>${product.unitPrice} Kr</div>
        <button class='button-primary cart-icon' onclick='addCafeProductToCart(${product.productId})'>Legg til</button>
      </div>
    </div>
  `;
}

function createCafeProductInfoOverlayElement() {
  const product = getProductFromId(model.app.selectedProduct);
  if (product != null) {
    return createOverlayWithContent(/* HTML*/ `
      <h2>${product.productName}</h2>
      <img src='./img/cafe_menu/${product.image}' alt="Bilde av ${product.productName}">
      <h3>${product.unitPrice} Kr</h3>
      <div id='overlay-description'>${product.description}</div>
      <div id='overlay-comment-row'>
        <label for='product-comment'>Tilpasninger:</label>
        <textarea id='product-comment' oninput='updateComment(this.value)' placeholder='Før opp her om det er noe fu ønsker å ta bort fra produktet'></textarea>
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
