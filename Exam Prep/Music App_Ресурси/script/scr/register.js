import { html, render, page, authLogNReg } from "../lib.js";
import { post } from "../request.js";

function viewRegister(){
    let Page = html`<section id="registerPage">
    <form>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="register-email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="register-password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button @click=${onRegister}type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`

render(Page, document.getElementById('main-content'));
}

async function onRegister(event){
    event.preventDefault();
    
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let repass = document.getElementById('conf-pass').value;

    if(!authLogNReg(email, password, repass)){
        return;
    }

    let user = {};
    try {
        user = await post('/users/register', {email, password});
        sessionStorage.setItem('accessToken', user.accessToken);
        sessionStorage.setItem('currUserId', user._id);
    } catch {
        window.alert('this user already exist');
        return;
    }

    page('/');
}   

export {viewRegister};