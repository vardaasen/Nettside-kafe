function updateView() {
  document.getElementById('app').innerHTML = /*HTML*/ `
        ${getHtmlPage()}
    `;
}

function getHtmlPage() {
  if (model.app.currentPage === 'cafeMenu') {
    return;
  }
}
