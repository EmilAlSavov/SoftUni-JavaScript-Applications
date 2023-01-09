export { default as page } from '../node_modules/page/page.mjs';
export { html, render, nothing } from '../node_modules/lit-html/lit-html.js';

export function authLogNReg(email, pass, repass){
    if(repass === undefined){
        if(email === '' || pass === ''){
            window.alert('Fill all empty fields!');
            return false;
        } else{
            return true;
        }
    } else {
        if(email === '' || pass === '' || repass === ''){
            window.alert('Fill all empty fields!');
            return false;
        } else {
            if(pass !== repass){
                window.alert("Passwords don't match!");
                return false;
            }
            return true;
        }
    }
}

export function isLoged(){
    if(sessionStorage.getItem('accessToken') === 'undefined'){
        return false;
    }

    if(sessionStorage.length > 1){
        return true;
    }else{

        return false;
    }

}

export function isCreator(albumCreator){
    let currUserId = sessionStorage.getItem('currUserId');

    if(isLoged()){
        if(albumCreator === currUserId){
            return true;
        } else{
            return false;
        }
    } else {
        return false;
    }
}


export function checkIfEverythingIsFilled(fields){
    for (const field of fields) {
        if(field === ''){
            return false;
        }
    }
    return true;
}

export function getAllElementsFromForm(elements){
    let res = {};
    for (const element of elements) {
        res[element.name] = element.value;
    }
    return res;
}