import {checkIfEverythingIsFilled, html, render, page} from "../lib.js"
import { post } from "../request.js";

function viewCreate(){
    let page = html`<section id="create">
    <div class="form">
      <h2>Create Offer</h2>
      <form @submit="${onCreate}" class="create-form">
        <input
          type="text"
          name="title"
          id="job-title"
          placeholder="Title"
        />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        ></textarea>
        <input
          type="text"
          name="salary"
          id="job-salary"
          placeholder="Salary"
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>`;

  render(page, document.getElementById('main'));
}

async function onCreate(event){
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

    await post('/data/offers', {title, imageUrl, category, description, requirements, salary}, sessionStorage.getItem('accessToken'));
    page('/dashboard');
}

export {viewCreate};