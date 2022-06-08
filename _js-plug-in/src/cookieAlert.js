"use strict";
import cookiemodal from './components/cookiemodal.html';
import fixedicon from './components/fixedicon.html';

import './styles/main.scss'
import './styles/style.css'

$ = window.$ = window.jQuery = require('jquery');

require('jquery');
require('bootstrap');
require('@fortawesome/fontawesome-free');

export function cookieAlert(config = null) {

    let gdprcommonslink = document.createElement('a');
    gdprcommonslink.setAttribute('href', 'gdprcommons-link');
    gdprcommonslink.classList.add('gdprcommons-link');

    let gdprcommonsfixedicon = document.createElement('div');
    gdprcommonsfixedicon.classList.add('gdprcommons-fixedicon');

    let gdprcommonsnotice = document.createElement('div');
    gdprcommonsnotice.classList.add('gdprcommons-notice');

    document.body.append(gdprcommonslink);
    document.body.append(gdprcommonsfixedicon);
    document.body.append(gdprcommonsnotice);

    //shows mode of modals
    const modalsho_ever = 'ever'; //is ever showd on page load
    const modalsho_cookie = 'cookie'; //is baes of acceptance cookie

    //default day expire cookie
    const cookie_expire = 20;

    // Configuration variables
    const cookiename = 'GDPRCommons';

    //DIVS ID
    const classnotice = '.gdprcommons-notice';
    const classfixedicon = '.gdprcommons-fixedicon';

    let cookieValue = {
        load: new Date().getTime(),
        accepted: false,
    };

    // INIT CONTENT DIVs
    gdprcommonsnotice = $(classnotice).html(cookiemodal);

    // Show modal
    function showCookieAlert() {
        let cookie = getCookie(cookiename);
        if (cookie != null) {
            $(classnotice + ' .last-consent-date').html(new Date(cookie.load).toDateString());
        }
        $(classnotice + ' .modal').modal('show');
    }

    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }

    function setCookie(name, value, days = cookie_expire) {
        value = JSON.stringify(value);
        var expires = "";
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
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                let out = c.substring(nameEQ.length, c.length);
                return JSON.parse(out);
            }
        }
        return null;
    }

    $(classnotice + ' #accept_policy').on('click', function() {
        console.log('accepted');
        cookieValue.accepted = true;
        setCookie(cookiename, cookieValue);
        $(classnotice + ' .modal').modal('hide');
    });

    $(classnotice + ' #delete_cookie').on('click', function() {
        eraseCookie(cookiename);
        console.log('erased');
        $(classnotice + ' .last-consent-date').html('non disponibile');
    });


    // Features
    if (config.fixedicon.show === true) {
        $(classfixedicon).html(fixedicon);
        $(classfixedicon + ' #open_cookiemodal').on('click', function() {
            showCookieAlert();
            console.log('..');
        });
    }

    if (config.modal.showOnPageLoad == modalsho_ever) {
        showCookieAlert();

    } else if (config.modal.showOnPageLoad == modalsho_cookie) {
        console.log(getCookie(cookiename));
        if (getCookie(cookiename) == null) {
            showCookieAlert();
        }
    }

    if (config) {
        if (config.text) {
            if (config.text.linkPrivacyPolicy) {
                $('#linkPrivacyPolicy').attr("href", config.text.linkPrivacyPolicy);
            } else {
                $('#linkPrivacyPolicy').attr("href", '/');
            }
            if (config.text.textTitleModal) {
                $('#textTitleModal').html(config.text.textTitleModal);
            } else {
                $('#textTitleModal').html('example title');
            }
            if (config.text.textAbstractModal) {
                $('#textAbstractModal').html(config.text.textAbstractModal);
            } else {
                $('#textAbstractModal').html('example abstract');
            }
            if (config.text.textButtonAccept) {
                $('#textButtonAccept').html(config.text.textButtonAccept);
            } else {
                $('#textButtonAccept').html('accept example');
            }
            if (config.text.textButtonOpenPolicy) {
                $('#textButtonOpenPolicy').html(config.text.textButtonOpenPolicy);
            } else {
                $('#textButtonOpenPolicy').html('example open policy');
            }
            if (config.text.textButtonResetCookie) {
                $('#textButtonResetCookie').html(config.text.textButtonResetCookie);
            } else {
                $('#textButtonResetCookie').html('example delete');
            }
        }
    }
}

export default cookieAlert;