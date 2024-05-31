const Ciudad = require('../models/Ciudades');
const Farmacia = require('../models/Farmacias');
const Empleado = require('../models/Empleados');
const Stock = require('../models/Stoks');

exports.nuevaCiudad = async(req, res, next) => {
    const ciudad = new Ciudad(req.body);

    try{
        await ciudad.save();
        res.json({ mensaje: 'Se agrego una nueva ciudad'});
    }catch(error){
        res.send(error);
        next();
    }
};

exports.mostrarCiudades = async(req, res, next) => {
    try {
        const ciudad = await Ciudad.find({});
        res.json(ciudad);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarCiudadId = async(req, res, next) => {
    const ciudad = await Ciudad.findById(req.params.idCiudad);

    if(!ciudad){
        res.json({mensaje: 'No existe la ciudad'});
        next();
    }
    res.json(ciudad);
};

exports.actualizarCiudad = async(req, res, next) => {
    try {
        const ciudad = await Ciudad.findOneAndUpdate({_id: req.params.idCiudad}, req.body, {
            new: true
        });
        res.json(ciudad);
    }catch(error){
        res.send(error);
        next();
    }
};

exports.eliminarCiudad = async (req, res, next) => {
    try {
        await Ciudad.findOneAndDelete({ _id: req.params.idCiudad });

        const farmacias = await Farmacia.find({ ciudad: req.params.idCiudad });
        const idsFarmacias = farmacias.map(farmacia => farmacia._id);

        await Empleado.deleteMany({ farmacia: { $in: idsFarmacias } });
        await Farmacia.deleteMany({ ciudad: req.params.idCiudad });

        const stocks = await Stock.find({ farmacia: { $in: idsFarmacias } });
        const idsStocks = stocks.map(stock => stock._id);
        await Stock.deleteMany({ _id: { $in: idsStocks } });

        res.json({ mensaje: 'La ciudad, los empleados y los stocks asociados han sido eliminados' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};