var sock = io();
sock.on('connect', function () {
    console.log('connected to the server');
    sock.emit('message', { data: 'I\'m connected!' });
});

sock.on('message',function(message){
    console.log('from server: ' + message);
    
});

async function createSession(){

}

async function joinSession(){

}