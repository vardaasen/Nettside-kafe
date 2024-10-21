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

function createThemeCardHtml(theme) {
  return /* HTML*/ `
        <div class="product-card">
          <div class='card-header-image' onclick='openThemeInfo()'>
            <div class='product-card-header'>${theme}</div>
            <img src="./img/themes/${theme}.webp" alt="${theme}">
          </div>
        </div>
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
