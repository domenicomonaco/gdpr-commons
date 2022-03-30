const cookiepolicyname = 'cookie_approval_GPDRCOMMMONS';

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function showCookieAlert() {
    if (getCookie(cookiepolicyname) == null) {
        $('#deleteconsenso').hide();
        $('#gpdrdateacceptance').html('<em>non disponibile</em>');
    } else {
        $('#deleteconsenso').show();
        $('#gpdrdateacceptance').html(getCookie(cookiepolicyname));
    }
    $('#cookieModal').modal('show');
}

if (getCookie(cookiepolicyname) == null) {
    $(document).ready(function() {
        showCookieAlert();
    });
}

$('.gdprc-cookieconsent').on('click', function() {
    showCookieAlert();
});

$('#deleteconsenso').on('click', function() {
    setCookie(cookiepolicyname, null);
    eraseCookie(cookiepolicyname);
    $('#gpdrdateacceptance').html('<em>non disponibile</em>');
    $('#deleteconsenso').hide();
});

$("#accept_policy").on("click", function() {
    setCookie(cookiepolicyname, new Date().toLocaleString(), 20);
});