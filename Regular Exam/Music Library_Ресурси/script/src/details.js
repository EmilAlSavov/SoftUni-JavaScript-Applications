import { html, isCreator, isLoged, render, nothing, page } from "../lib.js";
import { del, get, post } from "../request.js";

let globalId = '';
async function viewDetails(ctx){
    let id = ctx.params.id;
    id = id.replace(':', '');
    globalId = id;

    let albumId = id;

    let album = await get(`/data/albums/${id}`);

    let likes = await get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
    let page = html`<section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src="${album.imageUrl}" alt="example1" />
      </div>
      <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
        <p>
          <strong>Album name:</strong><span id="details-album">${album.album}</span>
        </p>
        <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

      <div id="action-buttons">
        ${isCreator(album._ownerId) ? html`<a href="/edit/:${album._id}" id="edit-btn">Edit</a>
        <a @click="${onDelete}" id="delete-btn">Delete</a>` : isLoged() ? html`<a @click="${onLike}" id="like-btn">Like</a>
        </div>` : nothing}`;    

      render(page, document.getElementById('main'));

      isUserLiked();
}

async function onDelete(event){
    event.preventDefault();

    if(window.confirm('Do you really want to delete this post?')){
        await del(`/data/albums/${globalId}`, undefined, sessionStorage.getItem('accessToken'));
        page('/dashboard');
    }
}

async function onLike(event){
    event.preventDefault();

    let albumId = globalId;
    let data = await post('/data/likes', {albumId}, sessionStorage.getItem('accessToken'));

    page(`/details/:${globalId}`);
}

async function isUserLiked(){
    let albumId = globalId;
    let userApplications = await get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${sessionStorage.getItem('currUserId')}%22&count`)

    if(!isLoged()){
        return;
    }
    if(userApplications === 0){
        document.getElementById('like-btn').style.display = 'block';
        return;
    }
    document.getElementById('like-btn').style.display = 'none';
}
export {viewDetails};