function getProductsForCategory(category) {
  const categoryIndex = model.categories.indexOf(category);
  const list = [];
  for (const product of model.products) {
    if (product.categoryIndex === categoryIndex) {
      list.push(product);
    }
  }
  return list;
}

function getProductFromId(id) {
  return model.products.find((product) => product.productId === id) || null;
}

function openProductInfo(id) {
  model.app.selectedProduct = id;
  updateView();
}

function closeOverlay() {
  const selectedProduct = model.app.selectedProduct;

  if (selectedProduct && selectedProduct.type === 'customizable') {
    model.inputs.themeCakeMenu.size = 8;
    model.inputs.themeCakeMenu.selectedThemeId = 1;
    model.inputs.themeCakeMenu.selectedFlavor = 'Vanilje';
    model.inputs.themeCakeMenu.quantity = 1;
  } else if (selectedProduct) {
    model.inputs.cakeMenu.size = 8;
    model.inputs.cakeMenu.quantity = 1;
  }

  model.app.selectedProduct = null;

  updateView();
}

function getProductsForCurrentPage() {
  if (model.app.currentPageIndex === cafeMenu) {
    return getProductsForCurrentTab();
  } else if (model.app.currentPageIndex === cakes) {
    return getProductsForCategory('cakes');
  }
}

/**
 * Håndterer toggling av hamburger-menyen og lukker menyen når en navigasjonsknapp klikkes.
 */
function hamburger() {
  document
    .getElementById('hamburger-menu')
    .addEventListener('click', function () {
      document.querySelector('#header-container').classList.toggle('is-active');
    });

  const navButtons = document.querySelectorAll('.header__nav button');

  navButtons.forEach((button) => {
    button.addEventListener('click', function () {
      document.querySelector('#header-container').classList.remove('is-active');
    });
  });
}

/**
 * Formaterer en dato- og tidsstreng til formatet `DD-MM-YYYY HH:mm`.
 *
 * Denne funksjonen tar en dato i formatet `YYYY-MM-DD` og en tid i
 * formatet `HH:mm`, og returnerer en kombinert streng i formatet `DD-MM-YYYY HH:mm`.
 *
 * @param {string} dateString - Dato-strengen i formatet `YYYY-MM-DD`.
 * @param {string} timeString - Tidsstrengen i formatet `HH:mm`.
 * @returns {string} Den formaterte dato- og tidsstrengen som `DD-MM-YYYY HH:mm`.
 *
 * @example
 * // Returnerer '20-02-1974 14:00'
 * formatDateTime('1974-02-20', '14:00');
 */
function formatDateTime(dateString, timeString) {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year} ${timeString}`;
}
