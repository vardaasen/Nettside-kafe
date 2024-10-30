let productInventoryView={renderInventory(t=model.products){let n=model.categoryTranslations;var e=document.getElementById("inventory");e.innerHTML="",e.innerHTML=`
      ${t.map(t=>{var e=n[t.categoryIndex]||"Ukjent Kategori";return`
            <div class="inventory-table__row">
              <div class="inventory-table__column inventory-table__column--product-id">${t.productId}</div>
              <div class="inventory-table__column inventory-table__column--category">${e}</div>
              <div class="inventory-table__column inventory-table__column--product-name">${t.productName}</div>
              <div class="inventory-table__column inventory-table__column--units-in-stock">Antall: ${t.unitsInStock}</div>
              <div class="inventory-table__column inventory-table__column--added-quantity">
                <input
                  class="inventory-table__input"
                  type="number"
                  placeholder="Antall"
                  id="input-${t.productId}"
                />
                <button onclick="productInventoryController.updateProductQuantity(${t.productId}, parseInt(document.getElementById('input-${t.productId}').value))">
                  Oppdater
                </button>
              </div>
              <div class="inventory-table__column inventory-table__column--action">
                <button onclick="productInventoryController.editProduct(${t.productId})">Rediger</button>
                <button onclick="productInventoryView.showDeleteConfirmation(${t.productId})">Slett</button>
              </div>
            </div>
          `}).join("")}
    `},showDeleteConfirmation(t){document.getElementById("deleteConfirmationModal").style.display="flex",document.getElementById("confirmDeleteBtn").onclick=()=>{productInventoryController.confirmDelete(t),this.closeModal()},document.getElementById("cancelDeleteBtn").onclick=this.closeModal},closeModal(){document.getElementById("deleteConfirmationModal").style.display="none"}};