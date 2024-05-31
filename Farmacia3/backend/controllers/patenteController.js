const Patente = require('../models/Patentes');

exports.nuevaPatente = async(req, res, next) => {
    const patente = new Patente(req.body);

    try{
        await patente.save();
        res.json({ mensaje: 'Se agrego una nueva patente'});
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarPatentes= async(req, res, next) => {
    try {
        const patente = await Patente.find({}).populate('laboratorio');
        res.json(patente);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarPatenteId = async(req, res, next) => {
    const patente = await Patente.findById(req.params.idPatente).populate('laboratorio');

    if(!patente){
        res.json({mensaje: 'No existe la patente'});
        next();
    }
    res.json(patente);
};

exports.actualizarPatente = async(req, res, next) => {
    try {
        let patente = await Patente.findOneAndUpdate({_id: req.params.idPatente}, req.body, {
            new: true
        }).populate('laboratorio');
        res.json(patente);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.eliminarPatente = async(req, res, next) => {
    try {
      await Patente.findByIdAndDelete({_id: req.params.idPatente});
      res.json({ mensaje: 'La patente ya ha sido eliminada' });
    } catch (error) {
      console.log(error);
      next();
    }
};