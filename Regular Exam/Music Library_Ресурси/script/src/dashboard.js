import { html, render } from "../lib.js";
import { get } from "../request.js";

async function viewDashboard(){

    let albums = await get('/data/albums?sortBy=_createdOn%20desc');

    let res = [];

    for (let album of albums) {
        album = html`<li class="card">
        <img src="${album.imageUrl}" alt="travis" />
        <p>
          <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
        </p>
        <p>
          <strong>Album name: </strong><span class="album">${album.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
        <a class="details-btn" href="/details/:${album._id}">Details</a>
      </li>`;

      res.push(album);
    }

    if(res.length === 0 ){
        let noAlbums = html`<h2>There are no albums added yet.</h2>`;
        res.push(noAlbums)
    }
    let page = html`<section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
      <!-- Display a li with information about every post (if any)-->
      ${res}
    </ul>
  </section>`;

  

  render(page, document.getElementById('main'));
}

export {viewDashboard};