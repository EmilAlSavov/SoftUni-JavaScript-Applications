import { checkIfEverythingIsFilled, getAllElementsFromForm, html, render, page } from "../lib.js";
import { post } from "../request.js";

function viewCreate(){
    let page = html`<section id="create">
    <div class="form">
      <h2>Add Album</h2>
      <form @submit="${onCreate}" class="create-form">
        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
        <input type="text" name="release" id="album-release" placeholder="Release date" />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>`;

  render(page, document.getElementById('main'));
}

async function onCreate(event){
    event.preventDefault();
    let elements = event.target.elements;

    let {singer, album, imageUrl, release, label, sales} = getAllElementsFromForm(elements);

    if(!checkIfEverythingIsFilled([singer, album, imageUrl, release, label, sales])){
        window.alert('fill all empty fields!');
        return;
    }
    
    await post('/data/albums', {singer, album, imageUrl, release, label, sales}, sessionStorage.getItem('accessToken'));

    page('/dashboard');
}

export {viewCreate};