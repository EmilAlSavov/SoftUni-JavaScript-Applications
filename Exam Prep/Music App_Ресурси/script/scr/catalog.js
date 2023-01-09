import { html, render, nothing } from "../lib.js";
import { isLoged } from "../mainView.js";
import { get } from "../request.js";

async function viewCatalog(){

    let albums = await getCatalog();
    
    let cardBoards = [];
    
    for (const album of albums) {
        let cardBoard = html`<div class="card-box">
        <img src=".${album.imgUrl}">
        <div>
        <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: $${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${isLoged() ? html`<div class="btn-group">
        <a href="/details/:${album._id}" id="details">Details</a>
        </div>` : nothing}
        </div>
        </div>`;
        
        cardBoards.push(cardBoard);
    }
    
    if(cardBoards.length === 0){
        let noAlbums = html`<p>No Albums in Catalog!</p>`;
        cardBoards.push(noAlbums);
    }

    let Page = html`<section id="catalogPage">
    <h1>All Albums</h1>
    ${cardBoards}
    </section>`;
    
    render(Page, document.getElementById('main-content'));
}

async function getCatalog(){
    let data = await get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
    return Array.from(data);
}

export {viewCatalog};