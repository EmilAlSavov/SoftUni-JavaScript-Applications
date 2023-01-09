export { default as page } from '../node_modules/page/page.mjs';
export { html, render, nothing } from '../node_modules/lit-html/lit-html.js';

export function getAlbumContent(elements){
    let name = elements['name'].value;
    let imgUrl = elements['imgUrl'].value;
    let price = elements['price'].value;
    let releaseDate = elements['releaseDate'].value;
    let artist = elements['artist'].value;
    let genre = elements['genre'].value;
    let description = elements['description'].value;

    return {name, imgUrl, price, releaseDate, artist ,genre, description};
}

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

export function checkIfEverythingIsFilled(fields){
    for (const field of fields) {
        if(field === ''){
            return false;
        }
    }
    return true;
}