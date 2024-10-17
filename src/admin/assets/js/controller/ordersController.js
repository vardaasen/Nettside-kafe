/**
 * Kontroller for ordre.
 */
const ordersController = {

  /**
   * Initialiserer ordrekontrolleren ved å vise bestillinger.
   */
  init() {
    this.displayOrders();
  },

  /**
   * Henter bestillinger fra modellen og viser dem i visningen.
   */
  displayOrders() {
    const orders = model.getOrders();
    ordersView.renderOrders(orders);
  },

  /**
   * Oppdaterer statusen til en spesifikk bestilling.
   * @param {number} orderId - ID-en til bestillingen som skal oppdateres.
   * @param {string} newStatus - Den nye statusen for bestillingen.
   */
  updateStatus(orderId, newStatus) {
    model.updateOrderStatus(orderId, newStatus);
    this.displayOrders();
  },

  /**
   * Sjekker om den oppgitte tiden er gyldig (ikke før 09:30).
   * @param {string} time - Tiden som skal valideres i formatet "HH:MM".
   * @returns {boolean} True hvis tiden er gyldig, ellers false.
   */
  isTimeValid(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const minTimeInMinutes = 9 * 60 + 30; // 09:30 i minutter
    return timeInMinutes >= minTimeInMinutes;
  }
};

// Initialiserer ordrekontrolleren når DOM er lastet
document.addEventListener('DOMContentLoaded', () => {
  ordersController.init();
});
