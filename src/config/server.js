const path = require('path');

const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const multer = require('multer');

const app = express();
const indexRoutes = require('../routes/index');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(app.get('views'), 'partials'));
require('./helpers');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(multer({ dest: path.join(__dirname, '../public/uploads') }).single('image'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use('/', indexRoutes);

module.exports = app;