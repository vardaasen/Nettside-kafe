/* eslint-disable spaced-comment */
/*******************************************************************************
 * MODEL
 ******************************************************************************/

// TODO: Bruk eksisterende model.js.
// Dummy kategorier.
const categories = ['Baguette', 'Snitter', 'Kaffe', 'Kake'];

// TODO: Bruk eksisterende model.js.
// Dummy innhold. Produktliste med productId, categoryIndex, productName, og unitsInStock.
const products = [
  {
    productId: 1,
    categoryIndex: 0,
    productName: 'Rekebaguette',
    unitsInStock: 10,
  },
  {
    productId: 2,
    categoryIndex: 1,
    productName: 'Assortert',
    unitsInStock: 25,
  },
  {
    productId: 3,
    categoryIndex: 2,
    productName: 'Espresso',
    unitsInStock: 15,
  },
  {
    productId: 4,
    categoryIndex: 3,
    productName: 'Bursdagskake',
    unitsInStock: 0,
  },
  {
    productId: 5,
    categoryIndex: 3,
    productName: 'Princesskake',
    unitsInStock: 15,
  },
];

/*******************************************************************************
 * VIEW
 ******************************************************************************/

/**
 * Gjør produktbeholdningen synlig som rader i HTML-dokumentet.
 * Henter data fra modellen og oppdaterer visningen ved å lage en rad for hvert produkt.
 */
function renderInventory() {
  const inventoryDiv = document.getElementById('inventory');
  inventoryDiv.innerHTML = ''; // Tømmer visningen først

  products.forEach((product) => {
    // Opprett en rad for hvert produkt
    const productRow = document.createElement('div');
    productRow.className = 'inventory__row';

    // Kategori (henter kategori ved hjelp av index)
    const categoryElement = document.createElement('div');
    categoryElement.className = 'inventory__column';
    categoryElement.innerHTML = categories[product.categoryIndex];

    // Produktnavn
    const nameElement = document.createElement('div');
    nameElement.className = 'inventory__column';
    nameElement.innerHTML = product.productName;

    // Antall enheter på lager
    const unitsElement = document.createElement('div');
    unitsElement.className = 'inventory__column';
    unitsElement.innerHTML = `Antall: ${product.unitsInStock}`;

    // Inntastingsfelt for å legge til et tilpasset antall
    const inputElement = document.createElement('input');
    inputElement.className = 'inventory__column';
    inputElement.type = 'number';
    inputElement.placeholder = 'Antall';

    // Knapp for å oppdatere antall basert på input
    const addButton = document.createElement('button');
    addButton.innerHTML = 'Oppdater';
    addButton.onclick = function () {
      const addedQuantity = parseInt(inputElement.value);
      if (!isNaN(addedQuantity)) {
        addCustomQuantity(product.productId, addedQuantity);
      } else {
        alert('Vennligst oppgi et gyldig nummer.');
      }
    };

    // Opprett en div for inntastingsfeltet og knappen
    const addQuantityDiv = document.createElement('div');
    addQuantityDiv.className = 'inventory__column';
    addQuantityDiv.appendChild(inputElement);
    addQuantityDiv.appendChild(addButton);

    // Legg elementene til productRow
    productRow.appendChild(categoryElement);
    productRow.appendChild(nameElement);
    productRow.appendChild(unitsElement);
    productRow.appendChild(addQuantityDiv);

    // Legg productRow til inventory-diven
    inventoryDiv.appendChild(productRow);
  });
}

/*******************************************************************************
 * CONTROLLER
 ******************************************************************************/

/**
 * Legger til et tilpasset antall til lagerbeholdningen for et spesifikt produkt.
 *
 * @param {number} productId - ID-en til produktet som skal oppdateres.
 * @param {number} addedQuantity - Mengden som skal legges til lagerbeholdningen.
 *
 * @throws {Error} Hvis produktet med den angitte productId ikke finnes.
 */
function addCustomQuantity(productId, addedQuantity) {
  // Finn produktet basert på productId
  const product = products.find((p) => p.productId === productId);

  if (product) {
    // Oppdater antall enheter på lager i modellen
    product.unitsInStock += addedQuantity;

    // Re-render visningen med oppdatert data
    renderInventory();
  } else {
    alert('Produkt ikke funnet');
  }
}

// Første visning av lageret
renderInventory();
