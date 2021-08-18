var sock = io();
sock.on('connect', function () {
    console.log('connected to the server');
    sock.emit('my event', { data: 'I\'m connected!' });
});

sock.on('id',function(message){
    // console.log(message);
    sessionStorage.setItem('node', message.id.node);
    sessionStorage.setItem('session', message.id.session);
    console.log(sessionStorage.getItem('id'));
});