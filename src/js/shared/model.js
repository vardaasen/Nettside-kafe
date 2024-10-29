const cafeMenu = 0;
const cakes = 1;
const shoppingCart = 2;

/**
 * Modell for applikasjonens data og tilstand.
 *
 * `model` inneholder strukturert data for sider, brukerinput, produkter,
 * ordrer, samt spesifikasjoner for menyvalg og tilpassbare kaker.
 */
const model = {
  /**
   * En liste som representerer de tilgjengelige sidene i applikasjonen.
   * @type {Array<string>}
   */
  pages: ['kafeMeny', 'kaker', 'handlevogn'],

  /**
   * Tilstandsdata for applikasjonen.
   * @property {Object} app - Hovedobjektet for applikasjonens nåværende tilstand.
   * @property {number} app.currentPageIndex - Indeksen til siden som vises nå.
   * @property {Object|null} app.selectedProduct - Det valgte produktet for visning eller tilpasning.
   */
  app: {
    currentPageIndex: cafeMenu,
    selectedProduct: null,
  },

  /**
   * Brukerinnstillinger og innputt for ulike deler av applikasjonen.
   * @property {Object} inputs.cafeMenu - Innstillinger for kafémenyen.
   * @property {string} inputs.cafeMenu.tab - Valgt fane (f.eks. 'baguette', 'canapes', 'coffee').
   * @property {number} inputs.cafeMenu.quantity - Mengde valgt.
   * @property {string} inputs.cafeMenu.message - Tilpasningsmelding for kaféprodukter.
   * @property {Object} inputs.themeCakeMenu - Innstillinger for tilpassbare kaker.
   * @property {number} inputs.themeCakeMenu.selectedThemeId - Valgt tema-ID for kaken.
   * @property {number} inputs.themeCakeMenu.size - Størrelse på kaken (8, 12, 16).
   * @property {number} inputs.themeCakeMenu.basePrice - Basisprisen for tilpassbare kaker.
   * @property {Object} inputs.shoppingCart - Handlekurvens innhold og innstillinger.
   * @property {Array<Object>} inputs.shoppingCart.products - Produkter i handlekurven.
   */
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
      message: '',
    },
    shoppingCart: {
      case: 'Overview' /* Overview, PickupTime, NameAndNumber, OrderSent */,
      customerName: '',
      contactNumber: '',
      pickUpSchedule: {
        date: '',
        time: '',
      },
      /*
      {
      productId: 1,
      productName: 'Biff og løkbaguette',
      quantity: 2,
      comment: 'Ekstra løk',
      },
      */
      products: [],
    },
  },

  /**
   * Prisjusteringer for kaker basert på størrelse.
   * @type {Object<number, number>}
   */
  sizeMultipliers: {
    8: 1.0,
    12: 1.5,
    16: 2,
  },

  /**
   * Tilgjengelige smaker for tilpassbare kaker.
   * @type {Array<string>}
   */
  flavors: ['Vanilje', 'Sjokolade', 'Sitron', 'Jordbær'],

  /**
   * Kategorier for produkter i kafémenyen.
   * @type {Array<string>}
   */
  categories: ['baguette', 'canapes', 'coffee', 'cakes'],

  categoryTranslations: {
    0: 'Baguette',
    1: 'Snitter',
    2: 'Kaffe',
    3: 'Kaker',
  },

  /**
   * Temaer for tilpassbare kaker, inkludert ID, navn, basispris og beskrivelse.
   * @type {Array<{themeId: number, themeName: string, basePrice: number, description: string}>}
   */
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

  /**
   * Bildereferanser for hvert tema i `themes`.
   * @type {Object<number, string>}
   */
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
   * Liste over produkter med detaljer som pris, lagerbeholdning og kategori.
   * @type {Array<{productId: number, categoryIndex: number, productName: string, unitPrice: number, description: string, image: string, preorderRequired: boolean, customizationAvailable: boolean, unitsInStock: number}>}
   */
  products: [],

  /**
   * Liste over bestillinger med kundeinformasjon og hentetidspunkt.
   * @type {Array<{orderId: number, customerName: string, status: string, pickUpSchedule: {date: string, time: string}, products: Array<{productId: number, quantity: number, comment: string}>}>}
   */
  orders: [
    {
      orderId: 1,
      customerName: 'Maria Nilsen',
      contactNumber: '87493827',
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
        { productId: 24, productName: 'Americano', quantity: 2, comment: '' },
      ],
    },
    {
      orderId: 2,
      customerName: 'Thomas Andersen',
      contactNumber: '48292838',
      status: 'Klar til henting',
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
          productId: 26,
          productName: 'Cortado',
          quantity: 1,
          comment: 'Vanlig melk',
        },
      ],
    },
    {
      orderId: 3,
      customerName: 'Camilla Foss',
      contactNumber: '92736483',
      status: 'Hentet',
      pickUpSchedule: {
        date: '2024-10-19',
        time: '10:45',
      },
      products: [
        {
          productId: 17,
          productName: 'Snitter med roastbiff',
          quantity: 1,
          comment: '',
        },
      ],
    },
    {
      orderId: 4,
      customerName: 'Ola Nordmann',
      contactNumber: '38299283',
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
      orderId: 5,
      customerName: 'Lise Kristoffersen',
      contactNumber: '91827364',
      status: 'Under arbeid',
      pickUpSchedule: {
        date: '2024-11-15',
        time: '10:00',
      },
      products: [
        {
          productId: 12,
          productName: 'Baguette med spekeskinke',
          quantity: 2,
          comment: '',
        },
        {
          productId: 24,
          productName: 'Americano',
          quantity: 2,
          comment: '',
        },
      ],
    },
    {
      orderId: 6,
      customerName: 'Anders Hauge',
      contactNumber: '92736484',
      status: 'Hentet',
      pickUpSchedule: {
        date: '2024-10-23',
        time: '15:30',
      },
      products: [
        {
          productId: 22,
          productName: 'Cappuccino',
          quantity: 1,
          comment: '',
        },
        {
          productId: 4,
          productName: 'Røkelaks og eggerørebaguette',
          quantity: 1,
          comment: '',
        },
      ],
    },
    {
      orderId: 7,
      customerName: 'Erik Hansen',
      contactNumber: '23829382',
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
      orderId: 8,
      customerName: 'Marius Strand',
      contactNumber: '93827164',
      status: 'Klar til henting',
      pickUpSchedule: {
        date: '2024-11-18',
        time: '15:30',
      },
      products: [
        {
          productId: 27,
          productName: 'Macchiato',
          quantity: 2,
          comment: '',
        },
        {
          productId: 7,
          productName: 'Kyllingbaguette',
          quantity: 2,
          comment: '',
        },
      ],
    },
    {
      orderId: 9,
      customerName: 'Peter Larsen',
      contactNumber: '38392839',
      status: 'Under arbeid',
      pickUpSchedule: {
        date: '2024-11-11',
        time: '13:15',
      },
      products: [
        {
          productId: 34,
          productName: 'Ostekake med bær',
          quantity: 1,
          comment: 'Tilpasset for glutenfri',
        },
      ],
    },
    {
      orderId: 10,
      customerName: 'Fredrik Dahl',
      contactNumber: '91827366',
      status: 'Hentet',
      pickUpSchedule: {
        date: '2024-10-25',
        time: '09:00',
      },
      products: [
        {
          productId: 6,
          productName: 'Ost og skinkebaguette',
          quantity: 1,
          comment: '',
        },
        {
          productId: 23,
          productName: 'Latte',
          quantity: 1,
          comment: '',
        },
      ],
    },
    {
      orderId: 11,
      customerName: 'Hans Pettersen',
      contactNumber: '87499283',
      status: 'Under arbeid',
      pickUpSchedule: {
        date: '2024-11-08',
        time: '09:45',
      },
      products: [
        {
          productId: 33,
          productName: 'Sjokoladekake',
          quantity: 1,
          comment: 'Gratulerer med dagen på toppen',
        },
      ],
    },
    {
      orderId: 12,
      customerName: 'Sara Bjerke',
      contactNumber: '93827165',
      status: 'Hentet',
      pickUpSchedule: {
        date: '2024-10-21',
        time: '14:15',
      },
      products: [
        {
          productId: 39,
          productName: 'Marmorkake',
          quantity: 1,
          comment: '',
        },
      ],
    },
    {
      orderId: 13,
      customerName: 'Jonas Lie',
      contactNumber: '92736481',
      status: 'Under arbeid',
      pickUpSchedule: {
        date: '2024-11-16',
        time: '14:30',
      },
      products: [
        {
          productId: 35,
          productName: 'Gulrotkake',
          quantity: 1,
          comment: 'Ingen nøtter',
        },
      ],
    },
    {
      orderId: 14,
      customerName: 'Vilde Sørensen',
      contactNumber: '92736482',
      status: 'Klar til henting',
      pickUpSchedule: {
        date: '2024-11-19',
        time: '11:20',
      },
      products: [
        {
          productId: 34,
          productName: 'Ostekake med bær',
          quantity: 1,
          comment: 'Ekstra bringebær',
        },
      ],
    },
    {
      orderId: 15,
      customerName: 'Sofie Berg',
      contactNumber: '93847483',
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
    {
      orderId: 16,
      customerName: 'Elisabeth Moe',
      contactNumber: '91827365',
      status: 'Klar til henting',
      pickUpSchedule: {
        date: '2024-11-17',
        time: '12:45',
      },
      products: [
        {
          productId: 16,
          productName: 'Assorterte snitter',
          quantity: 1,
          comment: '',
        },
      ],
    },
    {
      orderId: 17,
      customerName: 'Ingrid Svendsen',
      contactNumber: '38374738',
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
          productId: 23,
          productName: 'Latte',
          quantity: 3,
          comment: 'Med havremelk',
        },
      ],
    },
    {
      orderId: 18,
      customerName: 'Eirik Holmen',
      contactNumber: '91827367',
      status: 'Hentet',
      pickUpSchedule: {
        date: '2024-10-18',
        time: '12:30',
      },
      products: [
        {
          productId: 11,
          productName: 'Capresebaguette',
          quantity: 2,
          comment: 'Ekstra basilikum',
        },
        {
          productId: 25,
          productName: 'Americano',
          quantity: 2,
          comment: '',
        },
      ],
    },
    {
      orderId: 19,
      customerName: 'Anna Johansen',
      contactNumber: '48392783',
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
          productId: 22,
          productName: 'Cappuccino',
          quantity: 1,
          comment: 'Med soyamelk',
        },
      ],
    },
    {
      orderId: 20,
      customerName: 'Kari Olsen',
      contactNumber: '43289283',
      status: 'Klar til henting',
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
  ],

  /**
   * Beregner prisen for en tilpassbar kake basert på valgt tema og størrelse.
   *
   * Funksjonen finner basisprisen for kake-temaet ved å slå opp `themeId` i `themes`.
   * Hvis temaet ikke finnes, brukes en standard basispris. Deretter multipliseres basisprisen
   * med en størrelse-multiplikator hentet fra `sizeMultipliers` basert på kake-størrelsen.
   *
   * @function
   * @name calculateCustomCakePrice
   * @param {number} themeId - ID-en til valgt tema for kaken.
   * @param {number} size - Størrelsen på kaken (f.eks. 8, 12, 16).
   * @returns {number} Prisen for kaken basert på tema og størrelse.
   * @example
   * // Beregn prisen for en kake med tema-ID 3 og størrelse 12:
   * const price = model.calculateCustomCakePrice(3, 12);
   */
  calculateCustomCakePrice(themeId, size) {
    const theme = this.themes.find((t) => t.themeId === themeId);
    const basePrice = theme ? theme.basePrice : 250;
    const sizeMultiplier = this.sizeMultipliers[size] || 1;

    return basePrice * sizeMultiplier;
  },

  /**
   * Beregner prisen på en standardkake basert på produkt-ID og størrelse.
   *
   * Funksjonen slår opp kakeproduktet i `products`-listen ved hjelp av `productId`
   * for å hente grunnprisen (`unitPrice`). Hvis produktet ikke finnes, brukes en standard
   * basispris på 200. Grunnprisen justeres deretter med en størrelse-multiplikator
   * fra `sizeMultipliers` basert på kake-størrelsen.
   *
   * @function
   * @name calculateStandardCakePrice
   * @param {number} productId - ID-en til produktet for standardkaken.
   * @param {number} size - Størrelsen på kaken (8, 12, 16).
   * @returns {number} Den beregnede prisen på standardkaken basert på produkt-ID og størrelse.
   * @example
   * // Beregn prisen for en standardkake med produkt-ID 5 og størrelse 12
   * const price = model.calculateStandardCakePrice(5, 12);
   */
  calculateStandardCakePrice(productId, size) {
    const product = this.products.find((p) => p.productId === productId);
    const basePrice = product ? product.unitPrice : 200;
    const sizeMultiplier = this.sizeMultipliers[size] || 1;

    return basePrice * sizeMultiplier;
  },

  /**
   * Reduserer lagerbeholdningen (`unitsInStock`) for hvert produkt basert på bestillingsmengden.
   *
   * Funksjonen går gjennom alle produkter i `products`-listen og finner matchende produkt
   * i bestillingslisten (`orderProduct`). Når et matchende produkt er funnet, reduseres
   * lagerbeholdningen (`unitsInStock`) med antallet bestilt (`quantity`).
   *
   * @function
   * @name subtractOrderedQuantityFromUnitsInStock
   * @param {Array<{productId: number, quantity: number}>} products - Liste over produkter i bestillingen, hver med produkt-ID og bestillt mengde.
   * @example
   * // Reduser lageret for produkter i en bestilling
   * subtractOrderedQuantityFromUnitsInStock([
   *   { productId: 1, quantity: 2 },
   *   { productId: 5, quantity: 1 }
   * ]);
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
   * Legger til en spesifisert mengde (`addedQuantity`) til lagerbeholdningen (`unitsInStock`) for et gitt produkt.
   *
   * Funksjonen finner produktet i `products`-listen ved hjelp av `productId`. Hvis produktet finnes, økes lagerbeholdningen
   * med `addedQuantity`. Hvis produktet ikke finnes, kastes en feilmelding. Etter oppdatering kalles `saveModel` for å lagre endringene.
   *
   * @function
   * @name addCustomQuantity
   * @param {number} productId - ID-en til produktet som skal oppdateres.
   * @param {number} addedQuantity - Mengden som skal legges til lagerbeholdningen.
   * @throws {Error} Kaster en feil hvis produktet ikke finnes i `products`-listen.
   * @example
   * // Legg til 10 enheter i lagerbeholdningen for produkt med ID 5
   * addCustomQuantity(5, 10);
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
   * Oppdaterer statusen for en spesifikk bestilling basert på bestillings-ID.
   *
   * Funksjonen søker etter bestillingen i `orders`-listen ved hjelp av `orderId`.
   * Hvis bestillingen finnes, oppdateres statusen til `newStatus`. Deretter kalles
   * `saveModel` for å lagre endringene.
   *
   * @function
   * @name updateOrderStatus
   * @param {number} orderId - ID-en til bestillingen som skal oppdateres.
   * @param {string} newStatus - Den nye statusen som skal settes for bestillingen (f.eks. "Under arbeid", "Klar til henting").
   * @example
   * // Oppdater statusen for bestilling med ID 3 til "Klar til henting"
   * updateOrderStatus(3, 'Klar til henting');
   */
  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find((o) => o.orderId === orderId);
    if (order) {
      order.status = newStatus;
    }
    saveModel();
  },

  updateProductStock(productId, newStock) {
    const product = this.products.find((p) => p.productId === productId);
    if (product) {
      product.unitsInStock = parseInt(newStock, 10);
      saveModel();
      console.log(
        `Oppdatert lagerbeholdning for "${product.productName}" til ${product.unitsInStock}`,
      );
    } else {
      console.error(`Produkt med ID ${productId} ikke funnet.`);
    }
  },

  updateProductDetails(productId, updatedDetails) {
    const product = this.products.find((p) => p.productId === productId);
    if (product) {
      if (updatedDetails.unitsInStock !== undefined) {
        product.unitsInStock = parseInt(updatedDetails.unitsInStock, 10);
      }
      if (updatedDetails.description !== undefined) {
        product.description = updatedDetails.description;
      }
      saveModel();
      console.log(`Oppdatert detaljer for "${product.productName}"`);
    } else {
      console.error(`Produkt med ID ${productId} ikke funnet.`);
    }
  },

  /**
   * Erstatter feltene i den eksisterende modellen med feltene fra en ny modell.
   *
   * Funksjonen itererer gjennom hvert felt i den nåværende modellen (`this`) og sjekker om
   * feltet også finnes i den nye modellen (`model`). Hvis feltet finnes, erstattes verdien i
   * den nåværende modellen med verdien fra den nye modellen. Dette gjør det mulig å oppdatere
   * modellen selektivt uten å overskrive hele objektet.
   *
   * @function
   * @name replaceModel
   * @param {Object} model - Den nye modellen med oppdaterte felt som skal erstatte eksisterende felter i `this`.
   * @example
   * // Erstatt eksisterende felter i modellen med en ny modell
   * replaceModel({ pages: ['home', 'menu'], app: { currentPageIndex: 1 } });
   */
  replaceModel(model) {
    for (const field in this) {
      if (Object.prototype.hasOwnProperty.call(model, field)) {
        this[field] = model[field];
      }
    }
  },
};

