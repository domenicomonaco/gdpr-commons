import cookiemodal from './components/cookiemodal.html';
import fixedicon from './components/fixedicon.html';

import './styles/main.scss'
import './styles/style.css'

$ = window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('jquery');

const classnotice = '.gdprcommons-notice';
const classfixedicon = '.gdprcommons-fixedicon';

const gdprcommonsnotice = $(classnotice).html(cookiemodal);
const gdprcommonsfixedicon = $(classfixedicon).html(fixedicon);

function showCookieAlert() {
    $('#cookieModal').modal('show');
}

$('.gdprcommons-fixedicon .open-notice').on('click', function() {
    showCookieAlert();
});