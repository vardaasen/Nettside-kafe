/**
 * Kontroller for håndtering av hentede bestillinger.
 *
 * `pickedUpOrdersController` administrerer visning og søk av bestillinger med status 'Hentet'.
 */
const pickedUpOrdersController = {
  init() {
    this.displayOrders();
  },

  searchOrders() {
    const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
    this.displayOrders(searchQuery);
  },

  resetSearch() {
    document.getElementById('searchInput').value = '';
    this.displayOrders();
  },

  displayOrders(searchQuery = '') {
    const orders = model.orders.filter((order) => order.status === 'Hentet');
    pickedUpOrdersView.renderOrders(orders, searchQuery);
  },
};

document.addEventListener('DOMContentLoaded', function () {
  pickedUpOrdersController.init();
});
