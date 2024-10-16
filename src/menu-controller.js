function switchTab(value){
    model.inputs.cafeMenu.tab = value
    updateView()
}

function switchMenu(value){
    model.app.currentPage = value
    updateView()
}


