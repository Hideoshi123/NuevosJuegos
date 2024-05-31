const mongoose = require('mongoose');
const Laboratorio = mongoose.model('Laboratorios');
const Schema = mongoose.Schema;

const patenteSchema = new Schema({
    codigo: {
        type: String,
        unique: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    fechaFinal: {
        type: Date
    },
    laboratorio: {
        type: Schema.ObjectId,
        ref: 'Laboratorios',
        required: true
    }
});

patenteSchema.pre('save', async function(next) {
    // Verificar si hay una fecha de inicio y duración
    if (this.fechaInicio && this.duracion) {
        // Calcular la fecha final sumando la duración a la fecha de inicio
        this.fechaFinal = new Date(this.fechaInicio);
        this.fechaFinal.setDate(this.fechaFinal.getDate() + this.duracion);
    }

    // Verificar si se proporcionó un laboratorio y si es farmaceutico
    if (this.laboratorio) {
        const lab = await Laboratorio.findById(this.laboratorio);

        if (!lab || lab.farmaceutico !== true) {
            // El laboratorio no existe o no es farmaceutico
            throw new Error('El laboratorio debe ser farmaceutico');
        }
    }

    next();
});

module.exports = mongoose.model('Patentes', patenteSchema);