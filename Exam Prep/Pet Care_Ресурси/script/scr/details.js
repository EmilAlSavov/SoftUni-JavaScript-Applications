import { del, get } from "../request.js";
import { isCreator, isLoged, render } from "../view.js";
import { viewDelete } from "./delete.js";

async function viewDitails(ctx){
    let id = ctx.params.id;
    id = id.replace(':', '');

    let animal = await get('/data/pets/' + id)

    render('detailsPage', 'grid');

    const bonusHtml = `<!--(Bonus Part) Only for no creator and user-->
    <a href="#" class="donate">Donate</a>`;

    let page = ``;
    if(isLoged() && isCreator(animal._ownerId)){
        page = `
    <div class="details">
        <div class="animalPic">
            <img src="${animal.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${animal.name}</h1>
                <h3>Breed: ${animal.breed}</h3>
                <h4>Age: ${animal.age} years</h4>
                <h4>Weight: ${animal.weight}kg</h4>
                <h4 class="donation">Donation: 0$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->
            <div class="actionBtn">
                <!-- Only for registered user and creator of the pets-->
                <a href="/edit/:${animal._id}" class="edit">Edit</a>
                <a id="deleteBtn" href="/delete/:${animal._id}" class="remove">Delete</a>
                
            </div>
        </div>
    </div>`;

    
    } else {
        page = `
    <div class="details">
        <div class="animalPic">
            <img src="${animal.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${animal.name}</h1>
                <h3>Breed: ${animal.breed}</h3>
                <h4>Age: ${animal.age} years</h4>
                <h4>Weight: ${animal.weight}kg</h4>
                <h4 class="donation">Donation: 0$</h4>
            </div>
                
            </div>
        </div>
    </div>`;
    }
    

    let detailsPage = document.getElementById('detailsPage');

    detailsPage.innerHTML = page;

    if(isCreator(animal._ownerId)){
        let delBtn = document.getElementById('deleteBtn');
        delBtn._id = animal._id;
        delBtn.addEventListener('click', viewDelete);
    }


}

export {viewDitails};