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
      customerName: 'Erik Hansen',
      status: 'Ny',
      pickUpSchedule: {
        date: '2024-11-04',
        time: '10:15',
      },
      products: [
        {
          productId: 5,
          productName: 'Tunfiskbaguette',
          quantity: 2,
          comment: 'Ingen rødløk, takk',
        },
        {
          productId: 38,
          productName: 'Mocha',
          quantity: 2,
          comment: 'Ekstra sjokolade',
        },
      ],
    },
    {
      orderId: 2,
      customerName: 'Anna Johansen',
      status: 'Under arbeid',
      pickUpSchedule: {
        date: '2024-11-05',
        time: '11:30',
      },
      products: [
        {
          productId: 8,
          productName: 'Brie og avokadobaguette',
          quantity: 1,
          comment: 'Ingen tomat',
        },
        {
          productId: 31,
          productName: 'Cappuccino',
          quantity: 1,
          comment: 'Med soyamelk',
        },
      ],
    },
    {
      orderId: 3,
      customerName: 'Ola Nordmann',
      status: 'Ny',
      pickUpSchedule: {
        date: '2024-11-06',
        time: '12:00',
      },
      products: [
        {
          productId: 9,
          productName: 'Falafelbaguette',
          quantity: 3,
          comment: 'Ekstra tahinisaus',
        },
        {
          productId: 37,
          productName: 'Flat White',
          quantity: 3,
          comment: 'Laktosefri melk',
        },
      ],
    },
    {
      orderId: 4,
      customerName: 'Kari Olsen',
      status: 'Klar til Henting',
      pickUpSchedule: {
        date: '2024-11-07',
        time: '14:45',
      },
      products: [
        {
          productId: 50,
          productName: 'Sjokolademousse',
          quantity: 5,
          comment: 'Pyntet med friske bær',
        },
      ],
    },
    {
      orderId: 5,
      customerName: 'Hans Pettersen',
      status: 'Under arbeid',
      pickUpSchedule: {
        date: '2024-11-08',
        time: '09:45',
      },
      products: [
        {
          productId: 41,
          productName: 'Sjokoladekake',
          quantity: 1,
          comment: 'Gratulerer med dagen på toppen',
        },
      ],
    },
    {
      orderId: 6,
      customerName: 'Maria Nilsen',
      status: 'Ny',
      pickUpSchedule: {
        date: '2024-11-09',
        time: '10:30',
      },
      products: [
        {
          productId: 14,
          productName: 'Biff og løkbaguette',
          quantity: 2,
          comment: 'Ekstra løk',
        },
        { productId: 33, productName: 'Espresso', quantity: 2, comment: '' },
      ],
    },
    {
      orderId: 7,
      customerName: 'Peter Larsen',
      status: 'Under arbeid',
      pickUpSchedule: {
        date: '2024-11-11',
        time: '13:15',
      },
      products: [
        {
          productId: 54,
          productName: 'Pavlova',
          quantity: 1,
          comment: 'Tilpasset for glutenfri',
        },
      ],
    },
    {
      orderId: 8,
      customerName: 'Ingrid Svendsen',
      status: 'Ny',
      pickUpSchedule: {
        date: '2024-11-12',
        time: '11:00',
      },
      products: [
        {
          productId: 13,
          productName: 'Egg- og rekebaguette',
          quantity: 3,
          comment: 'Uten majones',
        },
        {
          productId: 32,
          productName: 'Latte',
          quantity: 3,
          comment: 'Med havremelk',
        },
      ],
    },
    {
      orderId: 9,
      customerName: 'Thomas Andersen',
      status: 'Klar til Henting',
      pickUpSchedule: {
        date: '2024-11-13',
        time: '14:00',
      },
      products: [
        {
          productId: 49,
          productName: 'Brownies',
          quantity: 1,
          comment: 'Ekstra nøtter',
        },
        {
          productId: 35,
          productName: 'Cortado',
          quantity: 1,
          comment: 'Vanlig melk',
        },
      ],
    },
    {
      orderId: 10,
      customerName: 'Sofie Berg',
      status: 'Ny',
      pickUpSchedule: {
        date: '2024-11-14',
        time: '09:15',
      },
      products: [
        {
          productId: 3,
          productName: 'Vegetarbaguette',
          quantity: 2,
          comment: 'Ekstra avokado',
        },
        {
          productId: 52,
          productName: 'Makroner',
          quantity: 1,
          comment: 'Blandede smaker',
        },
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
  subtractOrderedQuantityFromUnitsInStock(products) {
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
    this.subtractOrderedQuantityFromUnitsInStock(order.products);
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

function initiateModelLocalStorage() {
  const savedModelJson = localStorage.getItem(localStorageModelName);

  if (savedModelJson) {
    const savedModel = JSON.parse(savedModelJson);
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
    const response = await fetch('data/products.json');
    return await response.json();
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
