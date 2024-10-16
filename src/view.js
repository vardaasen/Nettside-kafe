function updateView() {
  document.getElementById('app').innerHTML = /* HTML */ `
    ${createCurrentPageHtml()}
  `;
}

function createCurrentPageHtml() {
  if (model.app.currentPage === 'cafeMenu') {
    return createCafeMenuHtml();
  }
  if (model.app.currentPage === 'themeCakes') {
    return createThemeCakeMenuHtml();
  }
  return '';
}
