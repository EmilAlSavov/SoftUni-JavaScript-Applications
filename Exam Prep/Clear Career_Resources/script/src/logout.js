import {page} from "../lib.js";
import { get } from "../request.js";

async function viewLogout(){
    await get('/users/logout', undefined, sessionStorage.getItem('accessToken'));

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('currUserId');
    page('/dashboard');
}

export {viewLogout};