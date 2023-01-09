import { get } from "../request.js";
import {page} from "../lib.js"

async function viewLogout(){
    await get('/users/logout', undefined, sessionStorage.getItem('accessToken'));

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('currUserId');

    page('/dashboard');
}

export {viewLogout};