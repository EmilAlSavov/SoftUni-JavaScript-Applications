import { get } from "../request.js";
import page from 'https://unpkg.com/page/page.mjs';

async function onLogout(){
    let accessToken = sessionStorage.getItem('accessToken');
    await get('/users/logout', undefined, accessToken);
    sessionStorage.clear();
    page.redirect('/');
};
export {onLogout};