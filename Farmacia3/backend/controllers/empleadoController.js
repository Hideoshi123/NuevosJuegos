const Empleado = require('../models/Empleados');

exports.nuevoEmpleado = async(req, res, next) => {
    const empleado = new Empleado(req.body);

    try{
        await empleado.save();
        res.json({ mensaje: 'Se agrego un nuevo empleado'});
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarEmpleados = async(req, res, next) => {
    try {
        const empleado = await Empleado.find({}).populate('farmacia');
        res.json(empleado);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarEmpleadoId = async(req, res, next) => {
    const empleado = await Empleado.findById(req.params.idEmpleado).populate('farmacia');

    if(!empleado){
        res.json({mensaje: 'No existe el empleado'});
        next();
    }
    res.json(empleado);
};

exports.actualizarEmpleado = async(req, res, next) => {
    try {
        let empleado = await Empleado.findOneAndUpdate({_id: req.params.idEmpleado}, req.body, {
            new: true
        }).populate('farmacia');
        res.json(empleado);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.eliminarEmpleado = async(req, res, next) => {
    try {
        await Empleado.findOneAndDelete({_id: req.params.idEmpleado});
        res.json({mensaje: 'El empleado ya ha sido eliminado'});
    }catch(error){
        console.log(error);
        next();
    }
};