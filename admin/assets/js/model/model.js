/**
 * Modell for håndtering av produkter og bestillinger.
 */
const model = {
  /**
   * Kategorier av produkter.
   * @type {string[]}
   */
  categories: ['Baguette', 'Snitter', 'Kaffe', 'Kake'],

  /**
   * Liste over produkter.
   * @type {Array<{productId: number, categoryIndex: number, productName: string, unitsInStock: number}>}
   */
  products: [
    { productId: 1, categoryIndex: 0, productName: 'Rekebaguette', unitsInStock: 10 },
    { productId: 2, categoryIndex: 1, productName: 'Assortert', unitsInStock: 25 },
    { productId: 3, categoryIndex: 2, productName: 'Espresso', unitsInStock: 15 },
    { productId: 4, categoryIndex: 3, productName: 'Bursdagskake', unitsInStock: 0 },
    { productId: 5, categoryIndex: 3, productName: 'Princesskake', unitsInStock: 15 },
  ],

  /**
   * Henter alle produkter.
   * @returns {Array<{productId: number, categoryIndex: number, productName: string, unitsInStock: number}>} Listen av produkter.
   */
  getProducts() {
    return this.products;
  },

  /**
   * Legger til en mengde til lagerbeholdningen for et spesifikt produkt.
   * @param {number} productId - ID-en til produktet som skal oppdateres.
   * @param {number} addedQuantity - Mengden som skal legges til lagerbeholdningen.
   * @throws {Error} Hvis produktet med den angitte productId ikke finnes.
   */
  addCustomQuantity(productId, addedQuantity) {
    const product = this.products.find(p => p.productId === productId);
    if (product) {
      product.unitsInStock += addedQuantity;
    } else {
      throw new Error('Produkt ikke funnet');
    }
  },

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
        { productId: 1, quantity: 1, comment: 'Vennligst legg til ekstra majones' },
        { productId: 5, quantity: 3, comment: 'Vennligst bruk rosa dekorasjoner' },
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
        { productId: 3, quantity: 2, comment: 'Lag den med dobbel shot, uten sukker' },
        { productId: 4, quantity: 1, comment: 'Skriv "Gratulerer med dagen" på kaken' },
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
   * Henter alle bestillinger.
   * @returns {Array<{
   *   orderId: number,
   *   customerName: string,
   *   status: string,
   *   pickUpSchedule: { date: string, time: string },
   *   products: Array<{ productId: number, quantity: number, comment: string }>
   * }>} Listen av bestillinger.
   */
  getOrders() {
    return this.orders;
  },

  /**
   * Oppdaterer statusen til en spesifikk bestilling.
   * @param {number} orderId - ID-en til bestillingen som skal oppdateres.
   * @param {string} newStatus - Den nye statusen for bestillingen.
   */
  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (order) {
      order.status = newStatus;
    }
  }
};
