function createCafeMenuHtml() {
  const cafeMenu = document.createElement('div');
  cafeMenu.id = 'cafe-menu';
  cafeMenu.innerHTML = /* HTML */ ` ${createTabRowHtml() +
  createProductsHtml()}`;
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
      <button onclick="switchTab('baguette')" class='${selectedTab === 'baguette' ? 'selected-tab' : ''}'>Baguetter</button>
      <button onclick="switchTab('canapes')" class='${selectedTab === 'canapes' ? 'selected-tab' : ''}'>Snitter</button>
      <button onclick="switchTab('coffee')" class='${selectedTab === 'coffee' ? 'selected-tab' : ''}'>Kaffe</button>
    </div>
  `;
}

function getProductsForCurrentTab() {
  const tab = model.inputs.cafeMenu.tab;
  return getProductsForCategory(tab);
}

function getProductsForCurrentPage() {
  const currentPage = model.app.currentPage;
  if (currentPage === 'cafeMenu') {
    return getProductsForCurrentTab();
  } else {
    return getProductsForCategory(currentPage);
  }
}

function createProductsHtml() {
  const products = getProductsForCurrentPage();
  let cards = '';
  for (const product of products) {
    cards += createProductCardHtml(product);
  }
  return /* HTML*/ `
    <div id='cards-grid-container'>
      <div id='cards-grid'>${cards}</div>
    </div>
  `;
}

function createProductCardHtml(product) {
  return /* HTML*/ `
    <div class="product-card">
      <div class='product-card-header'>${product.productName}</div>
      <img src="./img/${product.image}" alt="${product.productName}">
      <div class="price-row">
        <div>${product.unitPrice} Kr</div>
        <button >Kjøp 🛒</button>
      </div>
    </div>
  `;
}

function createCafeProductInfoOverlayElement() {
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
