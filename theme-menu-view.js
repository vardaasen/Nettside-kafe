function createThemesMenuHtml() {
  const themes = document.createElement('div');
  themes.id = 'themes';
  themes.innerHTML = createThemesHtml();
  const overlay = createThemeInfoOverlayElement();
  if (overlay) {
    themes.appendChild(overlay);
  }
  return themes;
}

function createThemesHtml() {
  let cards = '';
  for (const theme of model.themes) {
    cards += createThemeCardHtml(theme);
  }
  return /* HTML*/ `
        <div id='cards-grid-container'>
          <div id='cards-grid'>${cards}</div>
        </div>
      `;
}

function createThemeCardHtmlOld(theme) {
  return /* HTML*/ `
        <div class="product-card">
          <div class='card-header-image' onclick='openThemeInfo()'>
            <div class='product-card-header'>${theme}</div>
            <img src="./img/themes/${theme}.webp" alt="${theme}">
          </div>
        </div>
      `;
}

function createThemeCardHtml(theme, price = 'kr') {
  return /* HTML*/ `
    <article class="product-card">
      <header class="product-card__header" onclick="openThemeInfo()">
        <img class="product-card__image" src="./img/themes/${theme}.webp" alt="${theme}">
        <h2 class="product-card__title">${theme}</h2>
      </header>
      <footer class="product-card__footer">
        <div class="product-card__price">${price}</div>
        <button class="product-card__button-add button__add-to-cart" onclick="addThemeToCart('${theme}');">
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

function openThemeInfo(theme) {}

function createThemeInfoOverlayElement() {
  const theme = model.inputs.themeCakeMenu.selectedTheme;
  if (theme != null) {
    return createOverlayWithContent(/* HTML*/ `
          <h2>${theme}</h2>
          <img src='./img/themes/${theme}.webp'>
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
