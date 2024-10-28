/**
 * Oppretter og returnerer HTML-elementet for kake-menyen.
 *
 * Denne funksjonen lager et `div`-element med `id` satt til "cakes", og fyller det
 * med HTML-innhold for kakeproduktene ved å kalle `createCakeProductsHtml()`.
 * Hvis det finnes en overleggskomponent for produktinformasjon (overlay), legges denne
 * til som et barn av `cakes`-elementet.
 *
 * @function
 * @name createCakeMenuHtml
 * @returns {HTMLElement} Div-elementet som representerer kake-menyen med produktliste og eventuelt overlay.
 * @example
 * // Bruk createCakeMenuHtml til å hente kake-menyen og legge til i DOM-en:
 * document.getElementById('app').appendChild(createCakeMenuHtml());
 */
function createCakeMenuHtml() {
  const cakes = document.createElement('div');
  cakes.id = 'cakes';

  cakes.innerHTML = createCakeProductsHtml();

  const overlay = createCakeProductInfoOverlayElement();
  if (overlay) {
    cakes.appendChild(overlay);
  }

  return cakes;
}

/**
 * Genererer og returnerer HTML-innhold for alle kakeprodukter.
 *
 * Funksjonen filtrerer produktlisten i `model.products` for å hente alle produkter
 * som tilhører kategorien med `categoryIndex` lik 3 (kaker). Deretter genererer den
 * HTML for hvert enkelt produktkort ved å kalle `createCakeProductCardHtml` for hvert produkt.
 * HTML-koden for alle produktkortene settes inn i en container med en sidetittel.
 *
 * @function
 * @name createCakeProductsHtml
 * @returns {string} HTML-innholdet for kakeproduktene, inkludert en tittel og en grid-container for produktkort.
 * @example
 * // Henter HTML-innholdet for kakeproduktene og legger det til i DOM-en:
 * document.getElementById('app').innerHTML = createCakeProductsHtml();
 */
function createCakeProductsHtml() {
  const products = model.products.filter(
    (product) => product.categoryIndex === 3,
  );
  let cards = '';

  for (const product of products) {
    cards += createCakeProductCardHtml(product);
  }

  return `
<h1 class="page__title">Kaker for enhver anledning</h1>
<p class="menu-introduction">Uansett om du feirer en spesiell dag eller bare vil unne deg noe ekstra godt, har vi kaken for deg! Utforsk vårt utvalg av håndlagde kaker, fra klassiske smaker til kreative temakaker som passer til enhver anledning. La oss gjøre øyeblikkene dine enda søtere!</p>
<div class="order-notice">
    <p class="notice-message">Kaker må bestilles minst 7 dager før ønsket hentetid.</p>
</div>
    <div id='cards-grid-container'>
      <div id='cards-grid'>${cards}</div>
    </div>
  `;
}

/**
 * Genererer HTML-innholdet for et enkelt kakeproduktkort.
 *
 * Denne funksjonen tar inn et produktobjekt og bygger et HTML-kort med detaljer
 * om produktet, inkludert bilde, navn, pris og en "Legg til"-knapp. Knappen
 * tilpasses basert på produktstatus (tilpassbar eller ikke, på lager eller utsolgt).
 *
 * - Hvis produktet er utsolgt, deaktiveres knappen, og kortet får en inaktiv stil.
 * - Hvis produktet er tilpassbart, viser knappen "Tilpass" og åpner en
 *   tilpasningsvisning ved klikk.
 * - Hvis produktet ikke er tilpassbart, viser knappen produktets pris og legger
 *   produktet direkte i handlekurven ved klikk.
 *
 * @function
 * @name createCakeProductCardHtml
 * @param {Object} product - Et produktobjekt som inneholder detaljer om produktet, som `productId`, `productName`, `unitPrice`, `type`, `image`, og `unitsInStock`.
 * @returns {string} HTML-innholdet for produktkortet, klar til å bli lagt til i DOM-en.
 * @example
 * // Genererer et HTML-produktkort og legger det til i en container:
 * const productCardHtml = createCakeProductCardHtml(product);
 * document.getElementById('cards-grid').innerHTML += productCardHtml;
 */
