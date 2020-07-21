const express = require('express');
const router = express.Router();
const front = require('../controllers/front');
const Note = require('../models/Note');

router.get('/', (req, res) => {
	return res.render('index', {
		title: 'Home'
	});
});

router.get('/notas', async(req, res) => {
	let notesDB = await Note.find({ available: true });

	return res.render('index', {
		title :'Dashboard',
		notes: notesDB,
		scripts: ['main.js']
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

	console.log(note.description);

	return res.render('note', {
		title: 'Nota',
		note,
		scripts: ['note.js']
	});
});

router.get('/modify-note/:id', async(req, res) => {
	let id = req.params.id;
	let note;

	try {
		note = await Note.findById(id);
	} catch {
		return res.render('url-not-found', {
			title: '¡Oh oh!',
			message: `La nota con id ${ id } no existe`
		});
	}

	return res.render('modify-note', {
		title: 'Modificar nota',
		note,
		scripts: ['modify-note.js']
	});
});

router.put('/note/:id', async(req, res) => {
	let id = req.params.id;
	let body = req.body;
	let note;

	try {
		note = await Note.findById(id);
	} catch(err) {
		return res.status(500).json({
			ok: false,
			err
		})
	}

	note.title = body.title;
	note.category = body.category;
	note.description = body.description;

	await Note.findByIdAndUpdate(id, note);

	return res.json({
		ok: true,
		message: 'Note updated successfully'
	});
});

router.delete('/note/:id', async(req, res) => {
	let id = req.params.id;
	let note;

	try {
		note =  await Note.findById(id);
	} catch {
		return res.status(502).json({
			ok: false,
			masssage: 'The note doesnt exist'
		});
	}
	
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