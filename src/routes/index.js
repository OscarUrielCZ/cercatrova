const express = require('express');
const router = express.Router();

const dash = require('../controllers/dashboard');
const ecosys = require('../controllers/ecosystem');

// dashboard
router.get('/', (req, res) => res.render('index'));
router.get('/nuevo', dash.formsview);

// ecosystem 
router.post('/nuevo-ecosistema', (req, res) => {
    console.log('Hola bro');
    console.log(req.body);
    res.json({
        message: 'recived'
    });
});

module.exports = router;