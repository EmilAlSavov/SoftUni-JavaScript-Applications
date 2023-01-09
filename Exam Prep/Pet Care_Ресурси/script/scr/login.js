import { post } from "../request.js";
import { render } from "../view.js";
import page from 'https://unpkg.com/page/page.mjs';

let viewLogin = function() {render('loginPage', 'block')};


let logBtn = document.getElementById('loginPage').getElementsByTagName('button')[0];
logBtn.addEventListener('click', onLog);

async function onLog(event){
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if(email === '' || password === ''){
        window.alert('fill the gaps');
        return;
    }

    let user = await post('/users/login', {email, password});
    let accessToken = user.accessToken;
    let userId = user._id;
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('userId', userId);
    page.redirect('/');
}




export {viewLogin};