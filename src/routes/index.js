const express = require('express');
const router = express.Router();

const dash = require('../controllers/dashboard');
const tech = require('../controllers/technology');
const util = require('../controllers/utility');

// dashboard
router.get('/', (req, res) => res.render('index'));
router.get('/nuevo', dash.formsview);
router.get('/utilidades', dash.utilitiesview);

// technology 
router.post('/new-tech', tech.save);

// utility
router.post('/new-util', util.save);

module.exports = router;