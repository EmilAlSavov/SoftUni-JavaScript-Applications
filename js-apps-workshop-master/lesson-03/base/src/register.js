start()

function start(){
    let form = document.getElementsByTagName('form')[0];
    form.addEventListener('submit', register)
}

async function register(event){
    event.preventDefault();

    let myData = new FormData(event.target);
    let {email, password, repassword} = Object.fromEntries(myData.entries());

    let response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: {'Content-Type': 'Aplication/json'},
        body: JSON.stringify({email, password})
    });

    let responseData = await response.json();

    console.log(responseData);
    debugger;
    let token = responseData.accessToken;
    sessionStorage.setItem('accToken', token);
    window.location.replace("http://127.0.0.1:5500/js-apps-workshop-master/lesson-03/base/index.html");
}