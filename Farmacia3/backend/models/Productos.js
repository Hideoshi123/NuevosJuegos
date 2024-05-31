const mongoose = require('mongoose');
const Tipo = mongoose.model('Tipos');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    codigo: {
        type: String,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: String,
    precio: {
        type: Number,
        required: true
    },
    proveedor: {
        type: Schema.ObjectId,
        ref: 'Proveedores',
        required: true
    },
    tipo: {
        type: Schema.ObjectId,
        ref: 'Tipos',
        required: true
    },
    tipoCosmetico: String,
    empresa: String,
    grupoTerapeutico: String,
    principioActivo: String,
    generico:{
        type: Boolean
    },
    laboratorio: {
        type: Schema.ObjectId,
        ref: 'Laboratorios'
    },
});

productoSchema.pre('save', async function (next) {
    try {
        const tipo = await Tipo.findById(this.tipo);

        if (tipo) {
            const tipoNombreLowerCase = tipo.nombre.toLowerCase();

            // Verificar condiciones según el tipo de producto y otras propiedades
            if (['medicamentos', 'medicamento'].includes(tipoNombreLowerCase) && !this.grupoTerapeutico && !this.principioActivo && this.generico === false && this.laboratorio) {
                const Laboratorio = mongoose.model('Laboratorios');
                const lab = await Laboratorio.findById(this.laboratorio);
            
                if (!lab || lab.farmaceutico !== true) {
                    throw new Error('El laboratorio debe ser farmaceutico para productos genéricos.');
                }
            } else if (['cosmeticos', 'cosmetico'].includes(tipoNombreLowerCase) && !this.tipoCosmetico && !this.laboratorio) {
                throw new Error('Complete los campos requeridos según su producto.');
            } else if (['opticos', 'optico'].includes(tipoNombreLowerCase) && !this.empresa) {
                throw new Error('Complete los campos requeridos según su producto.');
            }
        } else {
            throw new Error('Tipo de producto no encontrado.');
        }

        // Continuar con el proceso de guardado
        next();
    } catch (error) {
        // Manejar el error de alguna manera (puede lanzarse a next o ser registrado, según tus necesidades)
        next(error);
    }
});

module.exports = mongoose.model('Productos', productoSchema);