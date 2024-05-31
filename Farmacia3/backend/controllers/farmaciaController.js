const Farmacia = require('../models/Farmacias');
const Empleado = require('../models/Empleados')

exports.nuevaFarmacia = async(req, res, next) => {
    const farmacia = new Farmacia(req.body);

    try{
        await farmacia.save();
        res.json({ mensaje: 'Se agrego una nueva farmacia'});
    }catch(error){
        res.send(error);
        next();
    }
};

exports.mostrarFarmacias = async(req, res, next) => {
    try {
        const farmacia = await Farmacia.find({}).populate('ciudad');
        res.json(farmacia);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarFarmaciaId = async(req, res, next) => {
    console.log(`Request para mostrar farmacia con ID: ${req.params.idFarmacia}`);
    const farmacia = await Farmacia.findById(req.params.idFarmacia).populate('ciudad');

    if(!farmacia){
        console.log('No se encontró la farmacia');
        res.json({mensaje: 'No existe la farmacia'});
        next();
    }
    console.log('Farmacia encontrada:', farmacia);
    res.json(farmacia);
};

exports.actualizarFarmacia = async(req, res, next) => {
    try {
        let farmacia = await Farmacia.findOneAndUpdate({_id: req.params.idFarmacia}, req.body, {
            new: true
        }).populate('ciudad');
        res.json(farmacia);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.eliminarFarmacia = async(req, res, next) => {
    try {
      await Farmacia.findByIdAndDelete({_id: req.params.idFarmacia});
      await Empleado.deleteMany({farmacia: req.params.idFarmacia});
      res.json({ mensaje: 'La farmacia ya ha sido eliminada' });
    } catch (error) {
      console.log(error);
      next();
    }
};