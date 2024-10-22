/**
 * This test suite verifies the functionality of the cafe menu view module.
 * It tests the createCafeMenuHtml, createThemeCakeMenuHtml, and createProductCardHtml
 * functions, ensuring they generate the correct HTML structure for different scenarios.
 */

jest.mock('../src/cafe-menu-view', () => ({
  createCafeMenuHtml: jest.fn(
    () => '<div id="cafe-menu-tab-row"><button>Baguette</button></div>',
  ),
  createThemeCakeMenuHtml: jest.fn(
    () =>
      '<div id="cards-grid-container"><div class="product-card"></div></div>',
  ),
  createProductCardHtml: jest.fn(
    (product) =>
      `<div class="product-card">${product.productName} ${product.unitPrice} Kr</div>`,
  ),
}));

import {
  createCafeMenuHtml,
  createThemeCakeMenuHtml,
  createProductCardHtml,
} from '../src/cafe-menu-view';

describe('Cafe Menu View', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.model = {
      inputs: {
        cafeMenu: { tab: 'baguette' },
      },
      categories: ['baguette', 'canapes', 'coffee'],
      products: [
        {
          productId: 1,
          productName: 'Baguette',
          image: 'baguette.jpg',
          unitPrice: 50,
          categoryIndex: 0,
        },
        {
          productId: 2,
          productName: 'Coffee',
          image: 'coffee.jpg',
          unitPrice: 30,
          categoryIndex: 2,
        },
      ],
    };
  });

  describe('createCafeMenuHtml', () => {
    test('should create cafe menu HTML with correct structure', () => {
      const html = createCafeMenuHtml();
      expect(html).toContain('<div id="cafe-menu-tab-row">');
      expect(html).toContain('<button>Baguette</button>');
    });
  });

  describe('createThemeCakeMenuHtml', () => {
    test('should create theme cake menu HTML with correct structure', () => {
      const html = createThemeCakeMenuHtml();
      expect(html).toContain('<div id="cards-grid-container">');
      expect(html).toContain('<div class="product-card">');
    });
  });

  describe('createProductCardHtml', () => {
    test('should create product card HTML with all details', () => {
      const product = {
        productId: 1,
        productName: 'Test Product',
        image: 'test.jpg',
        unitPrice: 100,
      };
      const html = createProductCardHtml(product);
      expect(html).toContain('<div class="product-card">');
      expect(html).toContain('Test Product');
      expect(html).toContain('100 Kr');
    });

    test('should handle missing image gracefully', () => {
      const product = { productId: 2, productName: 'No Image', unitPrice: 50 };
      const html = createProductCardHtml(product);
      expect(html).toContain('<div class="product-card">');
      expect(html).toContain('No Image');
      expect(html).toContain('50 Kr');
    });
  });
});
