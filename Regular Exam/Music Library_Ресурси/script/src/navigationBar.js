import { html, render, isLoged } from "../lib.js";

function viewNav(ctx, next){
    let page = '';
    if(isLoged()){
        page = html`<div>
        <a href="/dashboard">Dashboard</a>
    </div>

    <!-- Logged-in users -->
    <div class="user">
        <a href="/create">Add Album</a>
        <a href="/logout">Logout</a>
    </div>`
    } else{
        page = html`<div>
        <a href="/dashboard">Dashboard</a>
    </div>
    
    <!-- Guest users -->
    <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`
    }

    render(page, document.getElementById('nav'));
    next();
}

export {viewNav};