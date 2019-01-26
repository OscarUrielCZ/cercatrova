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
            ecoResult.className = 'alert-danger'
            ecoResult.innerHTML = 'El nombre y la imágen son necesarios';
        } else if (file.files[0].type.indexOf('image') == -1) {
            ecoResult.className = 'alert-danger'
            ecoResult.innerHTML = 'La imágen no es válida';
        } else {
            let image = file.files[0];
            let data = {
                name: ecoName.value,
                image: image
            };

            fetch('http://localhost:3000/nuevo-ecosistema', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            ecoResult.className = 'alert-success'
            ecoResult.innerHTML = 'Bien hecho';
        }

        ecoResult.style.display = 'block';
    });
});