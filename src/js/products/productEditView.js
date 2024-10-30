const productEditView = {
  populateForm: function (product) {
    const form = document.getElementById('editProductForm');
    form.classList.add('edit-product-form');

    form.innerHTML = `
      <div class="edit-product-form__group">
        <label for="productName" class="edit-product-form__label">Produktnavn:</label>
        <input type="text" id="productName" value="${product.productName}" class="edit-product-form__input" />
      </div>

      <div class="edit-product-form__group">
        <label for="unitPrice" class="edit-product-form__label">Pris:</label>
        <input type="number" id="unitPrice" value="${product.unitPrice}" class="edit-product-form__input" />
      </div>

      <div class="edit-product-form__group">
        <label for="image" class="edit-product-form__label">Bilde URL:</label>
        <input type="text" id="image" value="${product.image || ''}" class="edit-product-form__input" />
        <small class="add-product-form__help-text">Bruk <strong><em>standard-produktbilde.webp</em></strong> hvis det ikke finnes et bilde for produktet ennå.</small>
      </div>

      <div class="edit-product-form__group">
        <label class="edit-product-form__label">Forhåndsbestilling:</label>
        <div class="edit-product-form__radio-group">
          <label>
            <input type="radio" name="preorderRequired" value="true" ${product.preorderRequired ? 'checked' : ''} />
            Sant
          </label>
          <label>
            <input type="radio" name="preorderRequired" value="false" ${product.preorderRequired === false ? 'checked' : ''} />
            Usant
          </label>
        </div>
        <small class="edit-product-form__helper-text">Må dette produktet bestilles minst 7 dager i forveien?</small>
      </div>

      <div class="edit-product-form__group">
        <label for="description" class="edit-product-form__label">Beskrivelse:</label>
        <textarea id="description" class="edit-product-form__textarea">${product.description}</textarea>
      </div>

      <div class="edit-product-form__group">
        <label for="unitsInStock" class="edit-product-form__label">Lagerbeholdning:</label>
        <input type="number" id="unitsInStock" value="${product.unitsInStock}" class="edit-product-form__input" />
      </div>

      ${
        product.categoryIndex === 3 && product.type === 'standard'
          ? `
  <div class="edit-product-form__group">
    <label for="type" class="edit-product-form__label">Type:</label>
    <input type="text" id="type" value="${product.type}" class="edit-product-form__input" disabled />
  </div>
`
          : ''
      }

      <div id="themeFormContainer"></div>

      <div class="edit-product-form__actions">
        <button type="button" class="edit-product-form__button edit-product-form__button--save" onclick="productEditController.saveProduct()">Lagre Endringer</button>
        <button type="button" class="edit-product-form__button edit-product-form__button--cancel" onclick="window.history.back()">Avbryt</button>
      </div>
    `;

    if (product.type === 'customizable') {
      this.showThemeForm(model.themes);
    }

    this.createDeleteConfirmationModal();
  },

  showThemeForm: function (themes) {
    const themeFormContainer = document.getElementById('themeFormContainer');
    if (!themeFormContainer) {
      console.error('Theme form container not found.');
      return;
    }

    themeFormContainer.innerHTML = `
      <h2 class="edit-product-form__subheading">Administrer temaer</h2>
      <div class="edit-product-form__theme-container">
      <label for="themeSelector" class="edit-product-form__label">Velg tema:</label>
  <select id="themeSelector" class="edit-product-form__select" onchange="productEditView.showThemeDetails(this.value)">
    ${themes.map((theme) => `<option value="${theme.themeId}">${theme.themeName}</option>`).join('')}
  </select>
  <button onclick="productEditController.addTheme(event)" class="edit-product-form__button edit-product-form__button--add">Legg til nytt tema</button>
</div>
      <div id="themeDetailsContainer" class="edit-product-form__theme-details-container"></div>
    `;

    if (themes.length > 0) {
      this.showThemeDetails(themes[0].themeId);
    }
  },

  showThemeDetails: function (themeId, isNewTheme = false) {
    const theme = isNewTheme
      ? { themeId, themeName: '', basePrice: '', description: '' }
      : model.themes.find((t) => t.themeId == themeId);

    if (!theme) {
      console.error(`Theme with ID ${themeId} not found.`);
      return;
    }

    const themeDetailsContainer = document.getElementById(
      'themeDetailsContainer',
    );
    const imageUrl = model.themeImages[themeId] || '';

    const themeSelector = document.getElementById('themeSelector');
    if (isNewTheme) {
      themeSelector.innerHTML =
        `<option value="" disabled selected>Legg til...</option>` +
        themeSelector.innerHTML;
    } else {
      themeSelector.value = themeId;
    }

    themeDetailsContainer.innerHTML = `
      <div class="edit-product-form__group" xmlns="http://www.w3.org/1999/html">
        <label for="themeName" class="edit-product-form__label">Navn:</label>
        <input type="text" id="themeName" value="${theme.themeName}" class="edit-product-form__input" />
      </div>
      <div class="edit-product-form__group">
        <label for="themeBasePrice" class="edit-product-form__label">Grunnpris:</label>
        <input type="number" id="themeBasePrice" value="${theme.basePrice}" class="edit-product-form__input" />
      </div>
      <div class="edit-product-form__group">
        <label for="themeDescription" class="edit-product-form__label">Beskrivelse:</label>
        <textarea id="themeDescription" class="edit-product-form__textarea">${theme.description}</textarea>
      </div>
      <div class="edit-product-form__group">
        <label for="themeImageUrl" class="edit-product-form__label">Bilde URL:</label>
        <input type="text" id="themeImageUrl" value="${imageUrl}" class="edit-product-form__input" />
        <small class="add-product-form__help-text">Bruk <strong><em>standard-produktbilde.webp</em></strong> hvis det ikke finnes et bilde for produktet ennå.</small>
        ${imageUrl ? `<img src="../../img/cakes/${imageUrl}" alt="${theme.themeName}" class="edit-product-form__image-preview" />` : ''}

      </div>
      <button onclick="productEditController.saveTheme(event, ${theme.themeId})" class="edit-product-form__button edit-product-form__button--save">Lagre Tema</button>
      <button onclick="productEditView.showDeleteConfirmation(event, ${theme.themeId})" class="edit-product-form__button edit-product-form__button--delete">Slett Tema</button>
    `;
  },

  updateThemeSelector: function (themes, selectedThemeId = null) {
    const themeSelector = document.getElementById('themeSelector');
    themeSelector.innerHTML = themes
      .map(
        (theme) =>
          `<option value="${theme.themeId}">${theme.themeName}</option>`,
      )
      .join('');

    if (selectedThemeId !== null) {
      themeSelector.value = selectedThemeId;
    } else if (themes.length > 0) {
      themeSelector.value = themes[0].themeId;
    }
  },

  createDeleteConfirmationModal: function () {
    const modalHtml = `
      <div id="deleteConfirmationModal" class="modal" style="display: none;">
        <div class="modal__content">
          <p>Er du sikker på at du vil slette dette temaet?</p>
          <button id="confirmDeleteBtn" class="modal__button modal__button--confirm">Ja</button>
          <button id="cancelDeleteBtn" class="modal__button modal__button--cancel">Avbryt</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.getElementById('cancelDeleteBtn').onclick =
      this.hideDeleteConfirmation;
  },

  showDeleteConfirmation: function (event, themeId) {
    event.preventDefault();
    const modal = document.getElementById('deleteConfirmationModal');
    modal.style.display = 'flex';

    document.getElementById('confirmDeleteBtn').onclick = () => {
      productEditController.deleteTheme(null, themeId);
      this.hideDeleteConfirmation();
    };
  },

  hideDeleteConfirmation: function () {
    const modal = document.getElementById('deleteConfirmationModal');
    modal.style.display = 'none';
  },
};
