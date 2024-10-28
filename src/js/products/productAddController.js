const productAddController = {
  init() {
    productAddView.renderForm();
    document.getElementById('addProductForm').onsubmit = (e) => {
      e.preventDefault();
      this.addProduct();
    };
  },

  addProduct() {
    const form = document.getElementById('addProductForm');
    const newProduct = {
      productId: this.getNextProductId(),
      productName: form.productName.value,
      categoryIndex: parseInt(form.category.value),
      unitPrice: parseFloat(form.unitPrice.value),
      unitsInStock: parseInt(form.unitsInStock.value),
      description: form.description.value,
      image: form.imageUrl.value,
      preorderRequired: form.preorderRequired.checked,
    };

    model.products.push(newProduct);
    saveModel();
    window.location.href = "index.html";
  },

  getNextProductId() {
    const productIds = model.products.map((product) => product.productId);
    return Math.max(...productIds) + 1;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  productAddController.init();
});
