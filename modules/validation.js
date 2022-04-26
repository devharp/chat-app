
const states = {
    LOGIN_ACCOUNT: 'loginacc',
    CREATE_ACCOUNT: 'createacc',
}

function validate({ user, pass, email, state }){
    let status = true;
    if(state === states.CREATE_ACCOUNT){
        if(!checkUsername(user) || !checkPassword(pass) || !checkEmail(email)){
            status = false;
        }
    }
    else if(state === states.LOGIN_ACCOUNT){
        if(!checkUsername(user) || !checkPassword(pass)){
            status = false;
        }
    }
    else{
        console.error('Unknown State');
    }
    return status;
}

function checkUsername(username){
    const result = username.match(/^(?![0-9])(?=[0-z._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/);
    if(result === null){
        return false;
    }
    return (username === result[0]) ? true : false;
}

function checkPassword(pass){
    const result = pass.match(/^((?=.*\d)(?=.*[!@#$%^&*_])(?=.*[A-z])(?!.*[,+?/\\\[\]|\(\):;<>'"`~\-=\{\}])).{8,}$/);
    if(result === null){
        return false;
    }
    return (pass === result[0]) ? true : false;
}

function checkEmail(email){
    const result = email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);
    if(result === null){
        return false;
    }
    return (email === result[0]) ? true : false;
}

module.exports = { validate };