const productAddView = {
  renderForm() {
    const form = document.getElementById("addProductForm");
    form.classList.add("add-product-form");

    // Initial form structure
    form.innerHTML = `
      <div class="add-product-form__group">
        <label for="productName" class="add-product-form__label">Produktnavn:</label>
        <input type="text" id="productName" class="add-product-form__input" required />
      </div>

      <div class="add-product-form__group">
        <label for="category" class="add-product-form__label">Kategori:</label>
        <select id="category" class="add-product-form__select" onchange="productAddView.handleCategoryChange()" required>
          <option value="" disabled selected>Velg kategori</option>
          <option value="0">Baguette</option>
          <option value="1">Snitter</option>
          <option value="2">Kaffe</option>
          <option value="3">Kake</option>
        </select>
      </div>

      <div class="add-product-form__group" id="typeField" style="display: none;">
        <label for="type" class="add-product-form__label">Type:</label>
        <input type="text" id="type" class="add-product-form__input" value="standard" disabled />
      </div>

      <div class="add-product-form__group">
        <label for="unitPrice" class="add-product-form__label">Pris:</label>
        <input type="number" id="unitPrice" class="add-product-form__input" required />
      </div>

      <div class="add-product-form__group">
        <label for="unitsInStock" class="add-product-form__label">Lagerbeholdning:</label>
        <input type="number" id="unitsInStock" class="add-product-form__input" required />
      </div>

      <div class="add-product-form__group">
        <label for="description" class="add-product-form__label">Beskrivelse:</label>
        <textarea id="description" class="add-product-form__textarea" required></textarea>
      </div>

      <div class="add-product-form__group">
        <label for="imageUrl" class="add-product-form__label">Bilde URL:</label>
        <div class="add-product-form__input-wrapper">
          <input type="text" id="imageUrl" class="add-product-form__input" required />
          <small class="add-product-form__help-text">Bruk "<em>standard-produktbilde.webp</em>" hvis det ikke finnes et bilde for produktet ennå.</small>
        </div>
      </div>

      <div class="add-product-form__group">
        <label for="preorderRequired" class="add-product-form__label">Forhåndsbestilling 7 dager:</label>
        <input type="checkbox" id="preorderRequired" class="add-product-form__checkbox" />
      </div>

      <div class="add-product-form__actions">
        <button type="button" class="add-product-form__button add-product-form__button--save" onclick="productAddController.addProduct()">Lagre Produkt</button>
        <button type="button" class="add-product-form__button add-product-form__button--cancel" onclick="window.history.back()">Avbryt</button>
      </div>
    `;
  },

  handleCategoryChange() {
    const categorySelect = document.getElementById("category");
    const typeField = document.getElementById("typeField");

    // Show 'type' field only when Kake category is selected (index 3)
    if (categorySelect.value === "3") {
      typeField.style.display = "flex";
      document.getElementById("preorderRequired").checked = true; // Set default to true
    } else {
      typeField.style.display = "none";
      document.getElementById("preorderRequired").checked = false; // Default to false
    }
  }
};
