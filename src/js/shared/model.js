/* starter arbeid */
const cafeMenu = 0;
const cakeThemes = 1;
const cakes = 2;
const shoppingCart = 3;

const model = {
  pages: ['kafeMeny', 'kakeTemaer', 'kaker', 'handlevogn'],

  // del 1
  app: {
    currentPageIndex: 0,
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
      selectedThemeId: 1,
      theme: '',
      size: 1,
      basePrice: 250,
      message: '',
      quantity: 1,
    },
    cakeMenu: {
      type: 'chocolate',
      size: 8, // 8, 12, 16
      basePrice: 300,
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

  sizeMultipliers: {
    8: 1.0,
    12: 1.5,
    16: 2,
  },

  flavors: ['vanilje', 'sjokolade', 'sitron', 'jordbær'],

  /**
   * Kategorier av produkter.
   * @type {Array<string>}
   */
  categories: ['baguette', 'canapes', 'coffee', 'cakes'],

  themes: [
    {
      themeId: 1,
      themeName: 'Uten tema',
      basePrice: 450,
      description: 'Ingen dekorasjon. Enkel og elegant.',
    },
    {
      themeId: 2,
      themeName: 'Bryllup',
      basePrice: 550,
      description: 'Perfekt for bryllupsfeiring, med elegante dekorasjoner.',
    },
    {
      themeId: 3,
      themeName: 'Barnebursdag',
      basePrice: 400,
      description: 'En morsom kake for barnas bursdag, med fargerik pynt.',
    },
    {
      themeId: 4,
      themeName: 'Bursdag voksen',
      basePrice: 420,
      description: 'En sofistikert kake for voksne bursdagsfeiringer.',
    },
    {
      themeId: 5,
      themeName: 'Jubileum',
      basePrice: 440,
      description: 'Feir store milepæler med en spesiell jubileumskake.',
    },
    {
      themeId: 6,
      themeName: 'Jul',
      basePrice: 480,
      description:
        'En festlig kake for juletiden, pyntet med sesongens farger.',
    },
    {
      themeId: 7,
      themeName: 'Halloween',
      basePrice: 490,
      description: 'Skummel og morsom kake for Halloween, med kreativ pynt.',
    },
    {
      themeId: 8,
      themeName: 'Konfirmasjon',
      basePrice: 430,
      description: 'En elegant kake til konfirmasjonsfeiringer.',
    },
    {
      themeId: 9,
      themeName: 'Valentin',
      basePrice: 470,
      description: 'En romantisk kake for Valentinsdag, pyntet med hjerter.',
    },
  ],

  themeImages: {
    1: 'uten-tema.webp',
    2: 'Bryllup.webp',
    3: 'Barnebursdag.webp',
    4: 'Bursdag voksen.webp',
    5: 'Jubileum.webp',
    6: 'Jul.webp',
    7: 'Halloween.webp',
    8: 'konfirmasjon.webp',
    9: 'Valentin.webp',
  },

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
      contactNumber: '+47 23829382',
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
      contactNumber: '+47 48392783',
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
      contactNumber: '+47 38299283',
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
      contactNumber: '+47 43289283',
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
      contactNumber: '+47 87499283',
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
      contactNumber: '+47 87493827',
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
      contactNumber: '+47 38392839',
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
      contactNumber: '+47 38374738',
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
      contactNumber: '+47 48292838',
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
      contactNumber: '+47 93847483',
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

  calculateCustomCakePrice(themeId, size) {
    const theme = this.themes.find((t) => t.themeId === themeId);
    const basePrice = theme ? theme.basePrice : 250;
    const sizeMultiplier = this.sizeMultipliers[size] || 1;

    return basePrice * sizeMultiplier;
  },

  calculateStandardCakePrice(productId, size) {
    const product = this.products.find((p) => p.productId === productId);
    const basePrice = product ? product.unitPrice : 200;
    const sizeMultiplier = this.sizeMultipliers[size] || 1;

    return basePrice * sizeMultiplier;
  },

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
