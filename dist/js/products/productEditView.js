let productEditView={populateForm:function(e){var t=document.getElementById("editProductForm");t.classList.add("edit-product-form"),t.innerHTML=`
      <div class="edit-product-form__group">
        <label for="productName" class="edit-product-form__label">Produktnavn:</label>
        <input type="text" id="productName" value="${e.productName}" class="edit-product-form__input" />
      </div>

      <div class="edit-product-form__group">
        <label for="unitPrice" class="edit-product-form__label">Pris:</label>
        <input type="number" id="unitPrice" value="${e.unitPrice}" class="edit-product-form__input" />
      </div>

      <div class="edit-product-form__group">
        <label for="image" class="edit-product-form__label">Bilde URL:</label>
        <input type="text" id="image" value="${e.image||""}" class="edit-product-form__input" />
        <small class="add-product-form__help-text">Bruk <strong><em>standard-produktbilde.webp</em></strong> hvis det ikke finnes et bilde for produktet ennå.</small>
      </div>

      <div class="edit-product-form__group">
        <label class="edit-product-form__label">Forhåndsbestilling:</label>
        <div class="edit-product-form__radio-group">
          <label>
            <input type="radio" name="preorderRequired" value="true" ${e.preorderRequired?"checked":""} />
            Sant
          </label>
          <label>
            <input type="radio" name="preorderRequired" value="false" ${!1===e.preorderRequired?"checked":""} />
            Usant
          </label>
        </div>
        <small class="edit-product-form__helper-text">Må dette produktet bestilles minst 7 dager i forveien?</small>
      </div>

      <div class="edit-product-form__group">
        <label for="description" class="edit-product-form__label">Beskrivelse:</label>
        <textarea id="description" class="edit-product-form__textarea">${e.description}</textarea>
      </div>

      <div class="edit-product-form__group">
        <label for="unitsInStock" class="edit-product-form__label">Lagerbeholdning:</label>
        <input type="number" id="unitsInStock" value="${e.unitsInStock}" class="edit-product-form__input" />
      </div>

      ${3===e.categoryIndex&&"standard"===e.type?`
  <div class="edit-product-form__group">
    <label for="type" class="edit-product-form__label">Type:</label>
    <input type="text" id="type" value="${e.type}" class="edit-product-form__input" disabled />
  </div>
`:""}

      <div id="themeFormContainer"></div>

      <div class="edit-product-form__actions">
        <button type="button" class="edit-product-form__button edit-product-form__button--save" onclick="productEditController.saveProduct()">Lagre Endringer</button>
        <button type="button" class="edit-product-form__button edit-product-form__button--cancel" onclick="window.history.back()">Avbryt</button>
      </div>
    `,"customizable"===e.type&&this.showThemeForm(model.themes),this.createDeleteConfirmationModal()},showThemeForm:function(e){var t=document.getElementById("themeFormContainer");t?(t.innerHTML=`
      <h2 class="edit-product-form__subheading">Administrer temaer</h2>
      <div class="edit-product-form__theme-container">
      <label for="themeSelector" class="edit-product-form__label">Velg tema:</label>
  <select id="themeSelector" class="edit-product-form__select" onchange="productEditView.showThemeDetails(this.value)">
    ${e.map(e=>`<option value="${e.themeId}">${e.themeName}</option>`).join("")}
  </select>
  <button onclick="productEditController.addTheme(event)" class="edit-product-form__button edit-product-form__button--add">Legg til nytt tema</button>
</div>
      <div id="themeDetailsContainer" class="edit-product-form__theme-details-container"></div>
    `,0<e.length&&this.showThemeDetails(e[0].themeId)):console.error("Theme form container not found.")},showThemeDetails:function(t,e=!1){var o,d,r,i=e?{themeId:t,themeName:"",basePrice:"",description:""}:model.themes.find(e=>e.themeId==t);i?(o=document.getElementById("themeDetailsContainer"),d=model.themeImages[t]||"",r=document.getElementById("themeSelector"),e?r.innerHTML='<option value="" disabled selected>Legg til...</option>'+r.innerHTML:r.value=t,o.innerHTML=`
      <div class="edit-product-form__group" xmlns="http://www.w3.org/1999/html">
        <label for="themeName" class="edit-product-form__label">Navn:</label>
        <input type="text" id="themeName" value="${i.themeName}" class="edit-product-form__input" />
      </div>
      <div class="edit-product-form__group">
        <label for="themeBasePrice" class="edit-product-form__label">Grunnpris:</label>
        <input type="number" id="themeBasePrice" value="${i.basePrice}" class="edit-product-form__input" />
      </div>
      <div class="edit-product-form__group">
        <label for="themeDescription" class="edit-product-form__label">Beskrivelse:</label>
        <textarea id="themeDescription" class="edit-product-form__textarea">${i.description}</textarea>
      </div>
      <div class="edit-product-form__group">
        <label for="themeImageUrl" class="edit-product-form__label">Bilde URL:</label>
        <input type="text" id="themeImageUrl" value="${d}" class="edit-product-form__input" />
        <small class="add-product-form__help-text">Bruk <strong><em>standard-produktbilde.webp</em></strong> hvis det ikke finnes et bilde for produktet ennå.</small>
        ${d?`<img src="../../img/cakes/${d}" alt="${i.themeName}" class="edit-product-form__image-preview" />`:""}

      </div>
      <button onclick="productEditController.saveTheme(event, ${i.themeId})" class="edit-product-form__button edit-product-form__button--save">Lagre Tema</button>
      <button onclick="productEditView.showDeleteConfirmation(event, ${i.themeId})" class="edit-product-form__button edit-product-form__button--delete">Slett Tema</button>
    `):console.error(`Theme with ID ${t} not found.`)},updateThemeSelector:function(e,t=null){var o=document.getElementById("themeSelector");o.innerHTML=e.map(e=>`<option value="${e.themeId}">${e.themeName}</option>`).join(""),null!==t?o.value=t:0<e.length&&(o.value=e[0].themeId)},createDeleteConfirmationModal:function(){document.body.insertAdjacentHTML("beforeend",`
      <div id="deleteConfirmationModal" class="modal" style="display: none;">
        <div class="modal__content">
          <p>Er du sikker på at du vil slette dette temaet?</p>
          <button id="confirmDeleteBtn" class="modal__button modal__button--confirm">Ja</button>
          <button id="cancelDeleteBtn" class="modal__button modal__button--cancel">Avbryt</button>
        </div>
      </div>
    `),document.getElementById("cancelDeleteBtn").onclick=this.hideDeleteConfirmation},showDeleteConfirmation:function(e,t){e.preventDefault(),document.getElementById("deleteConfirmationModal").style.display="flex",document.getElementById("confirmDeleteBtn").onclick=()=>{productEditController.deleteTheme(null,t),this.hideDeleteConfirmation()}},hideDeleteConfirmation:function(){document.getElementById("deleteConfirmationModal").style.display="none"}};