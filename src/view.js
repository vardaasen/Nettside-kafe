function updateView() {
  document.getElementById('app').innerHTML = /* HTML */ `
        ${createCurrentPageHtml()}
    `;
}

function createCurrentPageHtml() {
  if (model.app.currentPage === 'cafeMenu') {
    return createCafeMenuHtml();
  }
  return '';
}
