import { authLogNReg, getAllElementsFromForm, html, render, page } from "../lib.js";
import { post } from "../request.js";

function viewLogin(){
    let page = html`<section id="login">
    <div class="form">
      <h2>Login</h2>
      <form @submit="${onLogin}" class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>`;

  render(page, document.getElementById('main'));
}

async function onLogin(event){
    event.preventDefault();

    let elements = event.target.elements;

    let {email, password} = getAllElementsFromForm(elements);


    if(!authLogNReg(email, password)){
        return;
    }

    let user = await post('/users/login', {email, password});

    sessionStorage.setItem('accessToken', user.accessToken)
    sessionStorage.setItem('currUserId', user._id);

    page('/dashboard')
}

export {viewLogin};