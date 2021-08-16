let sessionid = document.querySelector('#session-box #session-id');

let user_input = '';

function keyu(e) {
    user_input = e.value;
    let match = user_input.match(/([a-z|0-9]{3,4})-([a-z|0-9]{3,4})-([a-z|0-9]{3,4})/g);
    if (match != null) {
        // Match found
        if (match[0] == user_input) {
            sessionid.style.borderColor = '#00a000';
        }
        else{
            sessionid.style.borderColor = '#f00';
        }

    }
    else {
        // Match not found
        sessionid.style.borderColor = '#f00';

    }
    sessionid.style.animation = 'key-down 0.3s infinite';
    setTimeout(function () { sessionid.style.animation = 'key-down 0.3s 0'; }, 100);
}