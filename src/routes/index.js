const express = require('express');

const Note = require('../models/Note');

const router = express.Router();

router.get('/', async(req, res) => {
	let notesDB = await Note.find({ available: true });

	return res.render('index', {
		title :'Dashboard',
		notes: notesDB
	});
});

router.get('/note/:id', async(req, res) => {
	let id = req.params.id;
	let note;

	try {
		note = await Note.findOne({ _id: id });
	} catch(err) {
		return res.render('url-not-found', {
			title: '¡Oh oh!',
			message: `La nota con id ${ id } no existe`
		});
	}

	return res.render('note', {
		title: 'Nota',
		note: note,
		scripts: ['note.js']
	});
});

router.delete('/note/:id', async(req, res) => {
	let id = req.params.id;
	let note =  await Note.findById(id);
	
	if(!note) return res.status(502).json({
		ok: false,
		masssage: 'The note doesnt exist'
	});

	note.available = false;
	await Note.findByIdAndUpdate(id, note);

	return res.json({
		ok: true,
		message: 'Note removed successfully'
	});
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
		available: true,
		date: new Date()
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