const { Schema, model } = require('mongoose');

const utilSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es necesario']
    },
    desc: { type: String },
    tech: {
        type: String,
        required: [true, 'La tecnología es necesaria']
    },
});

module.exports = model('Utility', utilSchema);