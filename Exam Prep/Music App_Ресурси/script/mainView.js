import { html, render } from "./lib.js"

function viewNav(ctx, next){
    let nav = '';
    if(isLoged()){
        nav = html`<img src="./images/headphones.png">
        <a href="/">Home</a>
        <ul>
            <!--All user-->
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/search">Search</a></li>
            <!--Only user-->
            <li><a href="/create">Create Album</a></li>
            <li><a href="/logout">Logout</a></li>
        </ul>`;
    } else{
        nav = html`<img src="./images/headphones.png">
        <a href="/">Home</a>
        <ul>
            <!--All user-->
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/search">Search</a></li>
            <!--Only guest-->
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
        </ul>`;
    }
    render(nav, document.getElementById('nav'));
    next();
}

function isLoged(){
    if(sessionStorage.getItem('accessToken') === 'undefined'){
        return false;
    }

    if(sessionStorage.length > 1){
        return true;
    }else{

        return false;
    }

}

function isCreator(albumCreator){
    let currUserId = sessionStorage.getItem('currUserId');

    if(isLoged()){
        if(albumCreator === currUserId){
            return true;
        } else{
            return false;
        }
    } else {
        return false;
    }
}

export{viewNav, isLoged, isCreator};