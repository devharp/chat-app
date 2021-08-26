let win = { h: window.innerHeight, w: window.innerWidth };
let container = { e: document.getElementById('container') };

function init() {
    // container.e.style.height = `${win.h}px`;
    document.documentElement.style.setProperty('--win-h', `${win.h}px`);
}