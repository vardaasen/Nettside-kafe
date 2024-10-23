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

function generateTimeOptions() {
  const openingTime = 8; // 08:00
  const closingTime = 16; // 16:00
  let options = '';
  
  for (let hour = openingTime; hour < closingTime; hour++) {
      const time24 = `${hour.toString().padStart(2, '0')}:00`;
      options += `<option value="${time24}">${time24}</option>`;
      if (hour !== closingTime - 1) {
          const time24Half = `${hour.toString().padStart(2, '0')}:30`;
          options += `<option value="${time24Half}">${time24Half}</option>`;
      }
  }
  
  return options;
}

// Sørg for at alle funksjoner er globalt tilgjengelige
window.generateTimeOptions = generateTimeOptions;
window.updatePickupDate = updatePickupDate;
window.updatePickupTime = updatePickupTime;
window.goToCustomerInfo = goToCustomerInfo;

console.log('checkoutView.js loaded');