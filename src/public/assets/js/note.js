document.addEventListener('DOMContentLoaded', function() {
	let id = getNoteId();
	// let update = document.getElementById('update-btn');
	document.getElementById('delete-btn').addEventListener('click', function(e) {
		e.preventDefault();

		if(confirm('¿Seguro que quieres borrar esta nota?')) {
			fetch(`/note/${id}`, {
					method: 'DELETE'
				})
				.then(res => res.json())
				.then(res => {
					location.href = '/';
				})
				.catch(err => console.log(err));
		}
	});
});

const getNoteId = () => {
	let tags = location.pathname.split('/');
	return tags[tags.length - 1];
};