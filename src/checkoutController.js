function goToPickupTime() {
    console.log('Going to pickup time');
    model.inputs.shoppingCart.case = 'PickupTime';
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
// På bunnen av filen
console.log('checkoutController.js loaded');
window.goToPickupTime = goToPickupTime; // Gjør funksjonen globalt tilgjengelig