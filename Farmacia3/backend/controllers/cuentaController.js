const Cuenta = require('../models/Cuentas');

exports.nuevaCuenta = async(req, res, next) => {
    const cuenta= new Cuenta(req.body);

    try{
        await cuenta.save();
        res.json({ mensaje: 'Se agrego una nueva cuenta'});
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarCuentas = async(req, res, next) => {
    try {
        const cuenta = await Cuenta.find({});
        res.json(cuenta);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarCuentaId = async(req, res, next) => {
    const cuenta= await Cuenta.findById(req.params.idCuenta);

    if(!cuenta){
        res.json({mensaje: 'No existe la cuenta'});
        next();
    }
    res.json(cuenta);
};

exports.actualizarCuenta= async(req, res, next) => {
    try {
        const cuenta = await Cuenta.findOneAndUpdate({_id: req.params.idCuenta}, req.body, {
            new: true
        });
        res.json(cuenta);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.eliminarCuenta = async (req, res, next) => {
    try {
      await Cuenta.findOneAndDelete({ _id: req.params.idCuenta });
  
      res.json({ mensaje: 'La cuenta ha sido eliminada' });
    } catch (error) {
      console.log(error);
      next();
    }
};