function createCafeMenuHtml() {
  const cafeMenu = document.createElement('div');
  cafeMenu.id = 'cafe-menu';
  cafeMenu.innerHTML = createTabRowHtml() + createCafeProductsHtml();
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
  const isOutOfStock = product.unitsInStock === 0;

  return /* HTML*/ `
    <article class="product-card ${isOutOfStock ? 'product-card--inactive' : ''}">
      <header class="product-card__header" ${!isOutOfStock ? `onclick="openProductInfo(${product.productId})"` : ''}>
        <img class="product-card__image" src="./img/cafe_menu/${product.image}" alt="${product.productName}">
        <h2 class="product-card__title">${product.productName}</h2>
      </header>
      <footer class="product-card__footer">
        <div class="product-card__price">${product.unitPrice} Kr</div>
        <button class="product-card__button-add button__add-to-cart"
                onclick="addCafeProductToCart(${product.productId})"
                ${isOutOfStock ? 'disabled' : ''}>
          <svg class="cart-icon" fill="currentColor" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.1 487.1" xml:space="preserve">
            <path d="M342.3,137.978H385l-63.3-108.6c-5.1-8.8-16.4-11.8-25.2-6.6c-8.8,5.1-11.8,16.4-6.6,25.2L342.3,137.978z" />
            <path d="M197.4,47.978c5.1-8.8,2.2-20.1-6.6-25.2s-20.1-2.2-25.2,6.6l-63.3,108.7H145L197.4,47.978z" />
            <path d="M455.7,171.278H31.3c-17.3,0-31.3,14-31.3,31.3v34.7c0,17.3,14,31.3,31.3,31.3h9.8l30.2,163.7
              c3.8,19.3,21.4,34.6,39.7,34.6h12h78.8c8,0,18.4,0,29,0l0,0h9.6h9.6l0,0c10.6,0,21,0,29,0h78.8h12c18.3,0,35.9-15.3,39.7-34.6
              l30.4-163.8h15.9c17.3,0,31.3-14,31.3-31.3v-34.7C487,185.278,473,171.278,455.7,171.278z M172.8,334.878v70.6
              c0,10.1-8.2,17.7-17.7,17.7c-10.1,0-17.7-8.2-17.7-17.7v-29.6v-69.4c0-10.1,8.2-17.7,17.7-17.7c10.1,0,17.7,8.2,17.7,17.7V334.878
              z M229.6,334.878v70.6c0,10.1-8.2,17.7-17.7,17.7c-10.1,0-17.7-8.2-17.7-17.7v-29.6v-69.4c0-10.1,8.2-17.7,17.7-17.7
              s17.7,8.2,17.7,17.7V334.878z M286.7,375.878v29.6c0,9.5-7.6,17.7-17.7,17.7c-9.5,0-17.7-7.6-17.7-17.7v-70.6v-28.4
              c0-9.5,8.2-17.7,17.7-17.7s17.7,7.6,17.7,17.7V375.878z M343.5,375.878v29.6c0,9.5-7.6,17.7-17.7,17.7c-9.5,0-17.7-7.6-17.7-17.7
              v-70.6v-28.4c0-9.5,7.6-17.7,17.7-17.7c9.5,0,17.7,7.6,17.7,17.7V375.878z" />
          </svg>
          ${isOutOfStock ? 'Utsolgt' : 'Legg til'}
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

    overlay.innerHTML = /* HTML*/ `
      <section class="overlay__content">
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
            <textarea id="product-comment" class="overlay__textarea" placeholder="Skriv inn eventuelle tilpasninger her..." oninput='updateCafeProductComment(this.value)'></textarea>
          </div>
        </div>

        <footer class="overlay-footer">
          <div class="overlay__quantity">
            <label for="quantity-input" class="overlay__label">Antall:</label>
            <input type="number" value="1" min="1" id="quantity-input" class="overlay__quantity-input" oninput="model.inputs.cafeMenu.quantity=this.valueAsNumber"/>
          </div>
          <button id="overlay-buy" class="overlay-button"
            onclick="addCafeProductToCart(${product.productId})">
            Legg til i handlekurv
          </button>
        </footer>
      </section
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
