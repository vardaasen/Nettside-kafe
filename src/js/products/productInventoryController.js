const productInventoryController = {
  initialize: function () {
    this.loadData();
    this.attachEventListeners();
    productInventoryView.renderInventory(); // Display all products initially
  },

  loadData: function () {
    // Refresh products data from localStorage
    const savedProducts = localStorage.getItem("productInventory");
    if (savedProducts) {
      model.products = JSON.parse(savedProducts);
    }
  },

  attachEventListeners() {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    searchInput.addEventListener("input", this.searchByProductName.bind(this));
    categoryFilter.addEventListener("change", this.filterByCategory.bind(this));
  },

  updateProductQuantity(productId, addedQuantity) {
    model.addCustomQuantity(productId, addedQuantity);
    productInventoryView.renderInventory();
  },

  addProduct() {
    window.location.href = `opprett.html`;
  },

  editProduct(productId) {
    window.location.href = `rediger.html?${productId}`;
  },

  confirmDelete(productId) {
    const productIndex = model.products.findIndex(product => product.productId === productId);
    if (productIndex !== -1) {
      model.products.splice(productIndex, 1);
      saveModel();
      this.initialize(); // Refreshes the inventory view after deletion
    } else {
      console.error(`Produkt med ID ${productId} ikke funnet.`);
    }
  },

  filterByCategory() {
    const selectedCategoryIndex = document.getElementById("categoryFilter").value;
    const filteredProducts = selectedCategoryIndex === "Alle"
      ? model.products
      : model.products.filter(product => product.categoryIndex == selectedCategoryIndex);

    productInventoryView.renderInventory(filteredProducts);
  },

  searchByProductName() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const selectedCategoryIndex = document.getElementById("categoryFilter").value;

    const filteredProducts = model.products
      .filter(product =>
        (selectedCategoryIndex === "Alle" || product.categoryIndex == selectedCategoryIndex) &&
        product.productName.toLowerCase().includes(searchTerm)
      );

    productInventoryView.renderInventory(filteredProducts);
  },

  resetSearch() {
    document.getElementById("searchInput").value = '';
    document.getElementById("categoryFilter").value = 'Alle';
    this.initialize(); // Refreshes the inventory view with all products
  }
};

// Initialize the inventory on page load
document.addEventListener("DOMContentLoaded", () => {
  productInventoryController.initialize();
});
