 // checkoutView.js
 function createCheckoutView() {
    switch(model.inputs.shoppingCart.case) {
      case 'Overview':
        return createCartOverview();
      case 'PickupTime':
        return createPickupTimeView();
      case 'NameAndNumber':
        return createCustomerInfoView();
      case 'OrderSent':
        return createOrderConfirmation();
      default:
        return createCartOverview();
    }
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
  
  function createCustomerInfoView() {
    return /* HTML */`
      <div class="checkout-container">
        <h2>Dine opplysninger</h2>
        
        <div class="form-group">
          <label for="customer-name">Navn:</label>
          <input 
            type="text" 
            id="customer-name" 
            required
            oninput="updateCustomerName(this.value)"
            value="${model.inputs.shoppingCart.customerName}"
          >
        </div>
        
        <div class="form-group">
          <label for="contact-number">Telefonnummer:</label>
          <input 
            type="tel" 
            id="contact-number" 
            required
            placeholder="(+47) 12345678"
            oninput="updateContactNumber(this.value)"
            value="${model.inputs.shoppingCart.contactNumber}"
          >
        </div>
        
        <div class="order-summary">
          <h3>Din bestilling vil være klar:</h3>
          <p>${dayjs(model.inputs.shoppingCart.pickUpSchedule.date).format('DD. MMMM YYYY')} 
             kl. ${model.inputs.shoppingCart.pickUpSchedule.time}</p>
        </div>
        
        <div class="button-row">
          <button onclick="model.inputs.shoppingCart.case='PickupTime'; updateView();">Tilbake</button>
          <button onclick="submitOrder()">Send bestilling</button>
        </div>
      </div>
    `;
  }
  
  function createOrderConfirmation() {
    return /* HTML */`
      <div class="checkout-container">
        <h2>Takk for din bestilling!</h2>
        
        <div class="confirmation-details">
          <p>Vi har mottatt din bestilling og den vil være klar til henting:</p>
          <p class="pickup-time">
            ${dayjs(model.inputs.shoppingCart.pickUpSchedule.date).format('DD. MMMM YYYY')} 
            kl. ${model.inputs.shoppingCart.pickUpSchedule.time}
          </p>
          
          <p>En bekreftelse er sendt til ditt telefonnummer.</p>
        </div>
        
        <button onclick="model.app.currentPage='cafeMenu'; updateView();">
          Tilbake til meny
        </button>
      </div>
    `;
  }
  
  