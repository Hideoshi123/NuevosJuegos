const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ciudadSchema = new Schema({
    nombre : {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Ciudades', ciudadSchema);