function ApiConsume(){
    let goButton = document.getElementById("go");
    goButton.textContent = 'Cargando tu deck...';
    var xhr = new XMLHttpRequest();
    xhr.onload = exito;
    xhr.onerror = error;
    xhr.open('GET', 'https://db.ygoprodeck.com/api/v7/cardinfo.php');
    xhr.send();
}

function exito() {
    let goButton = document.getElementById("go");

    var datos = JSON.parse(this.responseText);
    console.log(datos);

    let shuffled = datos.data
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    let newGrid = document.getElementById("newGrid");

    shuffled.forEach((el, index)=>{
        if(index < 42){
            newGrid.innerHTML += ` <div class="col">
                    <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-size: cover; background-repeat: no-repeat; background: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('${el.card_images[0].image_url}');">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h3 class="display-6 lh-1 fw-bold">${el.name}</h3>
                        <p>${el.desc}</p>
                        <ul class="d-flex list-unstyled mt-auto">
                        <li class="me-auto">
                            <img src="${el.card_images[0].image_url_small}" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                        </li>
                        <li class="d-flex align-items-center me-3">
                            <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#geo-fill"></use></svg>
                            <small>Id</small>
                        </li>
                        <li class="d-flex align-items-center">
                            <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#calendar3"></use></svg>
                            <small>${el.id}</small>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>`
        }
    });

    goButton.textContent = 'Listo';
    goButton.disabled = true;
}

function error(err) {
    console.log('Solicitud fallida', err);
}