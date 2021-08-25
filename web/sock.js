let USER_REQUEST = { CREATE: 1, JOIN: 2 };
let SERVER_REQUEST = {SEND_NODE_ID: 3, RESPONSE_TO_SEND_NODE_ID: 4, SET_NODE_ID_ONLY: 5};
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
            localStorage.setItem('session', message.session);
            localStorage.setItem('node', message.node);
            console.log('stored in the local storage');
            break;
        case USER_REQUEST.JOIN:
            break;


        case SERVER_REQUEST.SEND_NODE_ID:
            let payload = {
                request: SERVER_REQUEST.RESPONSE_TO_SEND_NODE_ID,
                node: localStorage.getItem('node')
            };
            sendMessage(payload);
            break;

        case SERVER_REQUEST.SET_NODE_ID_ONLY:
            localStorage.setItem('node', message.node);

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