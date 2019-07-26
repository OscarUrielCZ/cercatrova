document.addEventListener('DOMContentLoaded', function() {
	let id = getNoteId();
	document.getElementById('save-btn').addEventListener('click', function() {
		let title = document.getElementById('title').value;
		let category = document.getElementById('category').value;
		let description = document.getElementById('description').value;

		let data = JSON.stringify({
			title,
			category,
			description
		});

		fetch(`/note/${id}`, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT',
				body: data
			})
			.then(resp => location.href = `/note/${id}`)
			.catch(err => console.log(err));
	});
});

const getNoteId = () => {
	let tags = location.pathname.split('/');
	return tags[tags.length - 1];
};