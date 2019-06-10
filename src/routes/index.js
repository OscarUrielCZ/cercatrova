const express = require('express');

const Note = require('../models/Note');

const router = express.Router();

router.get('/', (req, res) => {
	return res.render('index', { title : 'Dashboard' });
});

router.get('/create-note', (req, res) => {
	return res.render('notes-form', {
		title: 'Nueva nota',
		scripts: ['notes-form.js']
	});
});

router.post('/create-note', async(req, res) => {
	
	
	let note = new Note({
		title: req.body.title,
		category: req.body.category,
		description: req.body.description,
		type: 'note',
		available: true,
		date: new Date(),
		deadline: null
	});

	try {
		let noteDB = await note.save();
		return res.json({
			ok: true,
			note: noteDB
		});
	} catch(err) {
		return res.status(400).json({
			ok: false,
			err
		});
	}
});

module.exports = router;