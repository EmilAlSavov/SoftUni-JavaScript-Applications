function getInfo() {
    let busId = document.getElementById('stopId').value;
    fetch(`http://localhost:3030/jsonstore/bus/businfo/${busId}`)
    .then(respond => {if(!respond.ok){throw new Error()} return respond.json();})
    .then(processData)
    .catch(() => {document.getElementById('stopName').innerText = 'Error'; document.getElementById('stopName').innerText = 'Error'; document.getElementById('buses').replaceChildren('')})

    function processData(data){
        console.log(data);
        document.getElementById('stopName').innerText = data.name;
        let list = document.getElementById('buses');

        let items = [];
        for (const bus in data.buses) {
            if (Object.hasOwnProperty.call(data.buses, bus)) {
                const timeToArrive = data.buses[bus];
                let li = document.createElement('li');

                li.innerText = `Bus ${bus} arrives in ${timeToArrive} minutes`;
                items.push(li);
            }
        }

        list.replaceChildren(...items);
    }
}