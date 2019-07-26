deleteNote = function(id) {
	if(confirm('¿Seguro que quieres borrar esta nota?')) {
		fetch(`/note/${id}`, {
				method: 'DELETE'
			})
			.then(res => res.json())
			.then(res => {
				location.reload();
			})
			.catch(err => console.log(err));
	}
};