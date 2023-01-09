import { checkIfEverythingIsFilled, html, render, page, nothing } from "../lib.js";
import { isLoged } from "../mainView.js";
import { get } from "../request.js";

function viewSearch(ctx, next){
    let Page = html`<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click="${prepSearch}" class="button-list">Search</button>
    </div>

    <div class="search-result" id="searchResult">
        
    </div>

    <h2>Results:</h2>`

    render(Page, document.getElementById('main-content'));

    function prepSearch(event){
        event.preventDefault()
    
        let searchContent = document.getElementById('search-input').value;
    
        if(!checkIfEverythingIsFilled([searchContent])){
            window.alert('The search is empty!');
            return;
        }

        page(`/search?where=name%20LIKE%20%22${searchContent}%22`);
    }
}

async function onSearch(query){
    query = encodeURI(query);

    let albums = await get(`/data/albums?` + query)
    
    let result = [];

    for (const album of albums) {
        let albumRes = html`<div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>${isLoged() ? html`<div class="btn-group">
            <a href="/details/:${album._id}" id="details">Details</a>
        </div>` : nothing}
        </div>
    </div>`

        result.push(albumRes);
    }

    if(result.length === 0){
        let noResult = html`<p class="no-result">No result.</p>`;
        result.push(noResult);
    }

    render(result, document.getElementById('searchResult'));
}

function parseQuery(ctx, next){
    if(ctx.querystring === ""){
        next();
        return;
    }

    onSearch(ctx.querystring);
    next();
}

export {viewSearch, parseQuery};