// ordersController.js

const ordersController = {
  init() {
    this.displayOrders();
    this.setupSearchListener();
  },

  searchOrders() {
    this.filterOrders();
  },

  setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim();
      if (isNaN(query)) { // Only trigger live filter if the input is text
        this.filterOrders();
      }
    });
  },

  filterOrders() {
    const searchQuery = document.getElementById('searchInput').value.trim();
    const statusFilter = document.getElementById('statusFilter').value;

    if (!isNaN(searchQuery) && searchQuery !== '') { // Numeric input for exact orderId search
      const orderId = parseInt(searchQuery, 10);
      const orders = model.orders.filter(order => order.orderId === orderId);

      if (orders.length > 0) {
        ordersView.renderOrders(orders);
      } else {
        ordersView.renderNoResultsMessage(`Ingen bestilling funnet med ID ${orderId}`);
      }
    } else { // Live filtering for text input
      this.displayOrders(statusFilter, searchQuery.toLowerCase());
    }
  },

  displayOrders(statusFilter = 'Alle', searchQuery = '') {
    const orders = model.orders.filter(order =>
      (statusFilter === 'Alle' || order.status === statusFilter) &&
      (searchQuery === '' || order.customerName.toLowerCase().includes(searchQuery))
    );
    ordersView.renderOrders(orders);
  },

  resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = 'Alle';
    this.displayOrders();
  },

  updateStatus(orderId, newStatus) {
    model.updateOrderStatus(orderId, newStatus);
    this.displayOrders();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  ordersController.init();
});

function safeText(text) {
  const sanitizedText = DOMPurify.sanitize(text);
  return sanitizedText
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}
