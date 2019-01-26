const express = require('express');
const router = express.Router();

const dash = require('../controllers/dashboard');

// dashboard
router.get('/', (req, res) => res.render('index'));
router.get('/nuevo', dash.formsview);

// ecosystem 
router.post('/nuevo-ecosistema', (req, res) => res.json(req.body));

module.exports = router;