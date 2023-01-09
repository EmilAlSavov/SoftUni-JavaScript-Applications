import { checkIfEverythingIsFilled, getAllElementsFromForm, html, render, page } from "../lib.js";
import { get, put } from "../request.js";

let globalId = '';
async function viewEdit(ctx){
    let id = ctx.params.id;
    id = id.replace(':', '');
    globalId = id;

    let album = await get(`/data/albums/${id}`);

    let page = html`<section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form @submit="${onEdit}" class="edit-form">
        <input .value="${album.singer}" type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
        <input .value="${album.album}" type="text" name="album" id="album-album" placeholder="Album" />
        <input .value="${album.imageUrl}" type="text" name="imageUrl" id="album-img" placeholder="Image url" />
        <input .value="${album.release}" type="text" name="release" id="album-release" placeholder="Release date" />
        <input .value="${album.label}" type="text" name="label" id="album-label" placeholder="Label" />
        <input .value="${album.sales}" type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>`;

  render(page, document.getElementById('main'));
}

async function onEdit(event){
    event.preventDefault();
    let elements = event.target.elements;

    let {singer, album, imageUrl, release, label, sales} = getAllElementsFromForm(elements);

    if(!checkIfEverythingIsFilled([singer, album, imageUrl, release, label, sales])){
        window.alert('fill all empty fields!');
        return;
    }

    await put(`/data/albums/${globalId}`, {singer, album, imageUrl, release, label, sales}, sessionStorage.getItem('accessToken'));

    page(`/details/:${globalId}`)
}

export {viewEdit};