/**
 * Oppdaterer størrelsen på en kake og tilhørende pris basert på brukerens valg.
 *
 * Funksjonen justerer størrelsen for en kake, enten tilpassbar eller standard, og oppdaterer
 * størrelsesetiketten på siden samt prisen. Prisen beregnes med hensyn til om produktet
 * er tilpassbart eller standard, ved å bruke riktig funksjon for prisberegning.
 *
 * - Oppdaterer størrelse for tilpassbare kaker i `model.inputs.themeCakeMenu.size`.
 * - Oppdaterer størrelse for standardkaker i `model.inputs.cakeMenu.size`.
 * - Viser oppdatert pris i grensesnittet ved å kalle `updatePriceDisplay`.
 *
 * @function
 * @name updateCakeSize
 * @param {string|number} size - Den nye størrelsen som brukeren har valgt.
 * @example
 * // Sett størrelsen til 16 og oppdater visningen:
 * updateCakeSize(16);
 */
function updateCakeSize(size) {
  const selectedProduct = model.app.selectedProduct;

  const sizeLabelElement = document.getElementById('selectedSize');
  if (sizeLabelElement) {
    sizeLabelElement.innerText = `Size: ${size}`;
  }

  let price;
  if (selectedProduct.type === 'customizable') {
    // For tilpassbare kaker
    model.inputs.themeCakeMenu.size = parseInt(size);
    price = model.calculateCustomCakePrice(
      model.inputs.themeCakeMenu.selectedThemeId,
      model.inputs.themeCakeMenu.size,
    );
  } else {
    // For standard kaker
    model.inputs.cakeMenu.size = parseInt(size);
    price = model.calculateStandardCakePrice(
      selectedProduct.productId,
      model.inputs.cakeMenu.size,
    );
  }

  updatePriceDisplay(price);
}

/**
 * Oppdaterer kake-temaet og justerer prisen og bildet basert på det nye temaet.
 *
 * Funksjonen setter det valgte temaet for en tilpassbar kake og oppdaterer
 * prisen i henhold til det valgte temaet og størrelsen. I tillegg oppdaterer
 * funksjonen kakebildet til å matche det nye temaet.
 *
 * - Oppdaterer valgt tema i `model.inputs.themeCakeMenu.selectedThemeId`.
 * - Beregner ny pris for kaken og oppdaterer prisvisningen.
 * - Endrer kakebildet til å reflektere det valgte temaet.
 *
 * @function
 * @name updateTheme
 * @param {string|number} themeId - ID for det valgte temaet.
 * @example
 * // Oppdater kake-tema til tema-ID 3 og oppdater visningen:
 * updateTheme(3);
 */
function updateTheme(themeId) {
  model.inputs.themeCakeMenu.selectedThemeId = parseInt(themeId);

  const price = model.calculateCustomCakePrice(
    model.inputs.themeCakeMenu.selectedThemeId,
    model.inputs.themeCakeMenu.size,
  );
  updatePriceDisplay(price);

  const themeImage = model.themeImages[themeId];
  const cakeImageElement = document.getElementById('cakeImage');
  if (cakeImageElement) {
    cakeImageElement.src = `./img/cakes/${themeImage}`;
  }
}

/**
 * Oppdaterer prisvisningen for kaken i grensesnittet.
 *
 * Funksjonen finner prisvisningselementet i DOM-en og oppdaterer det med den nye prisen
 * som sendes inn som parameter. Prisen vises i norske kroner (Kr).
 *
 * @function
 * @name updatePriceDisplay
 * @param {number} price - Den nye prisen som skal vises.
 * @example
 * // Oppdater prisen til 450 Kr i visningen:
 * updatePriceDisplay(450);
 */
function updatePriceDisplay(price) {
  const priceElement = document.getElementById('cakePrice');
  if (priceElement) {
    priceElement.innerText = `${price} Kr`;
  }
}

/**
 * Oppdaterer den valgte smaken for en tilpassbar kake.
 *
 * Funksjonen setter den angitte smaken som valgt smak i `model.inputs.themeCakeMenu.selectedFlavor`.
 * Denne smaken brukes ved bestilling for å tilpasse kaken etter brukerens ønske.
 *
 * @function
 * @name updateFlavor
 * @param {string} flavor - Den nye smaken som brukeren har valgt.
 * @example
 * // Sett smaken til "Sjokolade":
 * updateFlavor('Sjokolade');
 */
function updateFlavor(flavor) {
  model.inputs.themeCakeMenu.selectedFlavor = flavor;
}

/**
 * Legger en kake til i handlekurven, med spesifikasjoner for tilpassbare eller standardkaker.
 *
 * Funksjonen henter produktet ved hjelp av `productId` og håndterer forskjeller mellom
 * tilpassbare og standardkaker. For tilpassbare kaker blir valgt tema, størrelse, og smak
 * lagt til produktnavnet, og hvis ingen størrelse er valgt, settes den automatisk til 8.
 * Deretter beregnes pris og mengde, og produktet legges til i handlekurven med
 * den oppdaterte informasjonen.
 *
 * @function
 * @name addCakeProductToCart
 * @param {number} productId - ID-en til produktet som skal legges til i handlekurven.
 * @example
 * // Legg en tilpassbar kake til handlekurven med produkt-ID 5:
 * addCakeProductToCart(5);
 */
function addCakeProductToCart(productId) {
  const product = getProductFromId(productId);
  if (!product) {
    return;
  } // Avslutt hvis produktet ikke finnes

  const isCustomizable = product.type === 'customizable';

  // Sett størrelse til 8 dersom ingen annen størrelse er valgt
  if (
    isCustomizable &&
    (!model.inputs.themeCakeMenu.size || model.inputs.themeCakeMenu.size === 1)
  ) {
    model.inputs.themeCakeMenu.size = 8;
  } else if (
    !isCustomizable &&
    (!model.inputs.cakeMenu.size || model.inputs.cakeMenu.size === 1)
  ) {
    model.inputs.cakeMenu.size = 8;
  }

  const quantity = isCustomizable
    ? model.inputs.themeCakeMenu.quantity
    : model.inputs.cakeMenu.quantity;
  const price = isCustomizable
    ? model.calculateCustomCakePrice(
        model.inputs.themeCakeMenu.selectedThemeId,
        model.inputs.themeCakeMenu.size,
      )
    : model.calculateStandardCakePrice(productId, model.inputs.cakeMenu.size);

  // Lag produktnavn med tema, størrelse og smak for tilpassbare kaker
  let productName = product.productName;
  if (isCustomizable) {
    const theme = model.themes.find(
      (t) => t.themeId === model.inputs.themeCakeMenu.selectedThemeId,
    );
    const themeName = theme ? ` - ${theme.themeName}` : '';
    const sizeLabel = ` (${model.inputs.themeCakeMenu.size} personer)`;
    const flavor = model.inputs.themeCakeMenu.selectedFlavor || 'Vanilje';

    productName += `${themeName} - ${flavor}${sizeLabel}`;
  } else {
    // Legg til størrelse for standardkaker
    const sizeLabel = ` (${model.inputs.cakeMenu.size} personer)`;
    productName += sizeLabel;
  }

  // Legg produktet til i handlekurven med oppdatert navn
  addToCart(productName, price, productId, quantity);
  closeOverlay(); // Lukk overlay etter å ha lagt til i handlekurven
}
