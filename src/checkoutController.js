// checkoutController.js
function goToPickupTime() {
    console.log('goToPickupTime called');
    console.log('Current case:', model.inputs.shoppingCart.case);
    model.inputs.shoppingCart.case = 'PickupTime';
    console.log('New case:', model.inputs.shoppingCart.case);
    updateView();
}
  
  function goToCustomerInfo() {
    const date = model.inputs.shoppingCart.pickUpSchedule.date;
    const time = model.inputs.shoppingCart.pickUpSchedule.time;
    
    if (!date || !time) {
      alert('Vennligst velg både dato og tid for henting');
      return;
    }
    
    model.inputs.shoppingCart.case = 'NameAndNumber';
    updateView();
  }
  
  function submitOrder() {
    const { customerName, contactNumber } = model.inputs.shoppingCart;
    
    if (!customerName || !contactNumber) {
      alert('Vennligst fyll ut både navn og telefonnummer');
      return;
    }
    
    if (!isValidPhoneNumber(contactNumber)) {
      alert('Vennligst skriv inn et gyldig telefonnummer');
      return;
    }
    
    // Create new order
    const newOrder = {
      orderId: model.orders.length + 1,
      customerName: customerName,
      status: 'Ny',
      pickUpSchedule: { ...model.inputs.shoppingCart.pickUpSchedule },
      products: [...model.inputs.shoppingCart.products]
    };
    
    model.orders.push(newOrder);
    model.inputs.shoppingCart.case = 'OrderSent';
    clearCart();
    updateView();
  }
  
  function isValidPhoneNumber(number) {
    const phoneRegex = /^(\+47)?[2-9]\d{7}$/;
    return phoneRegex.test(number.replace(/\s/g, ''));
  }
  
  function updatePickupDate(date) {
    model.inputs.shoppingCart.pickUpSchedule.date = date;
  }
  
  function updatePickupTime(time) {
    model.inputs.shoppingCart.pickUpSchedule.time = time;
  }
  
  function updateCustomerName(name) {
    model.inputs.shoppingCart.customerName = name;
  }
  
  function updateContactNumber(number) {
    model.inputs.shoppingCart.contactNumber = number;
  }
  
  console.log('checkoutController.js loaded');
  console.log('goToPickupTime function:', typeof goToPickupTime);