"use strict";

window.addEventListener('load', function() {
    let newTech = document.getElementById('new-tech');
    let newUtil = document.getElementById('new-util');

    let utilResult = document.getElementById('util-result');
    let techResult = document.getElementById('tech-result');

    newTech.addEventListener('click', function() {
        let techName = document.getElementById('tech-name').value;

        if (!techName) {
            techResult.className = 'alert alert-danger'
            techResult.innerHTML = 'El nombre es necesario';
        } else {
            let data = JSON.stringify({ name: techName });

            fetch('/new-tech', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: data
                })
                .then(resp => resp.json())
                .then(resp => {
                    if (!resp.ok) {
                        let em = resp.message.errors.name;
                        let info = em.message.replace(em.path, em.value);

                        techResult.className = 'alert alert-danger'
                        techResult.innerHTML = info;
                    } else {
                        techResult.className = 'alert alert-success'
                        techResult.innerHTML = `Guardado correctamente: ${ resp.technology.name }`;
                        location.reload();
                    }
                })
                .catch(err => {
                    console.log(err);
                    techResult.className = 'alert alert-danger'
                    techResult.innerHTML = 'Algo salió mal';
                });
        }

        techResult.style.display = 'block';
    });

    newUtil.addEventListener('click', function() {
        let title = document.getElementById('util-title').value;
        let desc = document.getElementById('util-desc').value;
        let technology = document.getElementById('util-technology').value;

        if (!title) {
            utilResult.className = 'alert alert-danger';
            utilResult.innerHTML = 'El titulo es necesario';
        } else if (!desc) {
            utilResult.className = 'alert alert-danger';
            utilResult.innerHTML = 'La descripción es necesaria';
        } else if (!technology) {
            utilResult.className = 'alert alert-danger';
            utilResult.innerHTML = 'La tecnología es necesaria';
        } else {
            let data = {
                title,
                desc,
                technology
            };
            data = JSON.stringify(data);

            fetch('/new-util', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: data
                })
                .then(data => data.json())
                .then(resp => {
                    if (!resp.ok) {
                        let em = resp.message.errors.name;
                        let info = em.message.replace(em.path, em.value);

                        utilResult.className = 'alert alert-danger'
                        utilResult.innerHTML = info;
                    } else {
                        utilResult.className = 'alert alert-success';
                        utilResult.innerHTML = `Se ha guardado correctamente ${ resp.utility.title }`;
                    }
                })
                .catch(err => {
                    console.log(err);
                    utilResult.className = 'alert alert-danger'
                    utilResult.innerHTML = 'Algo salió mal';
                });
        }

        utilResult.style.display = 'block';
    });
});