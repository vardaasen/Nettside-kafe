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
    currentPage: 'shoppingCart',
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

  // del 3
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

  products: [],

  orders: [
    {
      orderId: 1,
      customerName: '',
      contactNumber: '',
      pickUpSchedule: {
        date: '',
        time: '',
      },
      products: [
        {
          productId: 1,
          quantity: 1,
          comment: '',
        },

        {
          productId: 3,
          quantity: 2,
          comment: '',
        },
      ],
    },
  ],

  // ingredients: [
  //     {
  //         ingredientId: "Reker",
  //         amount: 20,
  //         allergens: ["skalldyr", "", "",],
  //     }
  // ],
};

/*




*/
