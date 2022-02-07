const fs = require('fs');
const app = require('express')();
const https = require('https').createServer({
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
    passphrase: 'harp'
},app);
const HTTPS_PORT = 8000;
const io = require('socket.io')(https);

let attendees = [];
/* name expirytime sessionid sessionadmin */

app.use(function(req, res, next){
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
    console.log('new client joined');
    socket.emit('connection', null);

    socket.on('join-session', (data) => {
        if(!data.name && !data.session){}
        else if(!data.name){}
        else if(!data.session){}
        else{
            /*
                Verify Name
                Verify Session

                if Session Exists
            */
        }
    });

    socket.on('exit-session', (data) => {
        /*
            Find user's room
            remove user from array 'attendees'
        */
    });

    socket.on('disconnect', () => {
        /*
            Remove 'socket' from 'attendees' array
        */
    });
});