const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const techSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre de la tecnología es requerido']
    }
});

techSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });

module.exports = model('Technology', techSchema);