let win = { h: window.innerHeight, w: window.innerWidth };
let container = {
    e: document.getElementById('container'),
    bottom: {
        e: document.querySelector('#container #bottom'),
        content: {
            e: document.querySelector('#container #bottom #content')
        }
    }
};

function init() {
    document.documentElement.style.setProperty('--win-h', `${win.h}px`);
    container.bottom.content.e.style.height = `${container.bottom.e.clientHeight - 40}px`;
}

function send(text) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.43.42:5500/print');
    xhr.send(text);
}