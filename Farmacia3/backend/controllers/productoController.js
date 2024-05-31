const Producto = require('../models/Productos');
const Stock = require('../models/Stoks');

exports.nuevoProducto = async(req, res, next) => {
    const producto = new Producto(req.body);

    try{
        await producto.save();
        res.json({ mensaje: 'Se agrego una nuevo Producto'});
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarProductos = async(req, res, next) => {
    try {
        const producto = await Producto.find({}).populate('proveedor').populate('laboratorio').populate('tipo');
        res.json(producto);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.mostrarProductoId = async(req, res, next) => {
    const producto = await Producto.findById(req.params.idProducto).populate('proveedor').populate('laboratorio').populate('tipo');

    if(!producto){
        res.json({mensaje: 'No existe el producto'});
        next();
    }
    res.json(producto);
};

exports.actualizarProducto = async(req, res, next) => {
    try {
        let producto = await Producto.findOneAndUpdate({_id: req.params.idProducto}, req.body, {
            new: true
        }).populate('proveedor').populate('laboratorio').populate('tipo');
        res.json(producto);
    }catch(error){
        console.log(error);
        next();
    }
};

exports.eliminarProducto = async (req, res, next) => {
  try {
    const productoId = req.params.idProducto;

    const stock = await Stock.findOne({ 'mercancia.producto': productoId }).exec();

    const mercancia = stock.mercancia;

    // Verificar si el producto es el único en la mercancía
    const esUnico = mercancia.length === 1 && mercancia[0].producto.equals(productoId);

    if (esUnico) {
      // Eliminar todo el documento de Stock
      await Stock.deleteOne({ 'mercancia.producto': productoId });
    } else {
      // Actualizar la matriz mercancia eliminando el objeto específico
      const updatedMercancia = mercancia.map((item) => {
        if (item.producto && item.producto.equals(productoId)) {
          return {};  // Dejar el objeto vacío
        }
        return item;
      });

      // Filtrar para eliminar objetos vacíos
      const finalMercancia = updatedMercancia.filter((item) => Object.keys(item).length > 0);

      // Actualizar la matriz mercancia
      await Stock.updateOne(
        { 'mercancia.producto': productoId },
        { $set: { mercancia: finalMercancia } }
      );
    }

    // Eliminar el producto de la colección Producto
    await Producto.findByIdAndDelete(productoId);

    res.json({ mensaje: 'El producto ha sido eliminado de la mercancía de los stocks' });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.buscarProducto = async (req, res, next) => {
    try {
      const query = req.params.query;
      const productos = await Producto.find({
        nombre: new RegExp(query, 'i')
      });
  
      // Mapear los resultados para enviar solo la información necesaria
      const resultadoBusqueda = productos.map(producto => ({
        _id: producto._id,
        nombre: producto.nombre,
        // Otros campos que desees incluir
      }));
  
      res.json(resultadoBusqueda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar productos' });
    }
  };