function createCakeProductCardHtml(product) {
  const isOutOfStock = product.unitsInStock === 0;
  const isCustomizable = product.type === 'customizable';

  return /* HTML */ `
    <article
      class="product-card ${isOutOfStock ? 'product-card--inactive' : ''}"
    >
      <header
        class="product-card__header"
        ${!isOutOfStock
          ? `onclick="openProductInfo(${product.productId})"`
          : ''}
      >
        <img
          class="product-card__image"
          src="./img/cakes/${product.image}"
          alt="${product.productName}"
        />
        <h2 class="product-card__title">${product.productName}</h2>
      </header>
      <footer class="product-card__footer">
        ${isCustomizable
          ? /* HTML*/
            `
            <div class="product-card__price">Fra 400 Kr</div>
            <button class="product-card__button-add button__add-to-cart" onclick="openProductInfo(${product.productId})">Tilpass</button>

                `
          : /* HTML*/
            `
        <div class="product-card__price">${product.unitPrice} Kr</div>
            <button
          class="product-card__button-add button__add-to-cart"
          ${isOutOfStock ? 'disabled' : ''}
          ${
            !isOutOfStock
              ? /* HTML */ `onclick="addCakeProductToCart(${product.productId})"`
              : ''
          }
        >
          <svg
            class="cart-icon"
            fill="currentColor"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 487.1 487.1"
            xml:space="preserve"
          >
            <path
              d="M342.3,137.978H385l-63.3-108.6c-5.1-8.8-16.4-11.8-25.2-6.6c-8.8,5.1-11.8,16.4-6.6,25.2L342.3,137.978z"
            />
            <path
              d="M197.4,47.978c5.1-8.8,2.2-20.1-6.6-25.2s-20.1-2.2-25.2,6.6l-63.3,108.7H145L197.4,47.978z"
            />
            <path
              d="M455.7,171.278H31.3c-17.3,0-31.3,14-31.3,31.3v34.7c0,17.3,14,31.3,31.3,31.3h9.8l30.2,163.7
              c3.8,19.3,21.4,34.6,39.7,34.6h12h78.8c8,0,18.4,0,29,0l0,0h9.6h9.6l0,0c10.6,0,21,0,29,0h78.8h12c18.3,0,35.9-15.3,39.7-34.6
              l30.4-163.8h15.9c17.3,0,31.3-14,31.3-31.3v-34.7C487,185.278,473,171.278,455.7,171.278z M172.8,334.878v70.6
              c0,10.1-8.2,17.7-17.7,17.7c-10.1,0-17.7-8.2-17.7-17.7v-29.6v-69.4c0-10.1,8.2-17.7,17.7-17.7c10.1,0,17.7,8.2,17.7,17.7V334.878
              z M229.6,334.878v70.6c0,10.1-8.2,17.7-17.7,17.7c-10.1,0-17.7-8.2-17.7-17.7v-29.6v-69.4c0-10.1,8.2-17.7,17.7-17.7
              s17.7,8.2,17.7,17.7V334.878z M286.7,375.878v29.6c0,9.5-7.6,17.7-17.7,17.7c-9.5,0-17.7-7.6-17.7-17.7v-70.6v-28.4
              c0-9.5,8.2-17.7,17.7-17.7s17.7,7.6,17.7,17.7V375.878z M343.5,375.878v29.6c0,9.5-7.6,17.7-17.7,17.7c-9.5,0-17.7-7.6-17.7-17.7
              v-70.6v-28.4c0-9.5,7.6-17.7,17.7-17.7c9.5,0,17.7,7.6,17.7,17.7V375.878z"
            />
          </svg>
          ${isOutOfStock ? 'Utsolgt' : 'Legg til'}
        </button>
                `}
      </footer>
    </article>
  `;
}

/**
 * Oppretter et overleggselement som viser detaljert informasjon om det valgte kakeproduktet.
 *
 * Funksjonen henter produktdata basert på `model.app.selectedProduct`, og oppretter et
 * HTML-seksjonselement for å vise informasjonen. Dette overlayet inkluderer produktnavn,
 * bilde, pris, og eventuelle tilpasningsalternativer (tema, størrelse, smak). Hvis produktet
 * er tilpassbart, får brukeren flere valg. Overlegget har også en "Lukk"-knapp og en
 * "Legg til i handlekurv"-knapp.
 *
 * - Produktdata hentes basert på `selectedProduct` fra modellen.
 * - Hvis produktet er tilpassbart, tilbys flere valg (tema, størrelse, smak).
 * - Hvis brukeren klikker utenfor innholdsområdet, lukkes overlayet.
 *
 * @function
 * @name createCakeProductInfoOverlayElement
 * @returns {HTMLElement|null} Overleggselementet med produktinformasjon, eller `null` hvis produktet ikke finnes.
 * @example
 * // Opprett og legg til overlayet i DOM-en:
 * const overlay = createCakeProductInfoOverlayElement();
 * if (overlay) document.body.appendChild(overlay);
 */
