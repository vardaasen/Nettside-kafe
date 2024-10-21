// Funksjon for å vise handlekurven
function showShoppingCart() {
  // Sjekk om handlekurvstrukturen finnes, hvis ikke, opprett den
  if (!document.getElementById('shopping-cart-container')) {
    createShoppingCartHtml();  // Sørg for at handlekurven opprettes hvis den ikke finnes
  }
  
  model.app.currentPage = 'shoppingCart';
  updateView();  // Kall updateView for å vise handlekurven
}

// Funksjon for å lage HTML for handlekurven
function createShoppingCartHtml() {
  const shoppingCartDiv = document.createElement('div');
  shoppingCartDiv.id = 'shopping-cart-container';  // Legger til en beholder for handlekurven
  
  shoppingCartDiv.innerHTML = /* HTML */ `
  <div class="cart" id="cart">
    <div class="cart-content">
      <h2>Handlekurv</h2>
      <div class="cart-items" id="cart-items"></div>
      <div class="cart-total-container">
        Totalt: <span id="cart-total">0</span> kr
      </div>
      <button disabled id="checkoutButton">Til kassen</button>
    </div>
  </div>`;

  // Forsøk å finne 'shopping-cart-container' på nytt før vi legger det til
  if (!document.getElementById('shopping-cart-container')) {
    document.body.appendChild(shoppingCartDiv);  // Legg til handlekurven i DOM
  }
}

// Funksjon for å oppdatere innholdet i handlekurven
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutButton = document.getElementById('checkoutButton');
  const cart = model.inputs.shoppingCart.products;
  
  // Sjekk at cartItems, cartTotal og checkoutButton finnes før vi prøver å manipulere dem
  if (cartItems && cartTotal && checkoutButton) {
    cartItems.innerHTML = '';  // Tømmer handlekurven først
    let total = 0;
    let itemCount = 0;

    cart.forEach((item) => {
      cartItems.innerHTML += `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name"><strong>${item.name}</strong></div>
            <div class="cart-item-details">${item.quantity} x ${item.price} kr</div>
          </div>
          <button class="remove-btn" onclick="removeFromCart('${item.name}'); updateCart();">Fjern</button>
        </div>
      `;
      total += item.price * item.quantity;
      itemCount += item.quantity;
    });

    cartTotal.textContent = total;
    checkoutButton.disabled = itemCount === 0;  // Deaktiver knappen hvis handlekurven er tom
  } else {
    console.error('Noe gikk galt: handlekurv-elementer mangler i DOM.');
  }
}

// Funksjon for å legge til et produkt i handlekurven
function addToCart(name, price, quantity = 1) {
  let itemsInCart = model.inputs.shoppingCart.products;
  const existingItem = itemsInCart.find((item) => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    model.inputs.shoppingCart.products.push({
      name,
      price,
      quantity,
    });
  }

  updateCart();  // Oppdater handlekurven etter at produktet er lagt til
}

// Funksjon for å fjerne et produkt fra handlekurven
function removeFromCart(name) {
  const cart = model.inputs.shoppingCart.products;
  const itemIndex = cart.findIndex(item => item.name === name);
  
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);  // Fjerner produktet fra handlekurven
    updateCart();  // Oppdaterer visningen
  }
}

// Funksjon for å oppdatere handlekurven
function updateCart() {
  renderCart();  // Kaller renderCart for å oppdatere visningen
}
