const Note = require('../models/Note');	

module.exports = {
	async showNotes(req, res) {
		let notesDB = await Note.find({ available: true });

		return res.render('notes', {
			title :'Todas las notas',
			notes: notesDB,
			scripts: ['main.js']
		});
	},
	createNote(req, res) {
		return res.render('notes-form', {
			title: 'Nueva nota',
			scripts: ['notes-form.js']
		});
	},
	async showOneNote(req, res) {
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
			note,
			scripts: ['note.js']
		});
	},
	async editNote(req, res) {
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
	}
}