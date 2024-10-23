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
    <article class="product-card">
      <header class="product-card__header" onclick="openProductInfo(${product.productId})">
        <img class="product-card__image" src="./img/cafe_menu/${product.image}" alt="${product.productName}">
        <h2 class="product-card__title">${product.productName}</h2>
      </header>
      <footer class="product-card__footer">
        <div class="product-card__price">${product.unitPrice} Kr</div>
        <button class="product-card__button-add button__add-to-cart" onclick="addToCart('${product.productName}', ${product.unitPrice});">
          <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Legg til
        </button>
      </footer>
    </article>
  `;
}

function createCafeProductInfoOverlayElement() {
  const product = getProductFromId(model.app.selectedProduct);
  if (product != null) {
    const overlay = document.createElement('section');
    overlay.classList.add('overlay');

    overlay.innerHTML = `
      <div class="overlay__content">
        <header class="overlay-header">
          <h2 class="overlay__title">${product.productName}</h2>
          <button class="overlay-close-button" aria-label="Lukk" onclick="closeOverlay()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div class="overlay__body">
          <img src='./img/cafe_menu/${product.image}' alt="${product.productName}" class="overlay__image">
          <p class="overlay__price">${product.unitPrice ? `${product.unitPrice} Kr` : 'Pris ikke tilgjengelig'}</p>
          <p class="overlay__description">${product.description}</p>

          <div class="overlay__section overlay__section--comment">
            <label for="product-comment" class="overlay__label">Tilpasninger:</label>
            <textarea id="product-comment" class="overlay__textarea" placeholder="Skriv inn eventuelle tilpasninger her..." oninput='updateComment(this.value)'></textarea>
          </div>
        </div>

        <footer class="overlay-footer">
          <div class="overlay__quantity">
            <label for="quantity-input" class="overlay__label">Antall:</label>
            <input type="number" value="1" min="1" id="quantity-input" class="overlay__input" oninput="model.inputs.cafeMenu.quantity=this.valueAsNumber"/>
          </div>
          <button id="overlay-buy" class="overlay-button"
            onclick="addToCart('${product.productName}', ${product.unitPrice}, model.inputs.cafeMenu.quantity)">
            Legg til i handlekurv
          </button>
        </footer>
      </div>
    `;

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeOverlay();
      }
    });

    return overlay;
  }
  return null;
}
