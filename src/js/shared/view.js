/**
 * Oppdaterer visningen ved å rendre innholdet til den nåværende siden i hovedappen.
 *
 * Funksjonen henter `app`-elementet fra DOM-en og genererer HTML-innhold for
 * den gjeldende siden ved å bruke `createCurrentPageHtml()`. Den erstatter eksisterende
 * innhold i `app`-elementet med nytt innhold. Hvis det genererte innholdet er en
 * `HTMLElement`, blir det direkte lagt til; ellers pakkes det inn i en `div`-container
 * for å sikre en konsistent DOM-struktur.
 *
 * Funksjonen oppdaterer også nettleserens historikktilstand, slik at brukeren kan navigere
 * mellom sider ved å bruke tilbake- og fremover-knappene i nettleseren.
 *
 * @function
 * @name updateView
 * @example
 * // Å kalle updateView vil rendre siden definert i `model.app.currentPageIndex`:
 * updateView();
 */
function updateView() {
  const app = document.getElementById('app');
  const content = createCurrentPageHtml();
  const currentPage = model.pages[model.app.currentPageIndex];

  // Håndter innholdet basert på type
  if (content instanceof HTMLElement) {
    app.replaceChildren(content);
  } else {
    const container = document.createElement('div');
    container.innerHTML = content;
    app.replaceChildren(container);
  }

  // Oppdater nettleserhistorikken
  if (model.pages.includes(currentPage)) {
    history.pushState({ page: currentPage }, '', `#${currentPage}`);
  } else {
    console.error('Invalid page index:', currentPage);
  }
}

/**
 * Genererer HTML-innhold for den gjeldende siden basert på `currentPageIndex`.
 *
 * Denne funksjonen sjekker verdien av `model.app.currentPageIndex` og returnerer
 * riktig HTML-innhold ved å kalle den relevante funksjonen for hver side.
 * Funksjonen støtter flere sider, inkludert kafémenyen, kake-temaer, kakeutvalg
 * og handlekurven. Hvis handlekurven ikke er i oversiktsvisning, vises utsjekkingssiden.
 * Hvis `currentPageIndex` ikke matcher noen side, returneres en tom streng.
 *
 * @function
 * @name createCurrentPageHtml
 * @returns {string|HTMLElement} HTML-innholdet for den gjeldende siden.
 *                               Hvis siden ikke finnes, returneres en tom streng.
 * @example
 * // Henter HTML-innhold for den gjeldende siden og legger det til i visningen:
 * const content = createCurrentPageHtml();
 */
function createCurrentPageHtml() {
  if (model.app.currentPageIndex === cafeMenu) {
    return createCafeMenuHtml();
  }
  if (model.app.currentPageIndex === cakes) {
    return createCakeMenuHtml();
  }
  if (model.app.currentPageIndex === shoppingCart) {
    if (model.inputs.shoppingCart.case !== 'Overview') {
      return createCheckoutView();
    }
    return createShoppingCartHtml();
  }
  return '';
}

/**
 * Lytter for `popstate`-hendelsen, som oppdaterer `currentPageIndex` basert på historikkens tilstand.
 *
 * Når brukeren navigerer bakover eller fremover i nettleseren, oppdateres `currentPageIndex` til den tilsvarende
 * siden lagret i `event.state`. Deretter rendres riktig sideinnhold i hovedinnholdsdiven.
 *
 * @event popstate - Oppdaterer currentPageIndex basert på historikktilstanden
 * @param {PopStateEvent} event - Event-objektet som inneholder tilstanden til siden som navigeres til.
 */
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    model.app.currentPageIndex = model.pages.indexOf(event.state.page);
    document.getElementById('app').replaceChildren(createCurrentPageHtml());
  }
});

/**
 * Lytter for `DOMContentLoaded`-hendelsen, som setter opp den innledende sidevisningen basert på URL-hashen.
 *
 * Når dokumentet er ferdig lastet, sjekker denne funksjonen URL-hashen for å bestemme hvilken side som
 * skal vises. Hvis en hash finnes, settes `currentPageIndex` til den tilsvarende siden; ellers settes den
 * til `cafeMenu` som standard. Til slutt kalles `updateView()` for å rendre innholdet.
 *
 * @event DOMContentLoaded - Setter currentPageIndex basert på URL-hashen.
 * @example
 * // Når dokumentet er lastet, oppdateres visningen basert på URL-hashen:
 * window.addEventListener('DOMContentLoaded', () => { ... });
 */
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1); // Ekstraherer hash uten #
  const index = model.pages.indexOf(hash); // Får indeksen til siden basert på hash

  // Setter currentPageIndex basert på hash, standard til cafeMenu hvis ikke funnet
  model.app.currentPageIndex = index !== -1 ? index : cafeMenu;
  updateView();
});

