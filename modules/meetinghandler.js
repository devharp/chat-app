let nodes = []

function addUser({ socket, peer }, lnk) {
    let link = lnk;
    if (link === '') {
        link = genRanLink();
    }
    let found = false;
    for (let i = 0; i < nodes.length; i++) {
        const e = nodes[i];
        if (e.socket.id === socket.id) {
            found = true;
            nodes[i].peer = peer;
            nodes[i].link = link;
            break;
        }
    }
    if (!found) {
        nodes.push({ socket, peer, link });
    }
}

function deleteUser(socket) {

    for (let i = 0; i < nodes.length; i++) {
        const e = nodes[i];
        if (e.socket.id === socket.id) {
            nodes.splice(i, 1);
            break;
        }
    }
}

function getUser(socket) {
    let user;
    for (let i = 0; i < nodes.length; i++) {
        const e = nodes[i];
        if (e.socket.id === socket.id) {
            user = e;
            return user;
        }
    }
}

function getAllNodes() {
    return nodes;
}

function getUsers(link) {
    let tempnodes = [];
    nodes.map(e => {
        if (e.link === link) {
            tempnodes.push(e);
        }
    });
    return tempnodes;
}

function show() {
    console.log('---x---x---x---\nSession info:');
    nodes.map(e => { console.log({ socket: e.socket.id, peer: e.peer, link: e.link }) });
    console.log('---x---x---x---')
}


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

module.exports = { addUser, deleteUser, getUser, getUsers, getAllNodes, show };