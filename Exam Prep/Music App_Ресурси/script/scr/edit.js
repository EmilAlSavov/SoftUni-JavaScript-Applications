import {getAlbumContent, html, render, page, checkIfEverythingIsFilled} from "../lib.js";
import { get, put } from "../request.js";

let globalId = '';
async function viewEdit(ctx){
    let id = ctx.params.id;
    id = id.replace(':', '');
    globalId = id;

    let album = await get(`/data/albums/${id}`)


    let Page = html`<section class="editPage">
    <form @submit="${onEdit}">
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" value="${album.name}">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${album.imgUrl}">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" value="${album.price}">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${album.releaseDate}">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" value="${album.artist}">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" value="${album.genre}">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10">${album.description}</textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>`

    render(Page, document.getElementById('main-content'));

    
}

async function onEdit(event){
    event.preventDefault();
    
    let form = event.target;
    let elements = form.elements;

    let {name, imgUrl, price, releaseDate, artist, genre, description} = getAlbumContent(elements);

    if(!checkIfEverythingIsFilled([name, imgUrl, price, releaseDate, artist, genre, description])){
        window.alert('Fill all empty fields!');
        return;
    }

    await put(`/data/albums/${globalId}`, {name, imgUrl, price, releaseDate, artist, genre, description}, sessionStorage.getItem('accessToken'));

    page(`/details/:${globalId}`);
}

export {viewEdit};