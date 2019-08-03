document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('submit').addEventListener('click', function(e) {
		e.preventDefault();
		let form = document.getElementById('form');
		let title = document.getElementById('title').value;
		let category = document.getElementById('category').value;
		let description = document.getElementById('description').value;
		
		if(form.checkValidity()) {
			let data = JSON.stringify({
				title,
				category,
				description
			});

			fetch('/create-note', {
					headers: {
						'Content-Type': 'application/json' 
					},
					method: 'POST',
					body: data
				})
				.then(resp => resp.json())
				.then(resp => {
					form.reset();
					createNotification('Exito', `La nota ${resp.note.title} fue creada`);
				})
				.catch(err => {
					console.log(err);
					createNotification('Error', 'Algo salió mal, intenta de nuevo');
				});
		}
	});
});

/*
		
*/

createNotification = (title, text) => {
	let toast = document.createElement('div');
	let toastHeader = document.createElement('div');
	let toastBody = document.createElement('div');
	let strong = document.createElement('strong');
	let ago = document.createElement('small');
	let x = document.createElement('button');
	let times = document.createElement('span');

	toast.setAttribute('class', 'toast');
	toast.setAttribute('role', 'alert');
	toast.setAttribute('aria-live', 'assertive');
	toast.setAttribute('aria-atomic', 'true');
	toast.setAttribute('data-autohide', 'false');

	toastHeader.setAttribute('class', 'toast-header');

	strong.setAttribute('class', 'mr-auto');
	strong.innerHTML = title;
	ago.innerHTML = 'hace un momento';
	x.setAttribute('type', 'button');
	x.setAttribute('class', 'ml-2 mb-1 close');
	x.setAttribute('data-dismiss', 'toast');
	x.setAttribute('aria-label', 'Close');
	times.setAttribute('aria-hidden', 'true');
	times.innerHTML = '&times;';

	toastBody.setAttribute('class', 'toast-body');
	toastBody.innerHTML = text;

	x.appendChild(times);	
	toastHeader.appendChild(strong);
	toastHeader.appendChild(ago);
	toastHeader.appendChild(x);
	toast.appendChild(toastHeader);
	toast.appendChild(toastBody);

	document.querySelector('.notifications').appendChild(toast);
	$('.toast').toast('show');
};