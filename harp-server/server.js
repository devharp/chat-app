const e = require('express');
const fs = require('fs');
const app = require('express')();
const https = require('https').createServer({
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
    passphrase: 'harp'
}, app);
const HTTPS_PORT = 8000;
const io = require('socket.io')(https);

let attendees = [];
/* name expirytime sessionid sessionadmin */

app.use(function (req, res, next) {
    console.log('something happened');
    next();
});

app.get('/', (req, res) => {
    res.send('Home Page');
});

https.listen(HTTPS_PORT, '0.0.0.0', () => {
    console.log(`listening on *:${HTTPS_PORT}`);
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    // console.log('new client joined');
    socket.emit('connection', null);

    socket.on('join-session', (data) => {
        if (!data.name && !data.session) { }
        else if (!data.name) { }
        else if (!data.session) { }
        else {
            /*
                Verify Name
                Verify Session

                if Session Exists
            */
            console.log('got a request from a client: ', data);
            let validN = data.name.match(/^[A-Za-z][A-Za-z0-9 -]*$/);
            let validS = data.session.match(/([a-f|0-9]{3,4})-([a-f|0-9]{3,4})-([a-f|0-9]{3,4})/);

            if (validN === null || validS === null) {
                console.log('name or session is invalid');
            }
            else {
                console.log('both are valid and ready to register');

                let session = null;
                for (let i = 0; i < attendees.length; i++) {
                    if (attendees[i].session === data.session) {
                        session = 'exists';
                        break;
                    }

                }
                if (session !== null) {
                    console.log('session already exist');
                    let socket_exits = attendees.filter(e => e.socket.id === socket.id);
                    if (socket_exits.length === 0) {
                        socket.join(data.session);
                        io.to(data.session).emit('user-joined', { name: data.name, session: data.session, id: socket.id })
                        attendees.push({ name: data.name, session: data.session, owner: null, socket })
                        socket.emit('join-session-request-accepted', { owner: false, session: data.session, name: data.name });
                    }
                    console.log('attendees length: ', attendees.length);
                }
                else {
                    console.log('new session');
                    let socket_exits = attendees.filter(e => e.socket.id === socket.id);
                    if (socket_exits.length === 0) {
                        socket.join(data.session);
                        attendees.push({ name: data.name, session: data.session, owner: socket, socket });
                        socket.emit('join-session-request-accepted', { owner: true, session: data.session, name: data.name });
                    }
                    console.log('attendees length: ', attendees.length);
                }
            }



        }
        // console.log('here', data);
    });

    socket.on('exit-session', (data) => {
        /*
            Find user
            remove user from array 'attendees'
        */
        for (let i = 0; i < attendees.length; i++) {
            if (attendees[i].socket === socket) {
                io.to(attendees[i].session).emit('user-left', socket.id);
                attendees.splice(i, 1);
                console.log('user requested to leave the session, so user is out');
                break;
            }
        }
        console.log('attendees length: ', attendees.length);
    });

    socket.on('disconnect', () => {
        /*
            Remove 'socket' from 'attendees' array
        */
        console.log('socket left');
        for (let i = 0; i < attendees.length; i++) {
            if (attendees[i].socket === socket) {
                io.to(attendees[i].session).emit('user-left', socket.id);
                attendees.splice(i, 1);
                console.log('user left, so user is out');
                break;
            }
        }

        console.log('attendees length: ', attendees.length);

    });
});


function genRanHex(len) {
    const charset = 'abcdef0123456789';
    let value = '';
    for (let i = 0; i < len; i++) {
        value += charset[parseInt(Math.random() * charset.length)];
    }
    return value;
}