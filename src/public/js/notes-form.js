document.addEventListener('DOMContentLoaded', function() {
	let form, title, category, description, data;

	document.getElementById('submit').addEventListener('click', function(e) {
		form = document.getElementById('form');
		title = document.getElementById('title').value;
		category = document.getElementById('category').value;
		description = document.getElementById('description').value;

		if(form.checkValidity()) {
			e.preventDefault();
			data = new FormData();

			data.append('title', title);
			data.append('category', category);
			data.append('description', description);

			fetch('/create-note', {
					method: 'POST',
					body: data
				})
				.then(resp => resp.json())
				.then(resp => {
					console.log(resp);
				})
				.catch(err => {
					console.log(err);
				});
		}
	});
});