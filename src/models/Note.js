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
	type: {
		type: String,
		values: ['recorder', 'note'],
		required: [true, 'The type is required']
	},
	available: {
		type: Boolean,
		default: true,
		required: [true, 'The state is required']
	},
	date: {
		type: Date,
		required: [true, 'The date is required']
	},
	deadline: {
		type: Date
	}
});

module.exports = model('Note', NoteSchema);