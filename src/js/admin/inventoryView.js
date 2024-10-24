/**
 * Visning for varelageret.
 */
const inventoryView = {
  renderInventory() {
    const categories = model.categories;
    const products = model.products;
    const inventoryDiv = document.getElementById('inventory');
    inventoryDiv.innerHTML = '';

    inventoryDiv.innerHTML = `
      ${products
        .map((product) => {
          const category = categories[product.categoryIndex];
          return /* HTML */ `
            <div class="inventory__row">
              <div class="inventory__column">${category}</div>
              <div class="inventory__column">${product.productName}</div>
              <div class="inventory__column">
                Antall: ${product.unitsInStock}
              </div>
              <div class="inventory__column">
                <input
                  class="inventory__input"
                  type="number"
                  placeholder="Antall"
                  id="input-${product.productId}"
                />
                <button
                  onclick="inventoryController.updateProductQuantity(${product.productId}, parseInt(document.getElementById('input-${product.productId}').value))"
                >
                  Oppdater
                </button>
              </div>
            </div>
          `;
        })
        .join('')}
    `;
  },
};
