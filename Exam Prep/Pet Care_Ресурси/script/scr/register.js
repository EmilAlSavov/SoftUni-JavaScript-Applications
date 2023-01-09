import { post } from "../request.js";
import { render } from "../view.js";
import page from 'https://unpkg.com/page/page.mjs';

let viewRegister = function() {render('registerPage', 'block')};

let registerBtn = document.getElementById('registerPage').getElementsByTagName('button')[0];
registerBtn.addEventListener('click', onRegister);

async function onRegister(event){
    event.preventDefault();

    let email = document.getElementById('registerPage').getElementsByTagName('input')[0].value;
    let password = document.getElementById('registerPage').getElementsByTagName('input')[1].value;
    let repass = document.getElementById('registerPage').getElementsByTagName('input')[2].value;

    
    if(email === '' || password === '' || repass === ''){
        window.alert('fill the gaps');
        return;
    }

    if(password !== repass){
        window.alert('both passwords must be the same');
        return;
    }

    let user = await post('/users/register', {email, password});

    let accessToken = user.accessToken;
    let userId = user._id;

    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('userId', userId);

    page.redirect('/');
}

export {viewRegister};