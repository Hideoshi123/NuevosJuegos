const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmaciaSchema = new Schema({
    nit: {
        type: String,
        unique: true
    },
    nombre : {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true  
    },
    farmaceutico: String,
    ciudad: {
        type: Schema.ObjectId,
        ref: 'Ciudades',
        required: true
    }
});

module.exports = mongoose.model('Farmacias', farmaciaSchema);