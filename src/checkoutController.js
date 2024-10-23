// checkoutController.js
function goToPickupTime() {
    console.log('Going to pickup time');
    model.inputs.shoppingCart.case = 'PickupTime';
    updateView();
}

function updatePickupDate(date) {
    console.log('Updating pickup date:', date);
    model.inputs.shoppingCart.pickUpSchedule.date = date;
}

function updatePickupTime(time) {
    console.log('Updating pickup time:', time);
    model.inputs.shoppingCart.pickUpSchedule.time = time;
}

function updateCustomerName(name) {
    console.log('Updating customer name:', name);
    model.inputs.shoppingCart.customerName = name;
}

function updateContactNumber(number) {
    console.log('Updating contact number:', number);
    model.inputs.shoppingCart.contactNumber = number;
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

// Gjør alle funksjoner globalt tilgjengelige
window.goToPickupTime = goToPickupTime;
window.updatePickupDate = updatePickupDate;
window.updatePickupTime = updatePickupTime;
window.updateCustomerName = updateCustomerName;
window.updateContactNumber = updateContactNumber;
window.goToCustomerInfo = goToCustomerInfo;
window.submitOrder = submitOrder;

console.log('checkoutController.js loaded. Functions available:', {
    goToPickupTime: typeof window.goToPickupTime,
    updatePickupDate: typeof window.updatePickupDate,
    updatePickupTime: typeof window.updatePickupTime,
    updateCustomerName: typeof window.updateCustomerName,
    updateContactNumber: typeof window.updateContactNumber
});