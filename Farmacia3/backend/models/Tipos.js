const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipoSchema = new Schema({
    nombre : {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Tipos', tipoSchema);