const { model, Schema } = require('mongoose');

const NoteSchema = new Schema({
	title: {
		type: String,
		required: [true, 'The title is required']
	},
	category: {
		type: String,
		required: [true, 'The category is required']
	},
	description: {
		type: String,
		required: [true, 'The description is required']
	},
	available: {
		type: Boolean,
		default: true,
		required: [true, 'The state is required']
	},
	date: {
		type: Date,
		required: [true, 'The date is required']
	}
});

module.exports = model('Note', NoteSchema);