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
          <button class="button__add-to-cart cart-icon" onclick="addToCart('${product.productName}', ${product.unitPrice});">Legg til</button>
        </div>
      </div>
    `;
}

function createCakeProductInfoOverlayElement() {
  const product = getProductFromId(model.app.selectedProduct);
  if (product != null) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    overlay.innerHTML = `
      <div class="overlay__content">
        <button class="overlay__close-button" onclick="closeOverlay()">╳</button>
        <h2 class="overlay__title">${product.productName}</h2>
        <img src='./img/cakes/${product.image}' alt="${product.productName}" class="overlay__image">
        <p class="overlay__price">${product.unitPrice} Kr</p>
        <p class="overlay__description">${product.description}</p>

        <div class="overlay__section overlay__section--comment">
          <label for="product-comment" class="overlay__label">Tilpasninger:</label>
          <textarea id="product-comment" class="overlay__textarea" placeholder="Skriv inn eventuelle tilpasninger her..." oninput='updateComment(this.value)'></textarea>
        </div>

        <div class="overlay__section overlay__section--buy">
          <div class="overlay__quantity">
            <label for="quantity-input" class="overlay__label">Antall:</label>
            <input type="number" value="1" min="1" id="quantity-input" class="overlay__input" oninput="model.inputs.cakeMenu.quantity=this.valueAsNumber"/>
          </div>
          <button id="overlay-buy" class="button"
            onclick="addToCart('${product.productName}', ${product.unitPrice}, model.inputs.cakeMenu.quantity)">
            Legg til i handlekurv
          </button>
        </div>
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

