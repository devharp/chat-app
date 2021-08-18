var sock = io();
sock.on('connect', function () {
    console.log('connected to the server');
    sock.emit('my event', { data: 'I\'m connected!' });
});

sock.on('message',function(message){
    console.log(message);
});