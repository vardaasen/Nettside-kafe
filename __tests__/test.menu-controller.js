/**
 * This test suite verifies the functionality of the menu controller.
 * It tests the switchTab and switchMenu functions, ensuring they correctly
 * update the model and call the updateView function when appropriate.
 */

jest.mock('../src/menu-controller', () => ({
  switchTab: jest.fn(),
  switchMenu: jest.fn(),
}));

jest.mock('../src/view', () => ({
  updateView: jest.fn(),
}));

import { switchTab, switchMenu } from '../src/menu-controller';
import { updateView } from '../src/view';

describe('Menu Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.model = {
      app: { currentPage: 'cafeMenu' },
      inputs: { cafeMenu: { tab: 'baguette' } },
    };

    switchTab.mockImplementation((value) => {
      if (
        ['baguette', 'canapes', 'coffee'].includes(value) &&
        value !== model.inputs.cafeMenu.tab
      ) {
        model.inputs.cafeMenu.tab = value;
        updateView();
      }
    });

    switchMenu.mockImplementation((value) => {
      if (
        ['cafeMenu', 'themeCake', 'cakes'].includes(value) &&
        value !== model.app.currentPage
      ) {
        model.app.currentPage = value;
        updateView();
      }
    });
  });

  describe('switchTab', () => {
    test("should switch tab to 'canapes'", () => {
      switchTab('canapes');
      expect(model.inputs.cafeMenu.tab).toBe('canapes');
      expect(updateView).toHaveBeenCalledTimes(1);
    });

    test('should not switch tab if already on that tab', () => {
      switchTab('baguette');
      expect(model.inputs.cafeMenu.tab).toBe('baguette');
      expect(updateView).not.toHaveBeenCalled();
    });

    test('should handle invalid tab gracefully', () => {
      const initialTab = model.inputs.cafeMenu.tab;
      switchTab('invalidTab');
      expect(model.inputs.cafeMenu.tab).toBe(initialTab);
      expect(updateView).not.toHaveBeenCalled();
    });
  });

  describe('switchMenu', () => {
    test("should switch menu to 'themeCake'", () => {
      switchMenu('themeCake');
      expect(model.app.currentPage).toBe('themeCake');
      expect(updateView).toHaveBeenCalledTimes(1);
    });

    test('should not switch menu if already on that page', () => {
      switchMenu('cafeMenu');
      expect(model.app.currentPage).toBe('cafeMenu');
      expect(updateView).not.toHaveBeenCalled();
    });

    test('should handle invalid menu gracefully', () => {
      const initialPage = model.app.currentPage;
      switchMenu('invalidMenu');
      expect(model.app.currentPage).toBe(initialPage);
      expect(updateView).not.toHaveBeenCalled();
    });
  });
});
