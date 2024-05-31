const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
    dni: {
        type: String,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    telefono: String,
    salario: {
        type: Number,
        required: true
    },
    farmacia: {
        type: Schema.ObjectId,
        ref: 'Farmacias',
        required: true
    }
});

module.exports = mongoose.model('Empleados', empleadoSchema);