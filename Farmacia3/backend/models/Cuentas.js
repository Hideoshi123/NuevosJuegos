const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cuentaSchema = new Schema({
    nombre : {
        type: String,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['AdminFar', 'AdminPro'],
        required: true
    }
});

module.exports = mongoose.model('Cuentas', cuentaSchema);