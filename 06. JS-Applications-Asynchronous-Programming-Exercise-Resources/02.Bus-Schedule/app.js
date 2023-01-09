function solve() {
    let stopId = 'depot';
    let stopName = '';
    function depart() {
        
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopId}`)
        .then(response => {if(!response.ok){throw new Error()} return response.json();})
        .then(processData)
        .catch(()=>{document.getElementById('info').getElementsByClassName('info')[0].innerText = `Error`; document.getElementById('depart').setAttribute('disabled', true); document.getElementById('arrive').setAttribute('disabled', true);})

        function processData(data){
            console.log(data);
            stopId = data.next;
            stopName = data.name;
            document.getElementById('info').getElementsByClassName('info')[0].innerText = `Next stop ${data.name}`
        }

        document.getElementById('depart').setAttribute('disabled', true);
        document.getElementById('arrive').removeAttribute('disabled');
    }

    function arrive() {
        document.getElementById('info').getElementsByClassName('info')[0].innerText = `Arriving at ${stopName}`

        document.getElementById('arrive').setAttribute('disabled', true);
        document.getElementById('depart').removeAttribute('disabled');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();