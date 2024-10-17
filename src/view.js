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
  if (model.app.currentPage === 'cake') {
    return createCakeMenuHtml();
  }
  return '';
}
