import { html, render, page, authLogNReg } from "../lib.js";
import { post } from "../request.js";

function viewLogin(){
    const Page = html`<section id="loginPage">
    <form>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="log-in-email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="log-in-password" class="password" name="password" type="password" placeholder="Password">

            <button @click="${onLogin}" type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`

render(Page, document.getElementById('main-content'));
}

async function onLogin(event){
    event.preventDefault();
    
    let email = document.getElementById('log-in-email').value;
    let password = document.getElementById('log-in-password').value;

    if(!authLogNReg(email, password)){
        return;
    }

    let user = await post('/users/login', {email, password}, undefined);

    sessionStorage.setItem('accessToken', user.accessToken);
    sessionStorage.setItem('currUserId', user._id);

    page('/');
}

export {viewLogin};