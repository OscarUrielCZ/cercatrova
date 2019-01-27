const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ecoSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre del ecosistema es requerido']
    },
    image: {
        type: String,
        unique: true,
        required: [true, 'La imágen del ecosistema es requerida']
    }
});

ecoSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });

module.exports = model('Ecosystem', ecoSchema);