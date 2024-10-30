<header class="project-header">Team 3 - Dokumentasjon for Emne 2-prosjektet</header>
  <section class="project-introduction">
    <h1 class="project-introduction__title">Om prosjektet</h1>
    <p class="project-introduction__description"> Vårt prosjekt for Emne 2 er en webapp som forbedrer kundeopplevelsen hos
      den fiktive
      kaféen "Bakst og Brygg." Den lar kunder enkelt bestille fra et fristende utvalg
      av baguetter, snitter, kaffe, klassiske kaker og tilpassbare kaker – alt gjennom
      et brukervennlig og elegant grensesnitt. </p>
    <p class="project-introduction__description">
      Kunder kan gjøre spesialtilpasninger, holde oversikt over handlekurven, og planlegge
      henting når det passer. For ansatte gir webappen enkel styring av lager og bestillinger,
      slik at driften går smidig. </p>
    <p class="project-introduction__description">
      Optimalisert for mobil og universelt tilgjengelig, leverer webappen en balansert
      løsning som gleder både kunder og ansatte hos "Bakst og Brygg." </p>
  </section>
  <section class="project-approach">
    <h2 class="project-approach__title">Vår tilnærming og teknologier</h2>
    <p class="project-approach__description"> I dette prosjektet har teamet vårt brukt en strukturert og
      kvalitetsorientert tilnærming
      for å levere en skalerbar, robust og brukervennlig løsning. Med god organisering
      gjennom <strong>GitHub Issues</strong> og <strong>GitHub Prosjekter</strong> har vi sikret klar prosjektstruktur,
      god oppfølging, og effektivt samarbeid.
      Her er de teknologiene og standardene vi bruker: </p>
    <section class="project-approach__methodology">
      <h2 class="project-approach__subtitle">Prosjekttilnærming</h2>
      <h3 class="project-approach__point">
        <a href="https://github.com/features/project-management" target="_blank">1. GitHub Issues, Prosjekter og
          Agile-metodikk med Kanban-tavler</a>
      </h3>
      <p class="project-approach__point-description"> Vi følger en Agile-metodikk for å holde prosjektet fleksibelt og
        tilpasningsdyktig.
        Gjennom kontinuerlig iterativ utvikling og tilbakemelding kan vi raskt tilpasse
        oss endringer og forbedre prosjektet. Vi logger alle oppgaver i GitHub Issues
        og bruker prosjektfunksjonaliteten for å holde oversikt over fremdrift. Kanban-tavlen
        vår er koblet til Issues, slik at kortene oppdateres automatisk når vi refererer
        til Issues i commits. Denne strukturen støtter smidig arbeidsflyt og kontinuerlig
        forbedring, i tråd med Agile-prinsipper. </p>
      <h3 class="project-approach__point">
        <a href="https://nodejs.org/" target="_blank">2. Node.js</a> og <a href="https://www.npmjs.com/"
        target="_blank">npm</a>
      </h3>
      <p class="project-approach__point-description"> Vi bruker Node.js og npm for å administrere tredjepartsverktøy og
        avhengigheter
        som ESLint, Prettier, og Jest. Selv om vi ikke bruker Node på servernivå, gir
        dette oppsettet oss enkel tilgang til nødvendige verktøy og holder prosjektet
        oppdatert. </p>
      <h3 class="project-approach__point">
        <a href="https://editorconfig.org/" target="_blank">3. .editorconfig</a>
      </h3>
      <p class="project-approach__point-description"> .editorconfig sikrer at koden er formattet likt på tvers av
        utviklingsmiljøer,
        noe som reduserer inkonsistenser og forbedrer samarbeidet. </p>
      <h3 class="project-approach__point">
        <a href="https://developer.chrome.com/docs/lighthouse/overview" target="_blank">4. Lighthouse fra Google</a>
      </h3>
      <p class="project-approach__point-description"> Vi bruker Lighthouse fra Google for å måle og forbedre ytelse,
         tilgjengelighet, beste praksiser, og SEO. Gjennom regelmessige kjøringer kan vi identifisere flaskehalser og
         optimaliseringsmuligheter, noe som bidrar til en bedre brukeropplevelse og høyere kvalitet i prosjektet. <br><br>
        <img src="docs-assets/lighthouse.webp" alt="Lighthouse"></p>
      <h3 class="project-approach__point">
        <a href="https://gulpjs.com/" target="_blank">5. Gulp: JavaScript Task Automation</a>
      </h3>
      <p class="project-approach__point-description"> Vår kildekode er organisert i <code>src</code>-mappen. Siden vår
          CSS- og JavaScript-struktur er modulær, trenger vi å slå sammen disse filene for optimalisering. Vi bruker
          Gulp til å slå sammen og minifisere våre ressurser, som deretter genererer en <code>dist</code>-mappe for den
          optimaliserte versjonen av webapplikasjonen. </p>
    </section>
    <section class="project-technologies">
      <h2 class="project-technologies__subtitle">HTML</h2>
      <h3 class="project-technologies__point">
        <a href="https://developers.google.com/search/mobile-sites" target="_blank">1. Mobiloptimalisering</a>
      </h3>
      <p class="project-technologies__point-description"> Nettstedet vårt er optimalisert for mobil, noe som sikrer at
        det fungerer godt
        på alle enheter og gir en positiv brukeropplevelse. Google prioriterer mobilvennlige
        sider, noe som også styrker SEO. </p>
      <h3 class="project-technologies__point">
        <a href="https://developer.mozilla.org/en-US/docs/Glossary/Semantics" target="_blank">2. Semantisk HTML</a>
      </h3>
      <p class="project-technologies__point-description"> Vi bruker semantiske HTML-elementer som
        <code>&lt;header&gt;</code>, <code>&lt;section&gt;</code>,
        <code>&lt;article&gt;</code>, og <code>&lt;footer&gt;</code>, sammen med riktig
        bruk av heading-tagger. Dette gir en helhetlig struktur som ikke bare er mer
        intuitiv for mennesker, men også enklere for søkemotorer å tolke. Den hierarkiske
        strukturen gjør innholdet lettere å navigere, sikrer god tilgjengelighet, og
        forbedrer SEO. Med semantisk HTML sikrer vi også at nettlesere og assistive
        teknologier kan tolke innholdet riktig, noe som gir en bedre brukeropplevelse
        og universell utforming. </p>
      <h3 class="project-technologies__point">
        <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">3. WCAG (Web Content Accessibility
          Guidelines)</a> og <a href="https://www.uutilsynet.no/regelverk/regelverk/266" target="_blank">Forskrift om
        universell utforming av IKT</a>
      </h3>
      <p class="project-technologies__point-description"> Vi følger <strong>WCAG</strong>-retningslinjene og <strong>norsk
        lovgivning om universell utforming av IKT</strong> for å sikre at nettstedet er tilgjengelig for alle brukere.
        Dette er ikke bare
        en standard vi følger, men også et kvalitetsstempel på brukervennlighet og
        tilgjengelighet. </p>
      <h3 class="project-technologies__point">
        <a href="https://www.w3.org/WAI/standards-guidelines/aria/" target="_blank">4. ARIA (Accessible Rich Internet
          Applications)</a>
      </h3>
      <p class="project-technologies__point-description"> ARIA-attributter forbedrer tilgjengeligheten for brukere med
        synshemminger og
        de som benytter assistive teknologier, som skjermlesere og leselist. Ved å
        gi tydelige beskrivelser og merking på dynamiske og interaktive elementer,
        sørger vi for at innholdet på siden vår er like tilgjengelig for alle, uavhengig
        av funksjonsevne. Dette er en viktig del av vår forpliktelse til universell
        utforming. </p>
    </section>
    <section class="project-technologies">
      <h2 class="project-technologies__subtitle">CSS</h2>
      <h3 class="project-technologies__point">
        <a href="https://getbem.com/" target="_blank">1. BEM (Block Element Modifier)</a>
      </h3>
      <p class="project-technologies__point-description"> BEM-metodikken for CSS-klasser gir en modulær og skalerbar
        CSS-struktur som gjør
        koden lett å vedlikeholde og forstå, selv i store prosjekter. Denne tilnærmingen
        sikrer at vi enkelt kan utvikle og utvide prosjektet uten å miste oversikten.
        BEM brukes av anerkjente organisasjoner som <strong>Atlassian</strong>, <strong>Drobpox</strong>, <strong>JetBrains</strong>,
        <strong>Gov.uk</strong>, <strong>TechCrunch</strong>, og <strong>LinkedIn’s open-source design guidelines</strong>,
        for å nevne noen. </p>
      <h3 class="project-technologies__point">
        <a href="http://smacss.com/" target="_blank">2. SMACSS (Scalable and Modular Architecture for CSS)</a>
      </h3>
      <p class="project-technologies__point-description"> SMACSS gir oss en organisert og fleksibel tilnærming til CSS.
        Ved å dele opp
        stiler i funksjonelle moduler kan vi lettere administrere og oppdatere komponentene
        våre. Denne metodikken er brukt av store aktører som <strong>Mozilla</strong>,
        <strong>GitHub</strong>, <strong>Dropbox</strong>, og <strong>Salesforce</strong> for å oppnå skalerbarhet og en
        vedlikeholdbar CSS-struktur. </p>
      <h3 class="project-technologies__point">
        <a href="https://alistapart.com/article/more-meaningful-typography/" target="_blank">3. Modular Scale
          Typography</a>
      </h3>
      <p class="project-technologies__point-description"> Vi bruker en modulær typografisk skala for å skape visuell
        harmoni og en konsistent
        typografi gjennom hele prosjektet. Dette styrker både estetikken og lesbarheten
        på nettstedet. Vår typografiske skala er basert på <strong>
          <a href="https://www.musictheoryacademy.com/understanding-music/intervals/perfect-fourth/" target="_blank">Perfect
            Fourth</a>
        </strong>-intervallet fra musikkteori, som skaper en balansert og behagelig
        rytme i tekststørrelsene. </p>
      <p class="project-technologies__point-description">Dersom typografien vår ble konvertert til musikk, ville det
        sannsynligvis høres
        slik ut:</p>
      <audio controls>
        <source src="docs-assets/chill-cafe-music-in-perfect-fourth.mp3" type="audio/mpeg">
        Din nettleser støtter ikke lydavspilling.
      </audio>
      <h3 class="project-technologies__point">
        <a href="https://github.com/sindresorhus/modern-normalize" target="_blank">4. modern-normalize</a>
      </h3>
      <p class="project-technologies__point-description"> Vi implementerer <strong>modern-normalize</strong> for å sikre
        at stiler behandles
        konsistent på tvers av forskjellige nettlesere ved å justere stilene til moderne
        standarder uten å tilbakestille dem. Dette verktøyet fokuserer på å forbedre
        cross-browser konsistens i standard elementers stil, som bidrar til en mer
        uniform opplevelse på tvers av forskjellige enheter og nettlesere. </p>
      <h3
        class="project-technologies__point"><a href="https://www.w3.org/Style/CSS/Overview.en.html" target="_blank">5.
        Avanserte CSS-teknikker</a></h3>
      <p class="project-technologies__point-description"> For å forbedre modulariteten, vedlikeholdbarheten og
        fleksibiliten i stilene
        våre, benytter vi flere avanserte CSS-teknikker: </p>
      <ul class="project-technologies__list">
        <li class="project-technologies__list-item">
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/--*" target="_blank">
            <strong>CSS Custom Properties (variabler)</strong> </a> - Ved bruk av CSS-variabler
          ( <code>--my-variable-name</code>) kan vi definere fargepaletter, spacing
          og typografi en gang, og gjenbruke dem på tvers av hele prosjektet. Dette
          gjør det enkelt å justere temaer og oppdateringer, og gir et konsistent
          utseende overalt.
        </li>
        <li class="project-technologies__list-item">
          <a href="https://www.w3schools.com/cssref/css_functions.php" target="_blank">
            <strong>CSS-funksjoner</strong> </a> - Vi bruker CSS-funksjoner som <code>calc()</code>,
          <code>min()</code>, <code>max()</code>, og <code>rgba()</code> for å gjøre
          komplekse beregninger direkte i CSS. Dette gir oss fleksibiliteten til
          å tilpasse layout og design basert på ulike enhetsstørrelser og skalaer
          uten ekstra JavaScript.
        </li>
      </ul>
    </section>
    <section class="project-javascript">
      <h2 class="project-javascript__subtitle">JavaScript</h2>
      <h3 class="project-javascript__point">1. Modulær JavaScript-mappestruktur</h3>
      <p class="project-javascript__point-description"> Vi har brukt en modulær JavaScript-mappestruktur som organiserer
        koden etter
        funksjonalitet, med separate mapper for områder som autentisering, handlekurv
        og produkter. Dette sikrer at logikken holdes isolert og lett gjenbrukbar,
        noe som gjør prosjektet mer skalerbart og enklere å vedlikeholde. Ved å følge
        Model-View-Controller (MVC)-tilnærmingen kan vi enkelt endre eller utvide spesifikke
        deler uten å påvirke resten av applikasjonen, noe som fremmer en strukturert
        og bærekraftig utviklingsprosess. </p>
      <pre>
				<code>
   js/
    ├── admin/
    │   ├── inventoryController.js
    │   ├── inventoryView.js
    │   ├── ordersController.js
    │   └── ordersView.js
    ├── auth/
    │   ├── authController.js
    │   ├── loginController.js
    │   ├── loginModel.js
    │   └── loginView.js
    ├── cart/
    │   ├── cartController.js
    │   └── cartView.js
    ├── checkout/
    │   ├── checkoutController.js
    │   └── checkoutView.js
    ├── products/
    │   ├── cafeMenuController.js
    │   ├── cafeMenuView.js
    │   ├── cakeMenuController.js
    │   └── cakeMenuView.js
    ├── shared/
    │   ├── common.js
    │   ├── controller.js
    │   ├── model.js
    │   └── view.js
    └── utils/
        ├── clearLocalStorage.js
        └── version.js
   </code>
			</pre>
      <h3 class="project-javascript__point">
        <a href="https://eslint.org/" target="_blank">2. ESLint</a> & <a href="https://prettier.io/" target="_blank">Prettier</a>
      </h3>
      <p class="project-javascript__point-description"> Kodekvalitet og konsistens sikres ved bruk av
        <strong>ESLint</strong> og <strong>Prettier</strong>,
        som opprettholder høy kvalitet og forhindrer typiske kodefeil. </p>
      <h3 class="project-javascript__point">
        <a href="https://jestjs.io/" target="_blank">3. Jest</a>
      </h3>
      <p class="project-javascript__point-description"> Ved hjelp av <strong>Jest</strong> sikrer vi at alle funksjoner
        fungerer som
        forventet gjennom enhetstesting, noe som gir robust og pålitelig kode. </p>
      <h3 class="project-javascript__point">
        <a href="https://jsdoc.app/" target="_blank">4. JSDoc</a>
      </h3>
      <p class="project-javascript__point-description"> JSDoc brukes til å dokumentere vår JavaScript-kodebase, noe som
        gjør koden lettere
        å forstå og vedlikeholde. </p>
    </section><section class="project-technologies">
      <h2 class="project-technologies__subtitle">Andre viktige teknoligier</h2>
      <h3 class="project-technologies__point">
        <a href="https://developers.google.com/search/mobile-sites" target="_blank">1. Progressive Web App (PWA) </a>
      </h3>
      <p class="project-technologies__point-description"> For å forbedre brukeropplevelsen har vi lagt til
        PWA-funksjonalitet, som gjør at webappen kan fungere offline og støtter "Add to Home Screen" (A2HS)-prompten. 
        Dette gjør appen mer tilgjengelig og tilpasningsdyktig for alle brukere, uansett nettforbindelse. </p>
    </section>
  <link rel="stylesheet" href="docs-assets/docs.custom.css">
