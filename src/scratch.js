
function openTab(productsName) {
  let i;
  let x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(productsName).style.display = "block";
}

/*
<div id="baguette" class="tab">
  <h2 class="tab-button" onclick="openTab('baguette')">Baguette</h2>
  <div>...</div>
</div>

<div id="snitter" class="tab" style="display:none">
  <h2 class="tab-button" onclick="openTab('snitter')">Snitter</h2>
  <div>....</div>
</div>

<div id="kaffe" class="tab" style="display:none">
  <h2 class="tab-button" onclick="openTab('kaffe')">Kaffe</h2>
  <div>.....</div>
</div>


*/