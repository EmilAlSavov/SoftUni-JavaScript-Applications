import { html, render, page } from "../lib.js";
import { get } from "../request.js";

async function viewLogout(){
    let accessToken = sessionStorage.getItem('accessToken');
    await get('/users/logout', undefined, accessToken);

    sessionStorage.clear();

    page('/');
}

export {viewLogout};