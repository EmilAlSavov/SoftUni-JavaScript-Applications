import { post } from "../request.js";
import { render } from "../view.js";
import { onDashboard, renderAnimals } from "./dashboard.js";
import page from 'https://unpkg.com/page/page.mjs';

let viewCreate = function() {render('createPage', 'grid')};

let createBtn = document.getElementById('createPage').getElementsByTagName('button')[0];
createBtn.addEventListener('click', onCreate);

async function onCreate(event){
    event.preventDefault();

    let accessToken = sessionStorage.getItem('accessToken');
    let name = document.getElementById('name').value;
    let breed = document.getElementById('breed').value;
    let age = document.getElementById('age').value;
    let weight = document.getElementById('weight').value;
    let image = document.getElementById('image').value;


    await post('/data/pets', {name, breed, age, weight, image}, accessToken);


    page.redirect('/');
}

export {viewCreate};