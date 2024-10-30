const productInventoryView = {
  renderInventory(products = model.products) {
    const categories = model.categoryTranslations;
    const inventoryDiv = document.getElementById('inventory');

    inventoryDiv.innerHTML = '';

    inventoryDiv.innerHTML = `
      ${products
      .map((product) => {
        const category = categories[product.categoryIndex] || "Ukjent Kategori";
        return /* HTML */ `
            <div class="inventory-table__row">
              <div class="inventory-table__column inventory-table__column--product-id">${product.productId}</div>
              <div class="inventory-table__column inventory-table__column--category">${category}</div>
              <div class="inventory-table__column inventory-table__column--product-name">${product.productName}</div>
              <div class="inventory-table__column inventory-table__column--units-in-stock">Antall: ${product.unitsInStock}</div>
              <div class="inventory-table__column inventory-table__column--added-quantity">
                <input
                  class="inventory-table__input"
                  type="number"
                  placeholder="Antall"
                  id="input-${product.productId}"
                />
                <button onclick="productInventoryController.updateProductQuantity(${product.productId}, parseInt(document.getElementById('input-${product.productId}').value))">
                  Oppdater
                </button>
              </div>
              <div class="inventory-table__column inventory-table__column--action">
                <button onclick="productInventoryController.editProduct(${product.productId})">Rediger</button>
                <button onclick="productInventoryView.showDeleteConfirmation(${product.productId})">Slett</button>
              </div>
            </div>
          `;
      })
      .join('')}
    `;
  },

  showDeleteConfirmation(productId) {
    const modal = document.getElementById("deleteConfirmationModal");
    modal.style.display = "flex";

    // Ensure any previous event listeners are removed by cloning the button
    // const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    // confirmDeleteBtn.replaceWith(confirmDeleteBtn.cloneNode(true));

    // Re-select the button after cloning to attach a fresh event listener
    document.getElementById("confirmDeleteBtn").onclick = () => {
      productInventoryController.confirmDelete(productId);
      this.closeModal();
    };

    // Set up the cancel button normally
    document.getElementById("cancelDeleteBtn").onclick = this.closeModal;
  },
  /*showDeleteConfirmation(productId) {
    const modal = document.getElementById("deleteConfirmationModal");
    modal.style.display = "flex";
    document.getElementById("confirmDeleteBtn").onclick = () => {
      productInventoryController.confirmDelete(productId);
      this.closeModal();
      window.location.reload()
    };
    document.getElementById("cancelDeleteBtn").onclick = this.closeModal;
  },*/

  closeModal() {
    const modal = document.getElementById("deleteConfirmationModal");
    modal.style.display = "none";
  }
};
