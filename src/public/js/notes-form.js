document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('submit').addEventListener('click', function(e) {
		let form = document.getElementById('form');
		let title = document.getElementById('title').value;
		let category = document.getElementById('category').value;
		let description = document.getElementById('description').value;
		if(form.checkValidity()) {
			e.preventDefault();
			let data = JSON.stringify({
				title,
				category,
				description
			});

			fetch('create-note', {
					headers: {
						'Content-Type': 'application/json' 
					},
					method: 'POST',
					body: data
				})
				.then(resp => resp.json())
				.then(resp => {
					form.reset();
					createNotification('Note created successfully', 'Go back', '/', 'page-color');
				})
				.catch(err => {
					console.log(err);
					createNotification('Something went wrong', 'Go back', '/', 'page-red');
				});
		}
	});
});

createNotification = (text, linkText, link, bgColor) => {
	let div = document.createElement('div');
	let a = document.createElement('a')
	let textNode = document.createTextNode(text);
	let linkTextNode = document.createTextNode(linkText);

	a.href = link;
	a.className = 'link-notification';
	a.appendChild(linkTextNode);

	div.className = 'notification ' + bgColor;
	div.style = 'opacity: 0.7';
	div.appendChild(textNode);
	div.appendChild(a);

	document.querySelector('.container').prepend(div);
}