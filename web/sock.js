let USER_REQUEST = { CREATE: 1, JOIN: 2 };
var sock = io();
sock.on('connect', function () {
    console.log('connected to the server');
    // sock.emit('message', { data: 'I\'m connected!' });
});

sock.on('message', function (message) {
    // console.log('from server: ' + message);
    switch(message.request){
        case USER_REQUEST.CREATE:
            console.log('session id: ' + message.session);
            console.log('node id: ' + message.node);
            break;
        case USER_REQUEST.JOIN:
            break;
    }

});

async function createSession() {
    let payload = {
        node: localStorage.getItem('node'),
        session: localStorage.getItem('session'),
        request: USER_REQUEST.CREATE
    };
    console.log('\'Create\' button pressed');
    sendMessage(payload);
}

async function joinSession() {
    console.log('\'Join\' button pressed');
    let payload = {
        node: localStorage.getItem('node'),
        session: sessionid.text,
        request: USER_REQUEST.JOIN
    };
    sendMessage(payload);
    
}

function sendMessage(payload){
    sock.emit('message', payload);
}