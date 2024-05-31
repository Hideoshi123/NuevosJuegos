const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const laboratorioSchema = new Schema({
    codigo: {
        type: String,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String, 
        required: true
    },
    telefono: String,
    farmaceutico:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Laboratorios', laboratorioSchema);