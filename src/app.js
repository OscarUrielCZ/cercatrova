const mongoose = require('mongoose');

const app = require('./config/server');

mongoose.connect(app.get('urlDB'), { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        app.listen(app.get('port'), () => {
            console.log(`Server on port ${ app.get('port') }`);
            console.log('Succesful connection to database');
        });
    })
    .catch(err => console.log(err));