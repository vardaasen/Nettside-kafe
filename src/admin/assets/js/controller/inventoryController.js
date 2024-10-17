/**
 * Kontrollør for varelageret.
 * @namespace inventoryController
 */
const inventoryController = {
  /**
   * Initialiserer varelageret ved å hente produkter og kategorier.
   * @function
   */
  init: function() {
    const products = model.getProducts();
    const categories = model.categories;

    inventoryView.renderInventory(products, categories);
  },

  /**
   * Oppdaterer mengden av et produkt i varelageret.
   * @function
   * @param {number} productId - ID-en til produktet som skal oppdateres.
   * @param {number} addedQuantity - Mengden som skal legges til.
   */
  updateProductQuantity: function(productId, addedQuantity) {
    model.addCustomQuantity(productId, addedQuantity);
    this.init();
  }
};

// Initialiser varelageret når siden lastes
inventoryController.init();
