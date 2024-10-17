function createCafeMenuHtml() {
  return /* HTML */ ` ${createTabRowHtml()} ${createProductsHtml()} `;
}

function createThemeCakeMenuHtml() {
  return /* HTML */ ` ${createProductsHtml()} `;
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

function getProductsForCurrentTab(category) {
  const tab = model.inputs.cafeMenu.tab;
  return getProductsForCategory(tab);
}

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

function getProductsForCurrentPage() {
  const currentPage = model.app.currentPage;
  if (currentPage === 'cafeMenu') {
    return getProductsForCurrentTab();
  } else if (currentPage === 'themeCake') {
    const list = [];
    for (const product of model.products) {
      const categoryIndex = model.categories.indexOf(currentPage);
      if (product.categoryIndex === categoryIndex) {
        list.push(product);
      }
    }
    return list;
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
      <img src="./img/${product.image}">
      <div class="price-row">
        <div>${product.unitPrice} Kr</div>
        <button>Kjøp 🛒</button>
      </div>
    </div>
  `;
}
