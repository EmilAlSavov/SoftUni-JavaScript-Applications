import { html, render } from "../lib.js";
import { get } from "../request.js";

async function viewDashboard(){
    let jobs = await get('/data/offers?sortBy=_createdOn%20desc');
    let result = [];

    for (let job of jobs) {
        job = html`<div class="offer">
        <img src="${job.imageUrl}" alt="./images/example3.png" />
        <p>
          <strong>Title: </strong
          ><span class="title">${job.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${job.salary}</span></p>
        <a class="details-btn" href="/details/:${job._id}">Details</a>
      </div>`;

      result.push(job);
    }

    if(result.length === 0){
        let noJobs = html`<h2>No offers yet.</h2>`;
        result.push(noJobs);
    }

    let page = html`<section id="dashboard">
    <h2>Job Offers</h2>

    <!-- Display a div with information about every post (if any)-->
    <div>${result}</div>
  </section>`;

  render(page, document.getElementById('main'));
}

export {viewDashboard};