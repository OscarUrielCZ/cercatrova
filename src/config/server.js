const path = require('path');

const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');

const app = express();
const viewRoutes = require('../routes/front');
// const backRoutes = require('../routes/back');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if (process.env.NODE_ENV === 'dev') process.env.URLDB = 'mongodb://localhost:27017/cercatrova';
else process.env.URLDB = process.env.MLAB_URL;

app.set('urlDB', process.env.URLDB);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(app.get('views'), 'partials'));
require('./helpers');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/', viewRoutes);
// app.use('/api', backRoutes);

module.exports = app;