/* starter arbeid */

const model = {
  /*
    pages:
    cafeMenu
    cakeThemes
    cakes
    shoppingCart
    */

  // del 1
  app: {
    currentPage: 'cafeMenu',
    selectedProduct: null,
  },

  // del 2
  inputs: {
    cafeMenu: {
      tab: 'baguette', // baguette, canapes, coffee
      quantity: 1,
      message: '',
    },
    themeCakeMenu: {
      selectedTheme: null,
      theme: '',
      size: 1,
      message: '',
      quantity: 1,
    },
    cakeMenu: {
      type: 'chocolate',
      size: 8,
      quantity: 1,
    },
    shoppingCart: {
      case: 'Overview' /* Overview, PickupTime, NameAndNumber, OrderSent */,
      customerName: '',
      contactNumber: '',
      pickUpSchedule: {
        date: '',
        time: '',
      },
      products: [],
    },
  },

  /**
   * Kategorier av produkter.
   * @type {Array<string>}
   */
  categories: ['baguette', 'canapes', 'coffee', 'cakes'],

  themes: [
    'Uten tema',
    'Bryllup',
    'Barnebursdag',
    'Bursdag voksen',
    'Jubileum',
    'Jul',
    'Halloween',
    'Påske',
    'Valentin',
  ],

  /**
   * Liste over produkter.
   * @type {Array<{
   *    productId: number,
   *    categoryIndex: number,
   *    productName: string,
   *    unitPrice: number,
   *    description: string,
   *    image: string,
   *    preorderRequired: boolean,
   *    customizationAvailable: boolean,
   *    unitsInStock: number
   *  }>}
   */
  products: [],

  /**
   * Liste over bestillinger.
   * @type {Array<{
   *   orderId: number,
   *   customerName: string,
   *   status: string,
   *   pickUpSchedule: { date: string, time: string },
   *   products: Array<{ productId: number, quantity: number, comment: string }>
   * }>}
   */
  orders: [
    {
      orderId: 1,
      customerName: 'Kari Nordmann',
      status: 'Ny',
      pickUpSchedule: {
        date: '2024-11-05',
        time: '14:00',
      },
      products: [
        {
          productId: 1,
          quantity: 1,
          comment: 'Vennligst legg til ekstra majones',
        },
        {
          productId: 5,
          quantity: 3,
          comment: 'Vennligst bruk rosa dekorasjoner',
        },
      ],
    },
    {
      orderId: 2,
      customerName: 'Ola Hansen',
      status: 'Ny',
      pickUpSchedule: {
        date: '2024-11-10',
        time: '11:00',
      },
      products: [
        {
          productId: 3,
          quantity: 2,
          comment: 'Lag den med dobbel shot, uten sukker',
        },
        {
          productId: 4,
          quantity: 1,
          comment: 'Skriv "Gratulerer med dagen" på kaken',
        },
      ],
    },
    {
      orderId: 3,
      customerName: 'Lise Berg',
      status: 'Ny',
      pickUpSchedule: {
        date: '2024-11-15',
        time: '09:30',
      },
      products: [
        { productId: 2, quantity: 4, comment: 'Vennligst fjern løken' },
        { productId: 3, quantity: 2, comment: 'Server med mandelmelk' },
      ],
    },
  ],
  /**
   * Tar inn en liste av produkter fra en ordre og justerer tilgjengeligheten på hver produkt
   * @type {Array<{
   *  productId: number,
   *  quantity: number,
   *  comment: string,
   * }>}
   */
  subtractQuantityFromOrder(products) {
    for (const product of this.products) {
      for (const orderProduct of products) {
        if (product.productId === orderProduct.productId) {
          product.unitsInStock -= orderProduct.quantity;
        }
      }
    }
  },

  /**
   * Legger til en mengde til lagerbeholdningen for et spesifikt produkt.
   * @param {number} productId - ID-en til produktet som skal oppdateres.
   * @param {number} addedQuantity - Mengden som skal legges til lagerbeholdningen.
   * @throws {Error} Hvis produktet med den angitte productId ikke finnes.
   */
  addCustomQuantity(productId, addedQuantity) {
    const product = this.products.find((p) => p.productId === productId);
    if (product) {
      product.unitsInStock += addedQuantity;
    } else {
      throw new Error('Produkt ikke funnet');
    }
    saveModel();
  },

  /**
   * @typedef {Object} Order
   * @property {string} customerName - The name of the customer.
   * @property {string} productName - The name of the product.
   * @property {string} contactNumber - The contact number of the customer.
   * @property {PickUpSchedule} pickUpSchedule - The schedule for pick-up.
   * @property {Product[]} products - The list of products.
   * @param {Order} order - The order details.
   */
  submitOrder(order) {
    let orderId = 0;
    for (const order of this.orders) {
      if (order.orderId > orderId) {
        orderId = order.orderId + 1;
      }
    }
    order.orderId = orderId;
    order.status = 'Ny';
    this.orders.push(order);
    this.subtractQuantityFromOrder(order.products);
    saveModel();
  },

  /**
   * Oppdaterer statusen til en spesifikk bestilling.
   * @param {number} orderId - ID-en til bestillingen som skal oppdateres.
   * @param {string} newStatus - Den nye statusen for bestillingen.
   */
  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find((o) => o.orderId === orderId);
    if (order) {
      order.status = newStatus;
    }
    saveModel();
  },

  replaceModel(model) {
    for (const field in this) {
      if (Object.prototype.hasOwnProperty.call(model, field)) {
        this[field] = model[field];
      }
    }
  },
};

const localStorageModelName = 'model';

function initiateModel() {
  const savedModelString = localStorage.getItem(localStorageModelName);

  if (savedModelString) {
    const savedModel = JSON.parse(savedModelString);
    model.replaceModel(savedModel);
  } else {
    getProducts();
  }
}

function saveModel() {
  localStorage.setItem(localStorageModelName, JSON.stringify(model));
}

async function getProductsFromStore() {
  try {
    const response = await fetch('store/products.json');
    const fromStore = await response.json();
    return fromStore;
  } catch (err) {
    alert('Failed to load products from json file: ', err);
    return [];
  }
}

async function getProducts() {
  model.products = await getProductsFromStore();
  saveModel();
  updateView();
}

initiateModel();
