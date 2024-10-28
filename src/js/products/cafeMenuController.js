/**
 * Bytter aktiv fane i kafémenyen og oppdaterer visningen.
 *
 * Funksjonen oppdaterer den aktive fanen i `model.inputs.cafeMenu` til den nye verdien som
 * angis av `value`, og kaller deretter `updateView()` for å rendre innholdet for den valgte fanen.
 *
 * @function
 * @name switchTab
 * @param {string} value - Verdien som representerer den nye aktive fanen.
 * @example
 * // Bytt til en ny fane og oppdater visningen:
 * switchTab('baguette');
 */
function switchTab(value) {
  model.inputs.cafeMenu.tab = value;
  updateView();
}

/**
 * Oppdaterer kommentarfeltet for tilpasninger i kafémenyen.
 *
 * Funksjonen tar inn en tekstverdi og lagrer den i `model.inputs.cafeMenu.message`.
 * Denne teksten kan inneholde eventuelle tilpasninger eller kommentarer for kaféprodukter.
 *
 * @function
 * @name updateComment
 * @param {string} value - Teksten som representerer tilpasningen eller kommentaren.
 * @example
 * // Oppdater kommentaren til en tilpasset tekst:
 * updateComment('Ekstra sterk kaffe');
 */
function updateComment(value) {
  model.inputs.cafeMenu.message = value;
}

/**
 * Legger et produkt fra kafémenyen til handlekurven.
 *
 * Denne funksjonen henter produktet basert på dets ID, kombinerer det med eventuelle tilpasninger
 * (slik som kommentarer fra brukeren), og legger det til i handlekurven med angitt antall.
 *
 * @function addCafeProductToCart
 * @param {string} id - ID-en til produktet som skal legges til i handlekurven.
 */
function addCafeProductToCart(id) {
  const product = getProductFromId(id);

  if (!product) {
    console.error('Produktet ble ikke funnet.');
    return;
  }

  const quantity = model.inputs.cafeMenu.quantity || 1;
  const comment = model.inputs.cafeMenu.message || '';

  // Kombiner produktnavn med eventuelle tilpasninger (f.eks. kommentar)
  let productName = product.productName;
  if (comment) {
    productName += ` - ${comment}`;
  }

  // Kall `addToCart` direkte med alle nødvendige parametere
  addToCart(productName, product.unitPrice, product.productId, quantity);

  // Lukk overlay hvis det er åpent
  closeOverlay();
  updateView();
}

window.addCafeProductToCart = addCafeProductToCart;
