const sqlite = require('sqlite3');
const path = require('path');
const db = new sqlite.Database(path.join(__dirname, 'harp.db'));

function createUser(payload) {
    if (payload === undefined) {
        return -1;
    }

    db.run(`INSERT INTO users(email, user, pass, id) VALUES("${payload.email}", "${payload.user}", "${payload.pass}", "${genRanHex(40)}")`, (error, rows) => {
        if (error) {
            console.error('error occurred: ', error);
            return;
        }
        if (rows !== undefined) {
            console.log(rows);
        }
    });

    return 'ok';
}
function validateUser(payload) {
    const promise = new Promise((resolve, reject) => {

        let response = -1;
        if (payload === undefined) {
            resolve(response);
        }

        db.all(`SELECT * from users where user="${payload.user}" AND pass="${payload.pass}"`, (error, rows) => {
            if (error) {
                reject(error);
                return;
            }
            if (rows !== undefined && rows.length === 1) {
                // console.log(rows, 'rows: ', rows.length);
                response = 1;
                resolve(response);
            }
        });
    });
    return promise;

}

function genRanHex(len) {
    const charset = 'abcdef0123456789';
    let value = '';
    for (let i = 0; i < len; i++) {
        value += charset[parseInt(Math.random() * charset.length)];
    }
    return value;
}

module.exports = { createUser, validateUser };