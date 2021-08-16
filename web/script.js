let sessionid = document.querySelector('#session-box #session-id');

let user_input = '';

function keyu(e) {
    user_input = e.value;
    let match = user_input.match(/([a-z|0-9]{3,4})-([a-z|0-9]{3,4})-([a-z|0-9]{3,4})/g);
    if (match != null) {
        // Match found
        if (match[0] == user_input) {
            sessionid.style.borderColor = '#00a000';
        }
        else {
            sessionid.style.borderColor = 'crimson';
        }

    }
    else {
        // Match not found
        sessionid.style.borderColor = 'crimson';

    }
    sessionid.style.animation = 'key-down 0.3s infinite';
    setTimeout(function () { sessionid.style.animation = 'key-down 0.3s 0'; }, 100);
}

let join = {
    e: document.querySelector('#join-session-btn'),
    svg: document.querySelector('#join-session-btn svg'),
    front: document.querySelector('#join-session-btn #front'),
    back: document.querySelector('#join-session-btn svg #back'),
    touch: document.getElementById('join-touch')
};
join.svg.style.top = String(join.svg.style.top - 2 - join.front.offsetTop) + 'px';
join.svg.style.left = '0px';

join.svg.setAttribute('width', String(join.e.clientWidth) + 'px');
join.svg.setAttribute('height', String(join.e.clientHeight + 2) + 'px');

console.log();
function clickedJoin(event) {
    let click = { x: event.offsetX, y: event.offsetY };
    console.log(click);
    join.back.setAttribute('cx', click.x);
    join.back.setAttribute('cy', click.y);
    let t = { val: -1 };
    anime({
        targets: t,
        easing: 'linear',
        val: 250,
        duration: 1000,
        update: function () {
            if (t.val < 200) {
                /*join.back.setAttribute('cx', click.x);
                join.back.setAttribute('cy', click.y);*/
                join.back.setAttribute('r', t.val);
            }
            else{
                join.back.setAttribute('r', 0);
            }
        }
    });

}

let create = {
    front: document.querySelector('#create-session-btn'),
    back: document.querySelector('#create-session-btn #back'),
    svg: document.querySelector('#create-session-btn #back svg'),
    circle: document.querySelector('#create-session-btn #back svg #circle')
};
create.svg.setAttribute('width', create.back.offsetWidth);
create.svg.setAttribute('height', create.back.offsetHeight);
function clickedCreate(event){
    let click = { x: event.offsetX, y: event.offsetY };
    console.log(click);
    create.circle.setAttribute('cx', click.x);
    create.circle.setAttribute('cy', click.y);
    let t = { val: -1 };
    anime({
        targets: t,
        easing: 'linear',
        val: 250,
        duration: 1000,
        update: function () {
            if (t.val < 200) {
                create.circle.setAttribute('r', t.val);
            }
            else{
                create.circle.setAttribute('r', 0);
            }
        }
    });
}