function createCakeProductInfoOverlayElement() {
  const product = getProductFromId(model.app.selectedProduct);

  if (product != null) {
    model.app.selectedProduct = product;

    const isCustomizable = product.type === 'customizable';

    const defaultImage = isCustomizable
      ? model.themeImages[model.inputs.themeCakeMenu.selectedThemeId]
      : product.image;
    const defaultPrice = isCustomizable
      ? model.calculateCustomCakePrice(
          model.inputs.themeCakeMenu.selectedThemeId,
          model.inputs.themeCakeMenu.size,
        )
      : model.calculateStandardCakePrice(
          product.productId,
          model.inputs.cakeMenu.size,
        );

    const overlay = document.createElement('section');
    overlay.classList.add('overlay');

    overlay.innerHTML = /* HTML*/ `
      <div class="overlay__content">
        <header class="overlay__header">
          <h2 class="overlay__title">${product.productName}</h2>
          <button class="overlay-close-button" aria-label="Lukk" onclick="closeOverlay()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>
        <div class="overlay__body">

          <img id="cakeImage" src="./img/cakes/${defaultImage}" alt="${product.productName}" class="overlay__image">
          <p class="overlay__price" id="cakePrice">${defaultPrice} Kr</p>
          <p id="productDescription">${product.description}</p>
          ${
            isCustomizable
              ? /* HTML*/ `
          <div class="overlay__row">
            <!-- Theme selection -->
            <div class="overlay__section overlay__section--half">
              <label for="themeSelect" class="overlay__themeLabel">Velg tema:</label>
              <select id="themeSelect" class="overlay__themeSelect" onchange="updateTheme(this.value)">
                ${model.themes
                  .map(
                    (theme) => `
                  <option value="${theme.themeId}" ${theme.themeId === model.inputs.themeCakeMenu.selectedThemeId ? 'selected' : ''}>
                    ${theme.themeName}
                  </option>
                `,
                  )
                  .join('')}
              </select>
            </div>

            <div class="overlay__section overlay__section--half">
              <label for="sizeSelect" class="overlay__sizeLabel">Velg størrelse:</label>
              <select id="sizeSelect" class="overlay__sizeSelect" onchange="updateCakeSize(this.value)">
                <option value="8" ${model.inputs.themeCakeMenu.size === 8 ? 'selected' : ''}>Liten (8 pax)</option>
                <option value="12" ${model.inputs.themeCakeMenu.size === 12 ? 'selected' : ''}>Medium (12 pax)</option>
                <option value="16" ${model.inputs.themeCakeMenu.size === 16 ? 'selected' : ''}>Stor (16 pax)</option>
              </select>
            </div>
          </div>
              `
              : /* HTML*/ `
          <div class="overlay__section">
            <label for="sizeSelect" class="overlay__sizeLabel">Velg størrelse:</label>
            <select id="sizeSelect" class="overlay__sizeSelect" onchange="updateCakeSize(this.value)">
              <option value="8" ${model.inputs.cakeMenu.size === 8 ? 'selected' : ''}>Liten (8 pax)</option>
              <option value="12" ${model.inputs.cakeMenu.size === 12 ? 'selected' : ''}>Medium (12 pax)</option>
              <option value="16" ${model.inputs.cakeMenu.size === 16 ? 'selected' : ''}>Stor (16 pax)</option>
            </select>
          </div>
              `
          }
         ${
           isCustomizable
             ? /* HTML*/ `
          <div class="overlay__section"><label for="flavorSelect" class="overlay__flavorLabel">Velg smak:</label>
          <select id="flavorSelect" class="overlay__flavorSelect" onchange="updateFlavor(this.value)">
            ${model.flavors
              .map(
                (flavor) => `
              <option value="${flavor}" ${flavor === model.inputs.themeCakeMenu.selectedFlavor ? 'selected' : ''}>
                ${flavor}
              </option>
            `,
              )
              .join('')}
          </select></div>
          `
             : ''
         }

          <div class="overlay__section overlay__section--comment">
            <label for="product-comment" class="overlay__label">Tilpasninger:</label>
            <textarea id="product-comment" class="overlay__textarea" placeholder="Skriv inn eventuelle tilpasninger her..." oninput="updateCakeProductComment(this.value)">${isCustomizable ? model.inputs.themeCakeMenu.message : ''}</textarea>
          </div>

          <footer class="overlay-footer">
            <div class="overlay__quantity">
              <label for="quantityInput" class="overlay__label">Antall:</label>
              <input type="number" id="quantityInput" class="overlay__quantity-input" value="${isCustomizable ? model.inputs.themeCakeMenu.quantity : model.inputs.cakeMenu.quantity}" min="1" oninput="model.inputs.${isCustomizable ? 'themeCakeMenu' : 'cakeMenu'}.quantity = this.valueAsNumber" />
            </div>
            <button id="overlay-buy" class="overlay-button" onclick="addCakeProductToCart(${product.productId})">Legg til i handlekurv</button>
          </footer>

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
