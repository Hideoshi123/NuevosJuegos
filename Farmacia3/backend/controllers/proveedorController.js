const Proveedor = require('../models/Proveedores');
const Producto = require('../models/Productos');

exports.nuevoProveedor = async(req, res, next) => {
    const proveedor = new Proveedor(req.body);

    try{
        await proveedor.save();
        res.json({ mensaje: 'Se agrego un nuevo proveedor'});
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarProveedores = async(req, res, next) => {
    try {
        const proveedor = await Proveedor.find({})
        res.json(proveedor);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarProveedorId = async(req, res, next) => {
    const proveedor = await Proveedor.findById(req.params.idProveedor);

    if(!proveedor){
        res.json({mensaje: 'No existe el proveedor'});
        next();
    }
    res.json(proveedor);
};

exports.actualizarProveedor = async(req, res, next) => {
    try {
        let proveedor = await Proveedor.findOneAndUpdate({_id: req.params.idProveedor}, req.body, {
            new: true
        });
        res.json(proveedor);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.eliminarProveedor = async(req, res, next) => {
    try {
      await Proveedor.findByIdAndDelete({_id: req.params.idProveedor});
      await Producto.deleteMany({proveedor: req.params.idProveedor});
      res.json({ mensaje: 'El proveedor y sus productos han sido eliminados' });
    } catch (error) {
      console.log(error);
      next();
    }
};