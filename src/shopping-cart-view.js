function showShoppingCart() {
  if (!document.getElementById('shopping-cart-container')) {
    createShoppingCartHtml();
  }
  model.app.currentPage = 'shoppingCart';
  updateView();
}

function createShoppingCartHtml() {
  const shoppingCartDiv = document.createElement('div')
  shoppingCartDiv.id = 'shopping-cart-container'; 

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
  return shoppingCartDiv;
  if (!document.getElementById('shopping-cart-container')) {
    document.body.appendChild(shoppingCartDiv);
  }
  return shoppingCartDiv;
}



function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutButton = document.getElementById('checkoutButton');
  const cart = model.inputs.shoppingCart.products

  if (cartItems && cartTotal && checkoutButton) {
    cartItems.innerHTML = '';
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
    checkoutButton.disabled = itemCount === 0;
  } else {
    console.error('Noe gikk galt: handle kurv-elementer mangler i DOM.');
  }
}

function updateCart() {
  renderCart();
}
/*
function getCartItems() {
  return cart;
}

*/

function addToCart(name,price,quantity=1){
  let itemsInCart =  model.inputs.shoppingCart.products
  const existingItem = itemsInCart.find((item)=> item.name===name);
    if (existingItem) {
      existingItem.quantity += quantity
    }
    else{
      model.inputs.shoppingCart.products.push({
        name,
        price,
        quantity
      });
    }
}

function removeFromCart(name) {
  const cart = model.inputs.shoppingCart.products;
  const itemIndex = cart.findIndex(item => item.name === name);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    updateCart();
  }
}

function updateCart() {
renderCart();
}  
