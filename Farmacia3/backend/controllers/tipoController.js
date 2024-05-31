const Tipo = require('../models/Tipos');
const Producto = require('../models/Productos');

exports.nuevoTipo = async(req, res, next) => {
    const tipo = new Tipo(req.body);

    try{
        await tipo.save();
        res.json({ mensaje: 'Se agrego un nuevo tipo de producto'});
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarTipos = async(req, res, next) => {
    try {
        const tipo = await Tipo.find({});
        res.json(tipo);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarTipoId = async(req, res, next) => {
    const tipo = await Tipo.findById(req.params.idTipo);

    if(!tipo){
        res.json({mensaje: 'No existe el tipo de producto'});
        next();
    }
    res.json(tipo);
};

exports.actualizarTipo = async(req, res, next) => {
    try {
        const tipo = await Tipo.findOneAndUpdate({_id: req.params.idTipo}, req.body, {
            new: true
        });
        res.json(tipo);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.eliminarTipo = async (req, res, next) => {
    try {
      await Tipo.findOneAndDelete({ _id: req.params.idTipo});
      await Producto.deleteMany({tipo: req.params.idTipo});
      res.json({ mensaje: 'El tipo de producto ha sido eliminado' });
    } catch (error) {
      console.log(error);
      next();
    }
};