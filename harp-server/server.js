const fs = require('fs');
const app = require('express')();
const https = require('https').createServer({
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
    passphrase: 'harp'
},app);
const HTTPS_PORT = 8000;
const io = require('socket.io')(https);

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
});