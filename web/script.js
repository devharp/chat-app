function init() {
    //Check IDs
    checkIDS();
}

function checkIDS() {
    let storage = window.localStorage;
    let id = { node: storage.getItem('node'), session: storage.getItem('session'), temp: storage.getItem('temp') };
    if (id.node == null) {
        console.log('Node Id not found');
    }
    if (id.session == null) {
        console.log('Session Id not found');
    }
    if (id.temp == null) {
        console.log('Temp Id not found');
    }
}