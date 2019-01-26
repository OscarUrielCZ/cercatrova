const mongoose = require('mongoose');

const { db } = require('./keys');

mongoose.connect(db.URI, { useNewUrlParser: true })
    .then(() => {
        const app = require('./config/server');

        app.listen(app.get('port'), () => {
            console.log(`Server on port ${ app.get('port') }`);
            console.log('Succesful connection to database');
        });
    })
    .catch(err => console.log(err));