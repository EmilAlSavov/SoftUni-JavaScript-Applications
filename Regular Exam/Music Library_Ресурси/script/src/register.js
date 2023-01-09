import { authLogNReg, getAllElementsFromForm, html, render, page } from "../lib.js";
import { post } from "../request.js";

function viewRegister(){
    let page = html`  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form @submit="${onRegister}" class="login-form">
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>`

  render(page, document.getElementById('main'));
}

async function onRegister(event){
    event.preventDefault();

    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let repass = document.getElementById('repeat-password').value;

    if(!authLogNReg(email, password, repass)){
        return;
    }

    let user = await post('/users/register', {email, password});

    sessionStorage.setItem('accessToken', user.accessToken);
    sessionStorage.setItem('currUserId', user._id);

    page('/dashboard');
    
    // let elements = event.target.elements;

    // let {email, password} = getAllElementsFromForm(elements);
    // let repass = document.getElementById('repeat-password');

    // if(!authLogNReg(email, password, repass)){
    //     return;
    // }

    // let user = await post('/users/register', {email, password});

    // sessionStorage.setItem('accessToken', user.accessToken);
    // sessionStorage.setItem('currUserId', user._id);

    // page('/dashboard');
}

export {viewRegister};