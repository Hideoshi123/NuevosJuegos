const Stok = require('../models/Stoks');

exports.nuevoStok = async(req, res, next) => {
    const stok = new Stok(req.body);

    try{
        await stok.save();
        res.json({ mensaje: 'Se agrego un nuevo stock'});
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarStoks = async (req, res, next) => {
    try {
      const stoks = await Stok.find({})
        .populate('farmacia')
        .populate({
          path: 'mercancia.producto',
          model: 'Productos'
        })
  
      res.json(stoks);
    } catch (error) {
      console.log(error);
      next();
    }
  };

exports.mostrarStokId = async(req, res, next) => {
    const stok = await Stok.findById(req.params.idStock).populate('farmacia')
    .populate({
      path: 'mercancia.producto',
      model: 'Productos'
    });

    if(!stok){
        res.json({mensaje: 'No existe el Stock'});
        next();
    }
    res.json(stok);
};

exports.actualizarStok = async(req, res, next) => {
    try {
        let stok = await Stok.findOneAndUpdate({_id: req.params.idStock}, req.body, {
            new: true
        })
        res.json(stok);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.eliminarStok = async(req, res, next) => {
    try {
      await Stok.findByIdAndDelete({_id: req.params.idStock});
      res.json({ mensaje: 'El stock ha sido eliminado' });
    } catch (error) {
      console.log(error);
      next();
    }
};