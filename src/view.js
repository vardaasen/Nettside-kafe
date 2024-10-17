function updateView() {
  document.getElementById('app').replaceChildren(createCurrentPageHtml());
}

function createCurrentPageHtml() {
  if (model.app.currentPage === 'cafeMenu') {
    return createCafeMenuHtml();
  }
  if (model.app.currentPage === 'themeCake') {
    return createThemeCakeMenuHtml();
  }
  return '';
}
