init();

function init(){
    fetch('http://localhost:3030/jsonstore/cookbook/recipes')
    .then((result) => result.json())
    .then(loadPosts)
}

function loadPosts(posts){
    posts = Object.values(posts);

    let main = document.getElementsByTagName('main')[0]
    main.innerHTML = '';

    let articles = [];
    
    for (const post of posts) {

        let article = document.createElement('article');
        article.classList.add('preview');

        let titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        let h2 = document.createElement('h2');
        h2.innerText = post.name;
        titleDiv.appendChild(h2);
        article.appendChild(titleDiv);

        let smallDiv = document.createElement('div');
        smallDiv.classList.add('small');
        let img = document.createElement('img');
        img.src = post.img;
        smallDiv.appendChild(img);
        article.appendChild(smallDiv);
        
        article.id = post._id
        article.addEventListener('click', getFullContent);

        articles.push(article);

        main.appendChild(article);
    }
    
}

async function getFullContent(event){
    let article = null;
    let id = '';
    if(event.target.tagName.toLowerCase() !== 'article' &&  event.target.tagName.toLowerCase() !== 'div'){
        article = event.target.parentNode.parentNode;
        id = event.target.parentNode.parentNode.id;
    } else if(event.target.tagName.toLowerCase() === 'div') {
        article = event.target.parentNode;
        id = event.target.parentNode.id;
    } else {
        article = event.target;
        id = event.target.id;
    }
    

    let res = await fetch('http://localhost:3030/jsonstore/cookbook/details/' + id);
    let content = await res.json();

    article.removeAttribute('class');
    article.innerHTML = '';

    let h2 = document.createElement('h2');
    h2.innerText = content.name;
    article.appendChild(h2);

    let bandDiv = document.createElement('div');
    bandDiv.classList.add('band');

    

    let thumbDiv = document.createElement('div');
    thumbDiv.classList.add('thumb');

    let img = document.createElement('img');
    img.src = content.img;

    thumbDiv.appendChild(img);
    bandDiv.appendChild(thumbDiv);

    let ingredientDiv = document.createElement('div');
    ingredientDiv.classList.add('ingredients');
    let h3 = document.createElement('h3');
    h3.innerText = 'Ingredients:';
    ingredientDiv.appendChild(h3);

    let ul = document.createElement('ul');

    for (const ingredient of content.ingredients) {
        let li = document.createElement('li');
        li.innerText = ingredient;
        ul.appendChild(li);
    }
    ingredientDiv.appendChild(ul);
    bandDiv.appendChild(ingredientDiv);

    article.appendChild(bandDiv);

    let descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');

    let h4 = document.createElement('h3');
    h4.innerText = 'Preparation:';

    descriptionDiv.appendChild(h4);

    for (const item of content.steps) {
        let p = document.createElement('p');
        p.innerText = item;

        descriptionDiv.appendChild(p);
    }

    article.appendChild(descriptionDiv);

    article.removeEventListener('click', getFullContent);
    article.addEventListener('click', init, true);
}