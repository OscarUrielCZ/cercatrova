const mongoose = require('mongoose');

const app = require('./config/server');

mongoose.connect(app.get('urlDB'), { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log('Succesful connection to database'))
	.catch(err => console.log(err));
	
app.listen(app.get('port'), () => {
	console.log(`Server on port ${ app.get('port') }`);
});