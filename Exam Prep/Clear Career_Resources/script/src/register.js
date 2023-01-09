import { render, html, page, authLogNReg } from "../lib.js";
import { post } from "../request.js";

function viewRegister(){
    let page = html`<section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="login-form">
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button @click="${onRegister}" type="submit">register</button>
        <p class="message">Already registered? <a href="#">Login</a></p>
      </form>
    </div>
  </section>`;

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
}

export {viewRegister};