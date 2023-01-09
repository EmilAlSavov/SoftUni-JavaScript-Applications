function loadRepos() {
   fetch(`https://api.github.com/users/testnakov/repos`)
      .then(processRepo)
      .then(processData)
      .catch()

   function processRepo(repo){
      if(!repo.ok){
         throw new Error('repo failed!')
      }

      console.log(repo);
      return repo.json();
   }

   function processData(data){
      let div = document.getElementById('res');

      for (const repo of data) {
         console.log(repo);
         div.innerText += JSON.stringify(repo);
      }
   }

   function processError(error){
       console.log(error);
   }
}