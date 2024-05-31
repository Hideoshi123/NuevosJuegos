const Laboratorio = require('../models/Laboratorios');
const Patente = require('../models/Patentes');

exports.nuevoLaboratorio = async(req, res, next) => {
    const laboratorio = new Laboratorio(req.body);

    try{
        await laboratorio.save();
        res.json({ mensaje: 'Se agrego un nuevo laboratorio'});
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarLaboratorios= async(req, res, next) => {
    try {
        const laboratorio = await Laboratorio.find({});
        res.json(laboratorio);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarLaboratorioId = async(req, res, next) => {
    const laboratorio = await Laboratorio.findById(req.params.idLaboratorio)

    if(!laboratorio){
        res.json({mensaje: 'No existe el laboratorio'});
        next();
    }
    res.json(laboratorio);
};

exports.actualizarLaboratorio = async(req, res, next) => {
    try {
        let laboratorio = await Laboratorio.findOneAndUpdate({_id: req.params.idLaboratorio}, req.body, {
            new: true
        });
        res.json(laboratorio);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.eliminarLaboratorio = async(req, res, next) => {
    try {
      await Laboratorio.findByIdAndDelete({_id: req.params.idLaboratorio});
      await Patente.deleteMany({laboratorio: req.params.idLaboratorio});
      res.json({ mensaje: 'El laboratorio ya ha sido eliminado (y sus patentes)' });
    } catch (error) {
      console.log(error);
      next();
    }
};