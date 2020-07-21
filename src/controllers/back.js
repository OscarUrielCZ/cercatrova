const Note = require('../models/Note');

module.exports = {
	async createNote(req, res) {
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
	},
	async editNote(req, res) {
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
	},
	async deleteNote(req, res) {
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
	}
};