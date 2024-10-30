let ordersView={renderOrders(e,t="Alle",r=""){let s=document.getElementById("orders"),d=(s.innerHTML="",e);d="Alle"===t?d.filter(e=>"Hentet"!==e.status):d.filter(e=>e.status===t),r&&(d=d.filter(e=>{var t=e.customerName.toLowerCase().includes(r.toLowerCase()),e=e.orderId.toString().includes(r);return t||e})),0===e.length?this.renderNoResultsMessage("Ingen bestillinger funnet."):sortByPickupDateAndTime(d).forEach(e=>{var t=document.createElement("div");t.classList.add("orders-table__row"),t.innerHTML=`
        <div class="orders-table__column orders-table__column--customer">
          <div>${e.orderId}</div>
        </div>
        <div class="orders-table__column orders-table__column--customer">
          <div>${safeText(e.customerName)}</div>
          <div>Tlf: ${safeText(e.contactNumber)}</div>
        </div>
        <div class="orders-table__column orders-table__column--products">
          ${renderOrderedProductsHtml(e.products)}
        </div>
        <div class="orders-table__column orders-table__column--schedule">
          ${formatDateTime(e.pickUpSchedule.date,e.pickUpSchedule.time)}
        </div>
        <div class="orders-table__column orders-table__column--status">
          <div class="order-status">Status: ${e.status}</div>
          <div class="order-status__label">Oppdater statusen:</div>
          <select id="statusSelect-${e.orderId}" class="order-status__select">
            <option value="Ny" ${"Ny"===e.status?"selected":""}>Ny</option>
      <option value="Under arbeid" ${"Under arbeid"===e.status?"selected":""}>Under arbeid</option>
      <option value="Klar til henting" ${"Klar til henting"===e.status?"selected":""}>Klar til henting</option>
      <option value="Hentet" ${"Hentet"===e.status?"selected":""}>Hentet</option>
          </select>
          <button
            class="order-status__button"
            onclick="ordersController.updateStatus(${e.orderId}, document.getElementById('statusSelect-${e.orderId}').value)">
            Oppdater
          </button>
        </div>
      `,s.appendChild(t)})},renderNoResultsMessage(e){document.getElementById("orders").innerHTML=`<p class="orders-search__no-result">${e}</p>`}};function sortByPickupDateAndTime(e){return e.sort((e,t)=>{var r=new Date(e.pickUpSchedule.date),s=new Date(t.pickUpSchedule.date);return r.getTime()===s.getTime()?(e=e.pickUpSchedule.time.split(":"),t=t.pickUpSchedule.time.split(":"),60*parseInt(e[0])+parseInt(e[1])-(60*parseInt(t[0])+parseInt(t[1]))):r.getTime()-s.getTime()})}function renderOrderedProductsHtml(e){let t="";return e.forEach(e=>{t+=`
      <div class="orders__product">
        <div class="orders__product-name">${safeText(e.productName)}</div>
        <div class="orders__product-quantity">Antall: ${safeText(e.quantity)}</div>
        <div class="orders__product-comment">${safeText(e.comment)}</div>
      </div>
    `}),t}