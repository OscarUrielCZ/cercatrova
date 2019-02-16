const { Schema, model } = require('mongoose');

const utilSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es necesario']
    },
    desc: { type: String },
    technology: {
        type: String,
        required: [true, 'La tecnología es necesaria']
    },
    file: { type: String }
});

module.exports = model('Utility', utilSchema);