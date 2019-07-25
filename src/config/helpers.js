const hbs = require('hbs');

hbs.registerHelper('toDate', text => {
	let date = new Date(text);
	return date.toDateString();
})