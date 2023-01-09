import { html, render, nothing, isCreator, isLoged, page} from "../lib.js";
import { del, get, post } from "../request.js";

let globalId = '';
async function viewDetails(ctx){
    let id = ctx.params.id;
    id = id.replace(':', '');
    globalId = id;

    let job  = await get(`/data/offers/${id}`)
    let albumId = id;
    let applications = await get(`/data/applications?where=offerId%3D%22${albumId}%22&distinct=_ownerId&count`)
    console.log(applications);
    
    let page  = html`<section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${job.imageUrl}" />
      <p id="details-title">${job.title}</p>
      <p id="details-category">
        Category: <span id="categories">${job.category}</span>
      </p>
      <p id="details-salary">
        Salary: <span id="salary-number">${job.salary}</span>
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Description</h4>
          <span
            >${job.description}</span
          >
        </div>
        <div id="details-requirements">
          <h4>Requirements</h4>
          <span
            >${job.requirements}</span
          >
        </div>
      </div>
      <p>Applications: <strong id="applications">${applications}</strong></p>
      <div id="action-buttons">
      ${ isCreator(job._ownerId) ? html`<a href="/edit/:${job._id}" id="edit-btn">Edit</a>
      <a @click="${onDelete}" id="delete-btn">Delete</a>`: isLoged() ? html`<!--Edit and Delete are only for creator-->
      <a @click="${onAplication}" id="apply-btn">Apply</a>` : nothing}
      </div>
    </div>
  </section>`;

  render(page, document.getElementById('main'));

  isUserAplyed();
}

async function onDelete(event){
    event.preventDefault();

    if(window.confirm('do you really want to delete this album?')){
        await del(`/data/offers/${globalId}`, undefined, sessionStorage.getItem('accessToken'));
        page('/dashboard');
    } else {
        return;
    }
}

async function onAplication(event){
    event.preventDefault();
    
    let albumId = globalId;
    let data = await post('/data/applications', {albumId}, sessionStorage.getItem('accessToken'));

    page(`/details/:${albumId}`);
    
}

async function isUserAplyed(){
    let albumId = globalId;
    let userApplications = await get(`/data/applications?where=offerId%3D%22${albumId}%22%20and%20_ownerId%3D%22${sessionStorage.getItem('currUserId')}%22&count`)

    if(!isLoged()){
        return;
    }
    if(userApplications === 0){
        document.getElementById('apply-btn').style.display = 'block';
        return;
    }
    document.getElementById('apply-btn').style.display = 'none';
}

export {viewDetails};