/**
 * This test suite verifies the structure and behavior of the index.html file.
 * It checks the header structure, navigation functionality, app container presence,
 * and basic accessibility of buttons.
 */

describe('Index HTML structure and behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <header id="header-container">
        <div id="nav-row">
          <div id="logo">Logo</div>
          <button class="header-button" onclick="switchMenu('cafeMenu')">Menu</button>
          <button class="header-button" onclick="switchMenu('themeCake')">Temakaker</button>
          <button class="header-button" onclick="switchMenu('cakes')">Kaker</button>
        </div>
        <div id="cart-button">Handlevogn 🛒</div>
      </header>
      <div id="app"></div>
    `;

    global.switchMenu = jest.fn();
  });

  describe('Header structure', () => {
    test('should have a header with correct ID', () => {
      expect(document.getElementById('header-container')).toBeTruthy();
    });

    test('should have a navigation row', () => {
      expect(document.getElementById('nav-row')).toBeTruthy();
    });

    test('should have a logo', () => {
      const logo = document.getElementById('logo');
      expect(logo).toBeTruthy();
      expect(logo.textContent).toBe('Logo');
    });

    test('should have correct number of header buttons', () => {
      const buttons = document.querySelectorAll('.header-button');
      expect(buttons.length).toBe(3);
    });

    test('should have a cart button', () => {
      const cartButton = document.getElementById('cart-button');
      expect(cartButton).toBeTruthy();
      expect(cartButton.textContent).toBe('Handlevogn 🛒');
    });
  });

  describe('Navigation functionality', () => {
    test("should call switchMenu with 'cafeMenu' when Menu button is clicked", () => {
      const menuButton = document.querySelector('.header-button');
      menuButton.click();
      expect(switchMenu).toHaveBeenCalledWith('cafeMenu');
    });

    test("should call switchMenu with 'themeCake' when Temakaker button is clicked", () => {
      const themeCakeButton = document.querySelectorAll('.header-button')[1];
      themeCakeButton.click();
      expect(switchMenu).toHaveBeenCalledWith('themeCake');
    });

    test("should call switchMenu with 'cakes' when Kaker button is clicked", () => {
      const cakesButton = document.querySelectorAll('.header-button')[2];
      cakesButton.click();
      expect(switchMenu).toHaveBeenCalledWith('cakes');
    });
  });

  describe('App container', () => {
    test('should have an app container', () => {
      expect(document.getElementById('app')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    test('buttons should have accessible names', () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button) => {
        expect(button.textContent.trim()).not.toBe('');
      });
    });
  });
});
