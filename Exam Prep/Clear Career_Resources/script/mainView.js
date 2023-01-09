import { isLoged, html, render } from "./lib.js";

function viewNav(ctx, next){
    let nav = '';

    if(isLoged()){
        nav = html`<div>
        <a href="/dashboard">Dashboard</a>
      </div>

      <!-- Logged-in users -->
      <div class="user">
        <a href="/create">Create Offer</a>
        <a href="/logout">Logout</a>
      </div>`
    } else {
        nav = html`<div>
        <a href="/dashboard">Dashboard</a>
      </div>

      <!-- Guest users -->
      <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>`
    }

    render(nav, document.getElementById('nav'))
    next();
}

export {viewNav};