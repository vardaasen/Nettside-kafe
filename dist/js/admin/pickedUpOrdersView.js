let pickedUpOrdersView={renderOrders(e,d=""){let t=document.getElementById("orders"),r=(t.innerHTML="",e);e=sortByPickupDateAndTime(r=d?r.filter(e=>{var r=e.customerName.toLowerCase().includes(d),e=e.orderId.toString().includes(d);return r||e}):r);e.forEach(e=>{var r=document.createElement("div");r.classList.add("orders-table__row"),r.innerHTML=`
        <div class="orders-table__column orders-table__column--order-id">
          <div>${e.orderId}</div>
        </div>
        <div class="orders-table__column orders-table__column--customer">
          <div>${e.customerName}</div>
          <div>${e.contactNumber}</div>
        </div>
        <div class="orders-table__column orders-table__column--products">
          ${renderOrderedProductsHtml(e.products)}
        </div>
        <div class="orders-table__column orders-table__column--schedule">
          ${formatDateTime(e.pickUpSchedule.date,e.pickUpSchedule.time)}
        </div>
      `,t.appendChild(r)}),0===e.length&&(t.innerHTML="<p>Ingen hentede bestillinger funnet.</p>")}};function sortByPickupDateAndTime(e){return e.sort((e,r)=>{e=new Date(e.pickUpSchedule.date+"T"+e.pickUpSchedule.time);return new Date(r.pickUpSchedule.date+"T"+r.pickUpSchedule.time)-e})}function renderOrderedProductsHtml(e){let r="";return e.forEach(e=>{r+=`
      <div class="order-product">
        <div class="order-product__name">${e.productName}</div>
        <div class="order-product__quantity">Antall: ${e.quantity}</div>
        <div class="order-product__comment">${e.comment}</div>
      </div>
    `}),r}