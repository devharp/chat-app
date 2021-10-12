let id;
let storage = window.localStorage;

function init() {
    //Check IDs
    checkIDS();
}

function checkIDS() {
    id = { node: storage.getItem('node'), session: storage.getItem('session'), temp: storage.getItem('temp'), name: storage.getItem('name'), avail: true };
    if (id.node == null) {
        console.log('Node Id not found');
        id.avail = false;
    }
    if (id.session == null) {
        console.log('Session Id not found');
        id.avail = false;
    }
    if (id.temp == null) {
        console.log('Temp Id not found');
        id.avail = false;
    }
    if (id.name == null) {
        console.log('Name not found');
        id.avail = false;
    }
    console.log('node id: ' + id.node);
    console.log('session id: ' + id.session);
    console.log('temp id: ' + id.temp);
    console.log('name id: ' + id.name);
    socketConnection();
}

function socketConnection() {
    var socket = io();
    socket.on('connect', function() {

    });
    if (!id.avail) {
        socket.emit('id-validation', {
            node: id.node,
            session: id.session,
            temp: id.temp,
            name: id.name
        });
    }

    socket.on('id-received', function(data) {
        console.log(data);
        storage.setItem('node', data.node);
        storage.setItem('session', data.session);
        storage.setItem('temp', data.temp);
        storage.setItem('name', data.name);
    });
}