import {html, render, nothing, page} from "../lib.js";
import { isCreator } from "../mainView.js";
import { del, get } from "../request.js";

let globalId = '';
async function viewDetails(ctx){
    let id = ctx.params.id;
    id = id.replace(':', '');
    globalId = id;

    let album = await get(`/data/albums/${id}`)

    let Page = html`<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${album.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            ${isCreator(album._ownerId) ? html`<div class="actionBtn">
            <a href="/edit/:${id}" class="edit">Edit</a>
            <a @click="${onDelete}" class="remove">Delete</a>
        </div>` : nothing}
        </div>
    </div>
</section>`

    render(Page, document.getElementById('main-content'));
}

async function onDelete(event){
    event.preventDefault();

    if(window.confirm('do you really want to delete this album?')){
        await del(`/data/albums/${globalId}`, undefined, sessionStorage.getItem('accessToken'));
        page('/catalog');
    } else {
        return;
    }
}
export {viewDetails}