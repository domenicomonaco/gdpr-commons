"use strict";
import { cookieAlert } from './cookieAlert.js';

const config = {
    text: {
        linkPrivacyPolicy: "http://www.gdprcommons.it",
        textTitleModal: "Informativa Cookie",
        textAbstractModal: "Questo sito utilizza esclusivamente cookie e/o altri strumenti di tracciamento di tipo tecnico o analitici al solo scopo di analisi statistica del traffico senza risalire all'identità del singolo utente. In oltre, non raccoglie informazioni personali in modo automatico senza esplicito consenso. In alcuni casi sono utilizzate risorse esterne. Ai fini legislativi, a scopo informativo si chiede la consultazione della Privacy Policy e proseguire cliccando su \'Ho capito\'",
        textButtonAccept: "Ho capito",
        textButtonOpenPolicy: "Leggi l\'informativa",
        textButtonResetCookie: "elimina",
    },

    modal: {
        showOnPageLoad: 'cookie',
    },

    fixedicon: {
        show: true
    }
};

window.onload = function() {
    cookieAlert(config);
};