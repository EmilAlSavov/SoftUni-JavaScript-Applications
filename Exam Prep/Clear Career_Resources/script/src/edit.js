import {page, html, render, checkIfEverythingIsFilled} from "../lib.js";
import { get, put } from "../request.js";

let globalId = '';
async function viewEdit(ctx){
    let id = ctx.params.id;
    id = id.replace(':', '');
    globalId = id;
    
    let job = await get(`/data/offers/${id}`)
    console.log(job);
    let page = html`<section id="edit">
    <div @submit="${onEdit}" class="form">
      <h2>Edit Offer</h2>
      <form class="edit-form">
        <input
          type="text"
          name="title"
          id="job-title"
          placeholder="Title"
          .value="${job.title}"
        />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
          .value="${job.imageUrl}"
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
          .value="${job.category}"
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
          .value="${job.description}"
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
          .value="${job.requirements}"
        ></textarea>
        <input
          type="text"
          name="salary"
          id="job-salary"
          placeholder="Salary"
          .value="${job.salary}"
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>`

  render(page, document.getElementById('main'));
}

async function onEdit(event){
    event.preventDefault()
    let form = event.target;
    let elements = form.elements;

    let title = elements['title'].value;
    let imageUrl = elements['imageUrl'].value;
    let category = elements['category'].value;
    let description = elements['description'].value;
    let requirements = elements['requirements'].value;
    let salary = elements['salary'].value;

    if(!checkIfEverythingIsFilled([title, imageUrl, category, description, requirements, salary])){
        window.alert('fill all empty fields!');
        return;
    }

    await put(`/data/offers/${globalId}`, {title, imageUrl, category, description, requirements, salary}, sessionStorage.getItem('accessToken'));
    page(`/details/:${globalId}`);
}

export {viewEdit};