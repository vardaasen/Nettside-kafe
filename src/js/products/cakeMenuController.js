function updateCakeSize(size) {
  const selectedProduct = model.app.selectedProduct;

  // Update size label text
  const sizeLabelElement = document.getElementById('selectedSize');
  if (sizeLabelElement) {
    sizeLabelElement.innerText = `Size: ${size}`;
  }

  let price;
  if (selectedProduct.type === 'customizable') {
    // For customizable cakes
    model.inputs.themeCakeMenu.size = parseInt(size);
    price = model.calculateCustomCakePrice(
      model.inputs.themeCakeMenu.selectedThemeId,
      model.inputs.themeCakeMenu.size,
    );
  } else {
    // For standard cakes
    model.inputs.cakeMenu.size = parseInt(size);
    price = model.calculateStandardCakePrice(
      selectedProduct.productId,
      model.inputs.cakeMenu.size,
    );
  }

  // Update the price display
  updatePriceDisplay(price);
}

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

function updatePriceDisplay(price) {
  const priceElement = document.getElementById('cakePrice');
  if (priceElement) {
    priceElement.innerText = `${price} Kr`;
  }
}
function updateFlavor(flavor) {
  model.inputs.themeCakeMenu.selectedFlavor = flavor;
}

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
