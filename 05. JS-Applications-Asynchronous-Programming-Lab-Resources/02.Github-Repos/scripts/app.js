function loadRepos() {
	let user = document.getElementById('username').value;
	fetch(`https://www.instagram.com/emil._.savov`)
	.then(processResponse)
	.then(processData)
	.catch(processError)
}

function processResponse(response){
	console.log(response)
	if(!response.ok){
		throw new Error('Response failed!');
	}

	return response.json();
}

function processData(data){
	console.log(data);
	let list = document.getElementById('repos');
	let items = data.map(repository => {
				let li = document.createElement('li');
				let a = document.createElement('a');
				a.href = repository.html_url;
				a.textContent = repository.full_name;
				li.appendChild(a);
				
				return li;
			})

	list.replaceChildren(...items);
}

function processError(error){
	console.log(error);
}