import { del } from "../request.js";
import page from 'https://unpkg.com/page/page.mjs';

async function viewDelete(event){
    event.preventDefault();

    window.alert('Do you want to delete your post?');

    let id = event.target._id;

    let accessToken = sessionStorage.getItem('accessToken');
    await del('/data/pets/' + id, undefined, accessToken);

    page('/');
}

export {viewDelete};