const localStorageModelName = 'model';

/**
 * Initialiserer modellen fra `localStorage` hvis data finnes, eller henter produkter hvis ikke.
 *
 * Funksjonen sjekker om en modell er lagret i `localStorage` ved hjelp av `localStorageModelName`.
 * Hvis en lagret modell finnes, parses den og erstatter den eksisterende modellen ved hjelp av
 * `replaceModel`. Hvis ingen data finnes i `localStorage`, kalles `getProducts` for å hente produktene.
 *
 * @function
 * @name initiateModelLocalStorage
 * @example
 * // Initialiser modellen fra `localStorage` ved oppstart
 * initiateModelLocalStorage();
 */
function initiateModelLocalStorage() {
  const savedModelJson = localStorage.getItem(localStorageModelName);

  if (savedModelJson) {
    const savedModel = JSON.parse(savedModelJson);
    model.replaceModel(savedModel);
  } else {
    getProducts();
  }
}

/**
 * Lagrer den nåværende modellen til `localStorage`.
 *
 * Funksjonen serialiserer `model`-objektet til JSON og lagrer det i `localStorage`
 * under navnet definert i `localStorageModelName`. Dette gjør at dataene i modellen
 * blir bevart mellom sideinnlastinger.
 *
 * @function
 * @name saveModel
 * @example
 * // Lagre den nåværende modellen til `localStorage`
 * saveModel();
 */
