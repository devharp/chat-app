let id;
let storage = window.localStorage;

function init() {
    socketConnection();
}

function socketConnection() {
    id = {
        node: window.localStorage.getItem('node'),
        session: window.localStorage.getItem('session'),
        temp: window.localStorage.getItem('temp'),
        name: window.localStorage.getItem('name')
    };

    var socket = io();
    socket.on('connect', function() {
        socket.emit('id-validation', {
            node: id.node,
            session: id.session,
            temp: id.temp,
            name: id.name
        });
        console.log('sent: ');
        console.log(id);

    });

    socket.on('id-received', function(data) {
        console.log('Received from the Web Server');
        console.log(data);
        window.localStorage.setItem('node', data.node);
        window.localStorage.setItem('session', data.session);
        window.localStorage.setItem('temp', data.temp);
        window.localStorage.setItem('name', data.name);
    });
}