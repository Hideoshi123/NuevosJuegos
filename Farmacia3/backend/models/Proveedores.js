const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proveedorSchema = new Schema({
    codigo: {
        type: String,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true
    },
    telefono: {
        type: Number
    }
});
module.exports = mongoose.model('Proveedores', proveedorSchema);