"use strict";

window.addEventListener('load', function() {
    let file = document.getElementById('eco-img');
    let newEco = document.getElementById('new-eco');
    let ecoResult = document.getElementById('eco-result');
    let ecoName = document.getElementById('eco-name');

    file.addEventListener('change', function() {
        let previewCard = document.querySelector('.preview-card');

        if (file.files && file.files[0] && file.files[0].type.indexOf('image') != -1) {
            let preview = document.getElementById('preview');
            let image = file.files[0];
            let reader = new FileReader();

            reader.onload = function(e) {
                preview.src = e.target.result;
            };

            reader.readAsDataURL(image);
            previewCard.style.display = 'inline-block';
        } else {
            previewCard.style.display = 'none';
        }
    });

    newEco.addEventListener('click', function() {
        if (!ecoName.value || !file.files || !file.files[0]) {
            ecoResult.className = 'alert alert-danger'
            ecoResult.innerHTML = 'El nombre y la imágen son necesarios';
        } else if (file.files[0].type.indexOf('image') == -1) {
            ecoResult.className = 'alert alert-danger'
            ecoResult.innerHTML = 'La imágen no es válida';
        } else {
            let image = file.files[0];
            let form = document.getElementById('eco-form');
            let formData = new FormData();

            formData.append('name', ecoName.value.toLowerCase());
            formData.append('image', image, image.name);

            fetch('/new-tech', {
                    method: 'POST',
                    body: formData
                })
                .then(resp => resp.json())
                .then(resp => {
                    if (!resp.ok) {
                        let em = resp.message.errors.name;
                        let info = em.message.replace(em.path, em.value);

                        ecoResult.className = 'alert alert-success'
                        ecoResult.innerHTML = info;
                    } else {
                        ecoResult.className = 'alert alert-success'
                        ecoResult.innerHTML = `Guardado correctamente: ${ resp.name }`;
                    }
                })
                .catch(err => {
                    console.log(err);
                    ecoResult.className = 'alert alert-danger'
                    ecoResult.innerHTML = 'Algo salió mal';
                });
        }

        ecoResult.style.display = 'block';
    });
});