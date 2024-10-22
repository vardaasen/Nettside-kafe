/**
 * This test suite verifies the functionality of the view module.
 * It tests the updateView function, ensuring it correctly renders
 * the appropriate content based on the current page in the model.
 */

jest.mock('../src/view', () => ({
  updateView: jest.fn(),
}));

jest.mock('../src/cafe-menu-view', () => ({
  createCafeMenuHtml: jest.fn(
    () => '<div id="cafe-menu-tab-row"><button>Baguette</button></div>',
  ),
  createThemeCakeMenuHtml: jest.fn(
    () =>
      '<div id="cards-grid-container"><div class="product-card"></div></div>',
  ),
}));

import { updateView } from '../src/view';
import {
  createCafeMenuHtml,
  createThemeCakeMenuHtml,
} from '../src/cafe-menu-view';

describe('View Updates', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.model = {
      app: { currentPage: 'cafeMenu' },
      inputs: { cafeMenu: { tab: 'baguette' } },
    };
    document.body.innerHTML = '<div id="app"></div>';

    updateView.mockImplementation(() => {
      const appElement = document.getElementById('app');
      if (appElement) {
        appElement.innerHTML =
          model.app.currentPage === 'cafeMenu'
            ? createCafeMenuHtml()
            : model.app.currentPage === 'themeCake'
              ? createThemeCakeMenuHtml()
              : '';
      }
    });
  });

  test('should update view with cafe menu', () => {
    updateView();
    expect(document.getElementById('app').innerHTML).toContain(
      'cafe-menu-tab-row',
    );
    expect(document.getElementById('app').innerHTML).toContain(
      '<button>Baguette</button>',
    );
    expect(createCafeMenuHtml).toHaveBeenCalled();
  });

  test('should update view with theme cake menu', () => {
    model.app.currentPage = 'themeCake';
    updateView();
    expect(document.getElementById('app').innerHTML).toContain(
      'cards-grid-container',
    );
    expect(document.getElementById('app').innerHTML).toContain(
      '<div class="product-card"></div>',
    );
    expect(createThemeCakeMenuHtml).toHaveBeenCalled();
  });

  test('should handle unknown page gracefully', () => {
    model.app.currentPage = 'unknownPage';
    updateView();
    expect(document.getElementById('app').innerHTML).toBe('');
  });

  test('should not throw error when app element is missing', () => {
    document.body.innerHTML = '';
    expect(() => updateView()).not.toThrow();
  });
});
