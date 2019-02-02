"use strict";

window.addEventListener('load', function() {
    let file = document.getElementById('tech-img');
    let newTech = document.getElementById('new-tech');
    let techResult = document.getElementById('tech-result');
    let techName = document.getElementById('tech-name');

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

    newTech.addEventListener('click', function() {
        if (!techName.value || !file.files || !file.files[0]) {
            techResult.className = 'alert alert-danger'
            techResult.innerHTML = 'El nombre y la imágen son necesarios';
        } else if (file.files[0].type.indexOf('image') == -1) {
            techResult.className = 'alert alert-danger'
            techResult.innerHTML = 'La imágen no es válida';
        } else {
            let image = file.files[0];
            let formData = new FormData();

            formData.append('name', techName.value.toLowerCase());
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

                        techResult.className = 'alert alert-success'
                        techResult.innerHTML = info;
                    } else {
                        techResult.className = 'alert alert-success'
                        techResult.innerHTML = `Guardado correctamente: ${ resp.name }`;
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
});