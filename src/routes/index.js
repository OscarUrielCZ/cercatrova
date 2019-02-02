const express = require('express');
const router = express.Router();

const dash = require('../controllers/dashboard');
const tech = require('../controllers/technology');

// dashboard
router.get('/', (req, res) => res.render('index'));
router.get('/nuevo', dash.formsview);

// technology 
router.post('/new-tech', tech.save);

module.exports = router;