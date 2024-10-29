const productEditController = {
  init: function () {
    const productId = parseInt(window.location.search.substring(1), 10);
    const product = model.products.find((p) => p.productId === productId);

    if (!product) {
      console.error('Produkt ikke funnet.');
      return;
    }

    this.product = product;
    document.querySelector('h1').innerHTML =
      `Rediger <em>${product.productName}</em>`;
    document.title = `Rediger "${product.productName}"`;
    productEditView.populateForm(product);

    if (product.type === 'customizable') {
      productEditView.showThemeForm(model.themes);
    }
  },

  saveProduct: function (event) {
    if (event) {
      event.preventDefault();
    }

    const updatedProduct = {
      ...this.product,
      productName: document.getElementById('productName').value,
      unitPrice: parseFloat(document.getElementById('unitPrice').value),
      description: document.getElementById('description').value,
      unitsInStock: parseInt(document.getElementById('unitsInStock').value, 10),
      preorderRequired: document.getElementById('preorderRequired')?.checked,
      customizationAvailable: document.getElementById('customizationAvailable')
        ?.checked,
    };

    const productIndex = model.products.findIndex(
      (p) => p.productId === this.product.productId,
    );
    if (productIndex !== -1) {
      model.products[productIndex] = updatedProduct;
      saveModel();
      alert('Produktet er oppdatert!');
      window.location.reload();
      window.location.href = './index.html';
    } else {
      console.error('Produkt ikke funnet i modellen.');
    }
  },

  saveTheme: function (event, themeId) {
    if (event) {
      event.preventDefault();
    }

    const themeIndex = model.themes.findIndex(
      (theme) => theme.themeId === themeId,
    );

    if (themeIndex === -1) {
      console.log('Adding new theme to model');

      const nextId =
        model.themes.length > 0
          ? Math.max(...model.themes.map((t) => t.themeId)) + 1
          : 1;
      themeId = nextId;

      model.themes.push({
        themeId,
        themeName: document.getElementById('themeName').value,
        basePrice: parseFloat(document.getElementById('themeBasePrice').value),
        description: document.getElementById('themeDescription').value,
      });
      model.themeImages[themeId] =
        document.getElementById('themeImageUrl').value;
    } else {
      model.themes[themeIndex] = {
        themeId,
        themeName: document.getElementById('themeName').value,
        basePrice: parseFloat(document.getElementById('themeBasePrice').value),
        description: document.getElementById('themeDescription').value,
      };
      model.themeImages[themeId] =
        document.getElementById('themeImageUrl').value;
    }

    saveModel();
    productEditView.updateThemeSelector(model.themes, themeId); // Pass the saved theme ID to be selected
    productEditView.showThemeDetails(themeId); // Show the saved theme in the fields
    alert('Temaet er oppdatert!');
  },

  addTheme: function (event) {
    if (event) {
      event.preventDefault();
    }
    console.log('Adding a new theme');

    const newThemeId =
      model.themes.length > 0
        ? Math.max(...model.themes.map((t) => t.themeId)) + 1
        : 1;
    productEditView.showThemeDetails(newThemeId, true); // Show the form for a new theme
  },

  deleteTheme: function (event, themeId) {
    if (event) {
      event.preventDefault();
    }
    console.log(`Deleting theme with ID: ${themeId}`);

    model.themes = model.themes.filter((theme) => theme.themeId !== themeId);
    delete model.themeImages[themeId];
    saveModel();

    productEditView.updateThemeSelector(model.themes);

    if (model.themes.length > 0) {
      productEditView.showThemeDetails(model.themes[0].themeId); // Show the first theme in the list
    } else {
      document.getElementById('themeDetailsContainer').innerHTML =
        '<p>Ingen temaer tilgjengelig.</p>';
    }

    alert('Temaet er slettet!');
  },
};

document.addEventListener('DOMContentLoaded', () =>
  productEditController.init(),
);
