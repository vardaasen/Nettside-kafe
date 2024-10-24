/**
 * This test suite verifies the structure and initial state of the model.
 * It checks for the presence of expected properties, correct initial values,
 * and the structure of complex objects within the model.
 */

const mockModel = {
  categories: ['baguette', 'canapes', 'coffee', 'themeCake'],
  app: {
    currentPage: 'cafeMenu',
  },
  inputs: {
    cafeMenu: {
      tab: 'baguette',
    },
    shoppingCart: {
      products: [
        { id: 1, name: 'Baguette', quantity: 2 },
        { id: 2, name: 'Coffee', quantity: 1 },
      ],
    },
  },
  products: [
    { id: 1, name: 'Baguette', price: 5 },
    { id: 2, name: 'Coffee', price: 3 },
    { id: 3, name: 'Canape', price: 4 },
  ],
};

jest.mock('../src/js/shared/model', () => ({
  model: mockModel,
}));

const { model } = require('../src/js/shared/model');

describe('Model Structure', () => {
  test('should have all expected categories', () => {
    expect(model.categories).toEqual([
      'baguette',
      'canapes',
      'coffee',
      'themeCake',
    ]);
  });

  test("should have initial current page as 'cafeMenu'", () => {
    expect(model.app.currentPage).toBe('cafeMenu');
  });

  test('should have correct initial tab in cafeMenu', () => {
    expect(model.inputs.cafeMenu.tab).toBe('baguette');
  });

  describe('Shopping Cart', () => {
    test('should have products in shopping cart', () => {
      expect(model.inputs.shoppingCart.products.length).toBe(2);
    });

    test('should have correct products in shopping cart', () => {
      const products = model.inputs.shoppingCart.products;
      expect(products[0]).toEqual({ id: 1, name: 'Baguette', quantity: 2 });
      expect(products[1]).toEqual({ id: 2, name: 'Coffee', quantity: 1 });
    });
  });

  describe('Products', () => {
    test('should have correct number of products', () => {
      expect(model.products.length).toBe(3);
    });

    test('should have correct product details', () => {
      expect(model.products).toContainEqual({
        id: 1,
        name: 'Baguette',
        price: 5,
      });
      expect(model.products).toContainEqual({
        id: 2,
        name: 'Coffee',
        price: 3,
      });
      expect(model.products).toContainEqual({
        id: 3,
        name: 'Canape',
        price: 4,
      });
    });
  });
});
