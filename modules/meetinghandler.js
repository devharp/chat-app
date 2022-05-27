let sessions = []

function joincreateSession(creator, link) {
    let found = false;
    let members = [];
    for (let i = 0; i < sessions.length; i++) {
        const e = sessions[i].link;
        if (e === link) {
            found = true;
            break;
        }
    }
    if (found) {
        // sessions.push({ creator, link });
        return link;
    } else {
        let newlink = link;
        if (link === null) {
            newlink = genRanLink();
        }
        sessions.push({ creator, link: newlink, members });
        return newlink;
    }

}

function addMemberToSession(ids, link) {
    for (let i = 0; i < sessions.length; i++) {
        const e = sessions[i].link;
        if (e === link) {
            const members = sessions[i].members;
            let mfound = false;
            for (let j = 0; j < members.length; j++) {
                const f = members[j];
                if (ids.socket.id === f.socket.id) {
                    sessions[i].members[j].peer = ids.peer;
                    mfound = true;
                }
            }
            if (!mfound) {
                sessions[i].members.push(ids);
            }
            break;
        }
    }
}

function deleteMemberFromSession(socketid) {
    for (let i = 0; i < sessions.length; i++) {
        const e = sessions[i].members;
        let mfound = false;
        for (let j = 0; j < e.length; j++) {
            const f = e[j];
            if (f.socket.id === socketid) {
                sessions[i].members.splice(j, 1);
                mfound = true;
                break;
            }
        }
        if (mfound) {
            break;
        }
    }
}

function deleteSession(link) {
    for (let i = 0; i < sessions.length; i++) {
        const e = sessions[i].link;
        if (e === link) {
            sessions.splice(i, 1);
            break;
        }
    }
}

function getSession(link) {
    for (let i = 0; i < sessions.length; i++) {
        const e = sessions[i].link;
        if (e === link) {
            return sessions[i];
        }
    }
}

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

module.exports = { joincreateSession, getSession, deleteSession, addMemberToSession, deleteMemberFromSession }