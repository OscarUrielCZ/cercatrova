const express = require('express');
const router = express.Router();

const dash = require('../controllers/dashboard');
const ecosys = require('../controllers/ecosystem');

// dashboard
router.get('/', (req, res) => res.render('index'));
router.get('/nuevo', dash.formsview);

// ecosystem 
router.post('/nuevo-ecosistema', ecosys.save);

module.exports = router;