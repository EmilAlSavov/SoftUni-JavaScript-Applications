import { get } from "../request.js";
import { render } from "../view.js";
import { viewDitails } from "./details.js";
import page from 'https://unpkg.com/page/page.mjs';

function viewDashboard() {render('dashboard', 'inline'); onDashboard();};





async function onDashboard(){
    
    let animalDashboard = document.getElementsByClassName('animals-dashboard')[0];
    animalDashboard.innerHTML = `<div id="noPets">
    <p class="no-pets">No pets in dashboard</p>
</div>`;
    let noPetDiv = document.getElementById('noPets');
    noPetDiv.style.display = 'none';

    
    let animals = await get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
    
    for (const animal of animals) {
        
        renderAnimals(animal)
    }
    if(animalDashboard.childNodes.length <= 1){
        noPetDiv.style.display = 'flex';
    }
}

function renderAnimals(animal){

    let animalDashboard = document.getElementsByClassName('animals-dashboard')[0];

        animalDashboard.innerHTML += `<div class="animals-board" id="${animal._id}">
        <article class="service-img">
            <img class="animal-image-cover" src="${animal.image}">
        </article>
        <h2 class="name">${animal.name}</h2>
        <h3 class="breed">${animal.breed}</h3>
        <div class="action">
            <a class="btn" href="/details/:${animal._id}">Details</a>
        </div>
    </div>`
    
}

export {viewDashboard, renderAnimals, onDashboard};