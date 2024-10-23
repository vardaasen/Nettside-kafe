function createCheckoutView() {
  const container = document.createElement('div');
  
  switch(model.inputs.shoppingCart.case) {
      case 'PickupTime':
          container.innerHTML = createPickupTimeView();
          break;
      case 'NameAndNumber':
          container.innerHTML = createCustomerInfoView();
          break;
      case 'OrderSent':
          container.innerHTML = createOrderConfirmation();
          break;
      default:
          return createCartOverview();
  }
  
  return container;
}

function createPickupTimeView() {
  const today = dayjs();
  const maxDate = today.add(14, 'day');
  
  return /* HTML */`
      <div class="checkout-container">
          <h2>Velg hentetidspunkt</h2>
          
          <div class="date-picker-container">
              <label for="pickup-date">Dato:</label>
              <input 
                  type="date" 
                  id="pickup-date" 
                  min="${today.format('YYYY-MM-DD')}" 
                  max="${maxDate.format('YYYY-MM-DD')}"
                  onchange="updatePickupDate(this.value)"
              >
          </div>
          
          <div class="time-picker-container">
              <label for="pickup-time">Tid:</label>
              <select id="pickup-time" onchange="updatePickupTime(this.value)">
                  <option value="">Velg tid</option>
                  ${generateTimeOptions()}
              </select>
          </div>
          
          <div class="button-row">
              <button onclick="model.inputs.shoppingCart.case='Overview'; updateView();">Tilbake</button>
              <button onclick="goToCustomerInfo()">Neste</button>
          </div>
      </div>
  `;
}

// Sørg for at alle funksjoner er globalt tilgjengelige
window.updatePickupDate = updatePickupDate;
window.updatePickupTime = updatePickupTime;
window.goToCustomerInfo = goToCustomerInfo;

console.log('checkoutView.js loaded');