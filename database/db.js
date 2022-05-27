const sqlite = require('sqlite3');
const path = require('path');
const db = new sqlite.Database(path.join(__dirname, 'harp.db'));

function createUser(payload) {
    return new Promise((resolve, reject) => {

        if (payload === undefined) {
            reject(-1);
        }

        db.run(`INSERT INTO users(email, user, pass, id, kmails) VALUES("${payload.email}", "${payload.user}", "${payload.pass}", "${genRanHex(40)}", "${payload.kmails}")`, (error, rows) => {
            if (error) {
                console.error('error occurred: ', error);
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}

function validateUser(user, pass) {
    const promise = new Promise((resolve, reject) => {

        let response = -1;
        if (user === undefined, pass === undefined) {
            resolve(response);
            return;
        }

        db.all(`SELECT * from users where user="${user}" AND pass="${pass}"`, (error, rows) => {
            if (error) {
                reject(error);
                return;
            }
            if (rows !== undefined && rows.length === 1) {
                // console.log(rows, 'rows: ', rows.length);
                response = 1;
                resolve(response);
            }
            if (rows.length === 0) {
                reject(false);
            }
        });
    });
    return promise;

}

function getUser(username) {
    return new Promise((resolve, reject) => {
        db.all(`select user from users where user='${username}'`, (err, rows) => {
            if (err) { reject(err); return; }
            if (rows.length !== 1) { reject('no or multi user found found'); return; }
            resolve(rows[0]);
            return;
        });
    });
}

function getPass(username) {
    return new Promise((resolve, reject) => {
        db.all(`select pass from users where user='${username}'`, (err, rows) => {
            if (err) { reject(err); return; }
            if (rows.length !== 1) { reject('no or multi user found found'); return; }
            resolve(rows[0]);
            return;
        });
    });
}

function getKnownMails(user) {
    return new Promise((resolve, reject) => {
        db.all(`select kmails from users where user='${user}'`, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            if (rows.length !== 1) {
                reject('no or multi user found found');
                return;
            }
            resolve(rows[0]);
            return;
        });
    });
}

function setKnownMails(user, kmails) {
    // update users set kmails='hello' where user='devharp';
    return new Promise((resolve, reject) => {
        db.run(`update users set kmails='${kmails}' where user='${user}'`, err => {
            if (err) {
                console.log('db: failed to save kmails');
                reject(err);
                return;
            }
            console.log(`db: saved kmails to user === ${user}`);
            resolve(true);
            return;
        });
    });
}

function setAll(value) {
    return new Promise((resolve, reject) => {
        db.run(`update users set kmails='${value.kmails}', user='${value.user}', pass='${value.pass}' where user='${value.olduser}'`, err => {
            if (err) {
                console.log('db: failed to save kmails');
                reject(err);
                return;
            }
            resolve(true);
            return;
        });
    });
}

function genRanHex(len) {
    const charset = 'abcdef0123456789';
    let value = '';
    for (let i = 0; i < len; i++) {
        value += charset[parseInt(Math.random() * charset.length)];
    }
    return value;
}

module.exports = { createUser, validateUser, getKnownMails, setKnownMails, getUser, getPass, setAll };