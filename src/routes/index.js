const express = require('express');
const router = express.Router();
const front = require('../controllers/front');
const back = require('../controllers/back')

router.get('/', (req, res) => {
	return res.render('index', { title: 'Home' });
});
router.get('/notas', front.showNotes);
router.get('/create-note', front.createNote);
router.get('/note/:id', front.showOneNote);
router.get('/modify-note/:id', front.editNote);
router.post('/create-note', back.createNote);
router.put('/note/:id', back.editNote);
router.delete('/note/:id', back.deleteNote);

module.exports = router;