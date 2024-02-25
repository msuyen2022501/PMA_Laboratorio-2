const { Schema, model } = require('mongoose');

const MascotaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    especie: {
        type: String,
        required: true
    },
    descripcion: String,
    adoptada: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Mascota', MascotaSchema);
