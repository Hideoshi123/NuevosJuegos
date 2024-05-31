const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    codigo: {
        type: String,
        unique: true,
        required: true
    },
    farmacia: {
        type: Schema.ObjectId,
        ref: 'Farmacias',
        required: true
    },
    mercancia: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }]
});
module.exports = mongoose.model('Stocks', stockSchema);