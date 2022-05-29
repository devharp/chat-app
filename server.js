const express = require('express');
const dbhandler = require('./database/db');
const meetinghandler = require('./modules/meetinghandler');
const { validate } = require('./modules/validation');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const session = require('express-session');
const HTTP_PORT = 3000;
const states = {
    LOGIN_ACCOUNT: 'loginacc',
    CREATE_ACCOUNT: 'createacc',
}

app.use(cors());
app.use(express.text());
app.use(session({
    secret: genRanHex(50),
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));
const routes = ['/', '/settings', '/about', '/error'];
const auth = (req, res, next) => {

    if (req.session !== null) {
        console.log('session not null here');
        dbhandler.validateUser(req.session.username, req.session.password)
            .then(value => {
                if (value === 1) {

                    console.log('session found');
                    next();

                } else {
                    console.log('session found but unknown error occurred');
                    req.session.destroy();
                    res.redirect('/login');
                }
            })
            .catch(err => {
                if (req.session !== null) {
                    console.log('Maybe username or password has been changed, so destroying the session');
                    req.session.destroy();
                }
                res.redirect('/login');
            });
    } else {
        console.log('here, session not found');
        res.redirect('/login');
    }
}

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get(routes, auth, (req, res) => {

    res.sendFile(path.join(__dirname, 'frontend', 'build', 'page.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'page.html'));
});

app.post('/login', (req, res) => {
    let payload;
    try {
        payload = JSON.parse(req.body);
    } catch (error) {
        console.log(error);
        res.send({ status: 'failed-account' }).end();
        return;
    }
    if (!validate(payload)) {
        console.log('validation failed:\n', req.body);
        res.send({ status: 'failed-account' });
        return;
    }

    if (payload.state === states.LOGIN_ACCOUNT) {

        console.log(payload);
        dbhandler.validateUser(payload.user, payload.pass)
            .then(value => {
                if (value === 1) {
                    console.log('found user: ', { user: payload.user, pass: payload.pass });
                    req.session.username = payload.user;
                    req.session.password = payload.pass;
                    res.send({ status: 'redirect', to: '/' });
                } else {
                    res.sendStatus(501).end();
                }
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(501).end();
            });

    } else if (payload.state === states.CREATE_ACCOUNT) {

        payload.kmails = '[]';
        console.log(payload);
        dbhandler.createUser(payload)
            .then(v => {
                console.log('Account created successfully');
                res.send({ status: 'created-account' }).end();
            })
            .catch(err => {
                console.log('Account creation failed: ', err);
                res.send({ status: 'failed-account' }).end();
            });

    } else {

        console.error('Unknown State triggered');
        res.sendStatus(501).end();

    }
    return;
});

app.get(/^\/([0-9|a-z]{3,4})-([0-9|a-z]{3,4})-([0-9|a-z]{3,4})$/, auth, (req, res) => {
    res.render('pages/meeting.ejs', { username: req.session.username, password: req.session.password });
});

app.post('/meeting', auth, (req, res) => {
    try {
        const payload = JSON.parse(req.body);
        console.log('received for the meeting:\n', payload);
        if (payload.link === '') {
            res.send({ status: 'meeting-found', redirect: '/' + genRanLink() });
        } else {
            console.log('here: ', payload.link);
            const match = /^([0-9|a-z]{3,4})-([0-9|a-z]{3,4})-([0-9|a-z]{3,4})$/.exec(payload.link);
            console.log(match);
            if (match !== null) {
                if (match[0] === payload.link) {

                    res.send({ status: 'meeting-found', redirect: '/' + payload.link });
                } else {

                    res.send({ status: 'meeting-notfound' })

                }

            } else {

                res.send({ status: 'meeting-notfound' })
            }
        }
    } catch (error) {
        console.error(error);
        res.send({ status: '-1' })
    }
});

app.get('/get', auth, (req, res) => {
    const username = req.session.username;
    const query = req.query;
    console.log('here');
    switch (query.key) {
        case "kmails":
            // dbhandler.getKnownMails(req.session.username)
            dbhandler.getKnownMails(username)
                .then(value => {
                    res.send(value).end();
                })
                .catch(err => {
                    res.send('unknown error occurred');
                });
            break;
        case "user":
            dbhandler.getUser(username)
                .then(v => {
                    res.send(v);
                })
                .catch(err => {
                    res.send('unknown error occurred');
                });
            break;
        case "pass":
            dbhandler.getPass(username)
                .then(v => {
                    res.send(v);
                })
                .catch(err => {
                    res.send('unknown error occurred');
                });
            break;
        default:
            res.send('unknown query sent')
            break;

    }
});

app.post('/get', auth, (req, res) => {
    const username = req.session.username;
    const query = req.query;
    let payload;
    console.log({ query, payload });
    switch (query.key) {
        case "kmails":
            payload = req.body;
            dbhandler.setKnownMails(username, payload)
                .then(value => {
                    res.send(value);
                })
                .catch(err => {
                    res.send('unknown error occurred');
                });
            break;
        case 'all':
            console.log('request to change all data values at once');
            payload = JSON.parse(req.body);
            payload = { kmails: JSON.stringify(payload.kmaills), user: payload.userpassv.user, pass: payload.userpassv.pass, olduser: payload.oldusername }
            console.log('received data: ', payload);
            dbhandler.setAll(payload)
                .then(value => {
                    if (value === true) {
                        res.send('ok');
                    } else {
                        res.send('false');
                    }
                })
                .catch(err => {
                    res.send('false');
                });
            break;
        default:
            res.send('unknown query sent')
            break;

    }
});


app.get('/logout', (req, res) => {

    req.session.destroy();
    res.redirect('/login')

});

io.on('connection', (socket) => {
    console.log('user joined');
    socket.on('add-to-session', payload => {
        console.log(payload);
        dbhandler.validateUser(payload.username, payload.password)
            .then(v => {
                if (v === 1) {
                    if (/^([0-9|a-z]{3,4})-([0-9|a-z]{3,4})-([0-9|a-z]{3,4})$/.exec(payload.link)[0] === payload.link) {

                        meetinghandler.addUser({ socket, peer: payload.peer }, payload.link);
                        meetinghandler.show();

                        const nodes = meetinghandler.getUsers(payload.link);
                        nodes.map(e => {
                            e.socket.emit('update-peers');
                        });
                    }
                }
            })
            .catch(e => {
                console.error(e);
            });
    });

    socket.on('get-peers', payload => {
        if (payload.link !== null) {
            if (/^([0-9|a-z]{3,4})-([0-9|a-z]{3,4})-([0-9|a-z]{3,4})$/.exec(payload.link)[0] === payload.link) {
                const nodes = meetinghandler.getUsers(payload.link);
                let peers = [];
                nodes.map(e => { peers.push(e.peer) });
                nodes.map(e => {
                    e.socket.emit('peers-list', peers);
                });
            }
        }
    });

    socket.on('disconnect', () => {
        const link = meetinghandler.getUser(socket).link;

        meetinghandler.deleteUser(socket);
        meetinghandler.show();

        const nodes = meetinghandler.getUsers(link);
        nodes.map(e => {
            e.socket.emit('update-peers');
        });

    });
})

http.listen(HTTP_PORT, '0.0.0.0', () => {
    console.log('Server started on port: ', HTTP_PORT);
})

function genRanHex(len) {
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
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

function geth(link) {
    const host = 'http://' + '192.168.1.7' + ':' + HTTP_PORT + '/' + link;
    return host;
}