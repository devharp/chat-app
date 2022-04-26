const express = require('express');
const db = require('./database/db');
const { validate } = require('./modules/validation');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const cors = require('cors');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const HTTP_PORT = 3005;
const states = {
    LOGIN_ACCOUNT: 'loginacc',
    CREATE_ACCOUNT: 'createacc',
}

let sockets = [];
let clientsessions = [];
app.use(cors());
app.use(express.text());
app.use(cookieparser());
app.use(session({
    secret: genRanHex(50),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
}));
const routes = ['/', '/index.html', '/settings', '/about', '/error'];
const auth = (req, res, next) => {
    if (req.session && clientsessions.includes(req.session.user)) {
        next();
    }
    else {
        console.log('rejected request: ', req.session.user);
        res.redirect('/login');
    }
}

const auth1 = (req, res, next) => {
    // console.log(req.url);
    if(req.url !== '/'){
        next();
        return;
    }
    if(!clientsessions.includes(req.session.user)){
        res.redirect('/login');
        return;
    }
    next();
}

const auth2 = (req, res, next) => {
    if(clientsessions.includes(req.session.user)){
        res.redirect('/');
        return;
    }
    next();
}

app.use('/', auth1, express.static(path.join(__dirname, 'frontend', 'build')));

app.get(routes, auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.get('/login', auth2, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.get('/meeting', auth, (req, res) => {
    res.send('Meeting page here');
});

app.post('/login', (req, res) => {
    const payload = JSON.parse(req.body);
    // console.log(payload);
    if (!validate(payload)) {
        res.sendStatus(200).end();
        console.log('validation failed');
        return;
    }

    if (payload.state === states.LOGIN_ACCOUNT) {
        db.validateUser(payload).then(response => {
            if (response === 1) {
                req.session.user = payload.user;
                // res.sendStatus(200).end();
                res.status(200).send({ status: 'redirect', to: '/' });
                if(!clientsessions.includes(payload.user)){
                    clientsessions.push(payload.user);
                }
                console.log('session: ', req.session.user);
                console.log(clientsessions);
            }
        });
    }

    else if (payload.state === states.CREATE_ACCOUNT) {
        if(db.createUser(payload) === 'ok'){
            res.status(200).send({ status: 'created-account' });
        }
    }

    else {
        console.error('Unknown State triggered');
    }
    return;
});

app.get('/logout', (req, res) => {
    if (clientsessions.includes(req.session.user)) {
        clientsessions.splice(clientsessions.indexOf(req.session.user), 1);
        req.session.destroy();
    }
    res.redirect('/login');
    console.log(clientsessions);
});

io.on('connection', (socket) => {
    console.log('New Client Joined');

    socket.on('add-to-session', (data) => {
        console.log('client requested, add-to-session')
        const elem = { socket: socket, link: genRanLink(), owner: socket };
        sockets.push(elem);

        socket.emit('alotted-session', { owner: elem.socket.id, link: elem.link });
        console.log('total sockets: ', sockets.length);
    })

    socket.on('disconnect', () => {
        console.log("Client Disconnected");
        for (let i = 0; i < sockets.length; i++) {
            if (sockets[i].socket === socket) {
                sockets.splice(i, 1);
                break;
            }
        }
        console.log('total sockets: ', sockets.length);

    })
})

http.listen(HTTP_PORT, '0.0.0.0', () => {
    console.log('Server started on port: ', HTTP_PORT);
})

function genRanHex(len) {
    const charset = 'abcdef0123456789';
    let value = '';
    for (let i = 0; i < len; i++) {
        value += charset[parseInt(Math.random() * charset.length)];
    }
    return value;
}

function genRanLink() {
    const lim = [3, 4];
    return String(genRanHex(lim[parseInt(Math.random() * lim.length)]) + '-' + genRanHex(lim[parseInt(Math.random() * lim.length)]) + '-' + genRanHex(lim[parseInt(Math.random() * lim.length)]))
}

function geth(link){
    const host = 'http://' + '192.168.1.7' + ':' + HTTP_PORT + '/' + link;
    return host;
}