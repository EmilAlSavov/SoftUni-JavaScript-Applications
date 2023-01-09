let render = function(renderId, display) {
    
    loadCurrentPage(renderId, display);
    
    logDisplay();
}

function loadCurrentPage(renderId, display){
    let sections = document.getElementById('content').getElementsByTagName('section');
    for (const section of sections) {
        section.style.display = "none";
    }
    let currSection = document.getElementById(renderId);
    currSection.style.display = display;
}

function logDisplay(){

    let loged = isLoged();


    if(loged === true){
        let create = document.getElementsByTagName('nav')[0].getElementsByTagName('a')[4];
        let logout = document.getElementsByTagName('nav')[0].getElementsByTagName('a')[5];

        create.style.display = 'block';
        logout.style.display = 'block';

        let register = document.getElementsByTagName('nav')[0].getElementsByTagName('a')[3];
        let login = document.getElementsByTagName('nav')[0].getElementsByTagName('a')[2];
        register.style.display = 'none';
        login.style.display = 'none';
    } else{
        let register = document.getElementsByTagName('nav')[0].getElementsByTagName('a')[3];
        let login = document.getElementsByTagName('nav')[0].getElementsByTagName('a')[2];

        register.style.display = 'block';
        login.style.display = 'block';

        let create = document.getElementsByTagName('nav')[0].getElementsByTagName('a')[4];
        let logout = document.getElementsByTagName('nav')[0].getElementsByTagName('a')[5];

        create.style.display = 'none';
        logout.style.display = 'none';
    }
}

function isLoged(){
    let loged = false;
    if(sessionStorage.getItem('accessToken') !== null){
        loged = true;
    }
    return loged;
}

function isCreator(postCreatorId){
    let currUserId = sessionStorage.getItem('userId');
    if(postCreatorId === currUserId){
        return true;
    } else{
        return false;
    }
}

export {render, isLoged, isCreator};