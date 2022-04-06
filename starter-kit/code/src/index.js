import cookiemodal from './components/cookiemodal.html';
import fixedicon from './components/fixedicon.html';

import './styles/main.scss'
import './styles/style.css'

$ = window.$ = window.jQuery = require('jquery');

require('jquery');
require('bootstrap');
require('@fortawesome/fontawesome-free');

function cookieAlert() {
    // Configuration of classes
    const classnotice = '.gdprcommons-notice';
    const classfixedicon = '.gdprcommons-fixedicon';

    // Add content to DIVs
    const gdprcommonsnotice = $(classnotice).html(cookiemodal);
    const gdprcommonsfixedicon = $(classfixedicon).html(fixedicon);

    function showCookieAlert() {
        $(classnotice + ' .modal').modal('show');
    }

    $(classfixedicon + ' .fixedicon').on('click', function() {
        showCookieAlert();
    });
}

cookieAlert();