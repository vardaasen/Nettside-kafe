function updateCakeSize(size) {
  const selectedProduct = model.app.selectedProduct;

  const sizeLabelElement = document.getElementById('selectedSize');

  if (sizeLabelElement) {
    sizeLabelElement.innerText = `Størrelse: ${size}`;
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

  updatePriceDisplay(price);
}

function updateTheme(themeId) {
  model.inputs.themeCakeMenu.selectedThemeId = parseInt(themeId);

  const price = model.calculateCustomCakePrice(
    model.inputs.themeCakeMenu.selectedThemeId,
    model.inputs.themeCakeMenu.size,
  );

  updatePriceDisplay(price);

  const themeImage = model.themeImages(themeId);
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
