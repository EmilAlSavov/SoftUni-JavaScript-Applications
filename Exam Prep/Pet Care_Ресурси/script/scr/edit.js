import { get, put } from "../request.js";
import { render } from "../view.js";
import page from 'https://unpkg.com/page/page.mjs';

async function viewEdit(ctx){
    let id = ctx.params.id;
    id = id.replace(':', '');

    render('editPage', 'grid');

    let currAnimal = await get('/data/pets/' + id);

    let form = document.getElementsByClassName('editForm')[0];
    form._id = id;
    let elements = document.getElementsByClassName('editForm')[0].elements;
    let image = document.getElementById('editPage').getElementsByTagName('img')[0];

    image.src = currAnimal.image;
    elements['name'].value = currAnimal.name;
    elements['breed'].value = currAnimal.breed;
    elements['age'].value = currAnimal.age;
    elements['weight'].value = currAnimal.weight;
    elements['image'].value = currAnimal.image;

    form.addEventListener('submit', putEdit)
}

async function putEdit(event){
    event.preventDefault();
    let id = event.target._id;

    let form = document.getElementsByClassName('editForm')[0];
    let elements = form.elements;
    let name = elements['name'].value;
    let breed = elements['breed'].value;
    let age = elements['age'].value;
    let weight = elements['weight'].value;
    let image = elements['image'].value;

    let accessToken = sessionStorage.getItem('accessToken');

    await put('/data/pets/' + id, {name, breed, age, weight, image}, accessToken)

    page(`/details/:${id}`);
}

export{viewEdit};