function saveModel() {
  localStorage.setItem(localStorageModelName, JSON.stringify(model));
}

/**
 * Henter produktdata fra en lokal JSON-fil.
 *
 * Denne asynkrone funksjonen laster produktdata fra `data/products.json` ved bruk av `fetch`.
 * Hvis innlasting lykkes, returneres dataene som JSON. Ved feil vises en feilmelding
 * til brukeren, og en tom liste returneres.
 *
 * @async
 * @function
 * @name getProductsFromStore
 * @returns {Promise<Array<Object>>} En liste med produktdata fra JSON-filen. Returnerer en tom liste hvis en feil oppstår.
 * @example
 * // Hent produkter og logg dem til konsollen
 * getProductsFromStore().then((products) => console.log(products));
 */
async function getProductsFromStore() {
  try {
    const response = await fetch('data/products.json');
    return await response.json();
  } catch (err) {
    alert('Failed to load products from json file: ', err);
    return [];
  }
}

/**
 * Henter produkter fra lagringsfilen og oppdaterer modellen.
 *
 * Denne asynkrone funksjonen henter produktdata ved å kalle `getProductsFromStore`,
 * lagrer dataene i `model.products`, og kaller deretter `saveModel` for å lagre modellen
 * i `localStorage`. Til slutt oppdateres visningen ved å kalle `updateView`.
 *
 * @async
 * @function
 * @name getProducts
 * @example
 * // Hent produkter og oppdater modellen og visningen
 * getProducts();
 */
async function getProducts() {
  model.products = await getProductsFromStore();
  saveModel();
  updateView();
}
