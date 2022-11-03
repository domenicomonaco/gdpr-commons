/** AUTHOR: Tecnologie per Persone di Domenico Monaco - LICENSE: MIT - LINK: https://www.gdprcommons.it */

function eraseCookie(name) {
    cookieValue = null;
    setCookie(config.text.cookieName, cookieValue, null);
    document.cookie = name + '=; Max-Age=-99999999;';
}

function setCookie(name, value, days) {
    value = JSON.stringify(value);
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            let out = c.substring(nameEQ.length, c.length);
            return JSON.parse(out);
        }
    }
    return null;
}

const config = {
    text: {
        cookieDaysExp: 20,
        cookieName: 'GDPRCommons-cookie',
        linkPrivacyPolicy: "http://www.gdprcommons.it",
        textTitleModal: "Informativa Cookie",
        textAbstractModal: "Questo sito utilizza esclusivamente cookie e/o altri strumenti di tracciamento di tipo tecnico o analitici al solo scopo di analisi statistica del traffico senza risalire all'identità del singolo utente. In oltre, non raccoglie informazioni personali in modo automatico senza esplicito consenso. In alcuni casi sono utilizzate risorse esterne. A scopo informativo, ai fini legislativi, si chiede la consultazione della Privacy Policy e proseguire cliccando su \'Ho capito\'",
        textButtonAccept: "Ho capito",
        textButtonOpenPolicy: "Leggi l\'informativa",
        textAccepted: "Accettato",
        textNotAccepted: "Non accettato",
        textNotPresent: "Nessun dato",
        textButtonResetCookie: "Resetta preferenze",
        textCredits: "GDPRCommons.it",
        textVersion: "v0.1.0",
        textLicense: "MIT"

    }
};

window.onload = function () {

    const GDPRCOMMONS = document.getElementById("GDPR_Commons");
    const dataurlpolicy = GDPRCOMMONS.getAttribute('data-urlpolicy');
    const linkprivacy = (dataurlpolicy == null) ? config.text.linkPrivacyPolicy : dataurlpolicy + '?source=www.gdprcommons.it';


    GDPRCOMMONS.innerHTML = `
  <div id="gdpr-commons-fixedicon">
    <a href="#GDPRCommons-dialog" id="gdpr-commons-button-fixedicon" class="fixedicon" aria-label="Open Cookie Notice">
      <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
      </svg>
    </a>
  </div><div id="gdpr-commons-modal-overlay"></div>
  <div id="gdpr-commons-modal">
    <div class="gdpr-commons-modal-header">
      <div class="gdpr-commons-modal-title">
        <h3>${config.text.textTitleModal}</h3>
      </div>
    </div>
    <div class="gdpr-commons-modal-content">
      <p>
        ${config.text.textAbstractModal}
      </p>
    </div>

    <div class="gdpr-commons-modal-middle">
      <div>
        <span id="last-consent-state">
        </span> <em><span id="last-consent-date"></span></em>
      </div>
      <a href="${linkprivacy}">${config.text.textButtonOpenPolicy}</a>
    </div>

      <div class="gdpr-commons-modal-footer">
        <button id="gdpr-commons-button-accept" class="buttons">${config.text.textButtonAccept}</button>
    </div>
    <div id="gdpr-commons-modal-credits">
        <span><a title="${config.text.textCredits}" target="_blank" href="https://www.gdprcommons.it">
        ${config.text.textCredits}</a>
    </div>
  </div>

  </div>`;

    let cookieValue = {
        date: null,
        accepted: false,
    };

    let cookie = getCookie(config.text.cookieName);

    function hideViews() {
        document.getElementById("gdpr-commons-modal-overlay").classList.add('fadeOUT-display');
        document.getElementById("gdpr-commons-modal").classList.add('fadeOUT-display');
        document.getElementById("gdpr-commons-modal-overlay").classList.remove('fadeIN-display');
        document.getElementById("gdpr-commons-modal").classList.remove('fadeIN-display');
    }

    function showViews() {
        document.getElementById("gdpr-commons-modal-overlay").classList.remove('fadeOUT-display');
        document.getElementById("gdpr-commons-modal").classList.remove('fadeOUT-display');
        document.getElementById("gdpr-commons-modal-overlay").classList.add('fadeIN-display');
        document.getElementById("gdpr-commons-modal").classList.add('fadeIN-display');
    }

    const buttonaccept = document.getElementById("gdpr-commons-button-accept");
    if (buttonaccept != null) {
        buttonaccept.addEventListener('click', function () {

            cookieValue = {
                date: Date(),
                accepted: true,
            };

            setCookie(config.text.cookieName, cookieValue, config.text.cookieDaysExp);
            document.getElementById("last-consent-state").innerHTML = config.text.textAccepted;
            document.getElementById("last-consent-date").innerHTML = new Date(cookieValue.date).toLocaleDateString();

            setTimeout(hideViews(), 1500);
        });
    } else {
        console.warn('button accept not found');
    }

    const buttonreset = document.getElementById("gdpr-commons-button-reset");
    if (buttonreset != null) {

        buttonreset.addEventListener('click', function () {

            cookieValue = {
                date: Date(),
                accepted: false,
            };

            setCookie(config.text.cookieName, cookieValue, config.text.cookieDaysExp);
            location.reload();
        });
    } else {
        console.warn('button reset not found');
    }

    const fixediconbadge = document.getElementById("gdpr-commons-button-fixedicon");
    if (fixediconbadge != null) {

        fixediconbadge.addEventListener('click',
            function () {
                showViews();
            });

    } else {
        console.warn('fixed icon badge not found');
    }

    let eraser = document.getElementsByClassName('eraseCookieGDPR');
    for (let i = 0; i < eraser.length; i++) {
        eraser[i].addEventListener('click', function () {
            console.warn(config.text.cookieName, 'erased');
            eraseCookie(config.text.cookieName);
        });
    }

    setTimeout(function () {
        if (cookie == null) {
            showViews();
        } else {
            if (cookie.date != null) {
                document.getElementById("last-consent-date").innerHTML = new Date(cookie.date).toLocaleDateString();
            } else {
                document.getElementById("last-consent-date").innerHTML = '0:00:00'
            }

            if (cookie.accepted != null && cookie.accepted == true) {
                document.getElementById("last-consent-state").innerHTML = config.text.textAccepted;
            } else {
                document.getElementById("last-consent-state").innerHTML = config.text.textNotAccepted;
                showViews();
            }
        }
    }, 150);
};
