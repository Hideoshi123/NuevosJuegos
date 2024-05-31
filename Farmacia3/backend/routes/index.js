const express = require('express');
const router = express.Router();

const ciudad = require('../controllers/ciudadController');
const farmacia = require('../controllers/farmaciaController');
const empleado = require('../controllers/empleadoController');
const tipo = require('../controllers/tipoController');
const laboratorio = require('../controllers/laboratorioController');
const patente = require('../controllers/patenteController');
const proveedor = require('../controllers/proveedorController');
const producto = require('../controllers/productoController');
const cuenta = require('../controllers/cuentaController');
const stok = require('../controllers/stokController')

module.exports = function () {

    //farmacia

    router.post('/ciudades/', ciudad.nuevaCiudad);
    router.get('/ciudades', ciudad.mostrarCiudades);
    router.get('/ciudades/:idCiudad', ciudad.mostrarCiudadId);
    router.put('/ciudades/:idCiudad', ciudad.actualizarCiudad);
    router.delete('/ciudades/:idCiudad', ciudad.eliminarCiudad);

    router.post('/farmacias', farmacia.nuevaFarmacia);
    router.get('/farmacias', farmacia.mostrarFarmacias);
    router.get('/farmacias/:idFarmacia', farmacia.mostrarFarmaciaId);
    router.put('/farmacias/:idFarmacia', farmacia.actualizarFarmacia);
    router.delete('/farmacias/:idFarmacia', farmacia.eliminarFarmacia);

    router.post('/empleados', empleado.nuevoEmpleado);
    router.get('/empleados', empleado.mostrarEmpleados);
    router.get('/empleados/:idEmpleado', empleado.mostrarEmpleadoId);
    router.put('/empleados/:idEmpleado', empleado.actualizarEmpleado);
    router.delete('/empleados/:idEmpleado', empleado.eliminarEmpleado);

    router.post('/stocks', stok.nuevoStok);
    router.get('/stocks', stok.mostrarStoks);
    router.get('/stocks/:idStock', stok.mostrarStokId);
    router.put('/stocks/:idStock', stok.actualizarStok);
    router.delete('/stocks/:idStock', stok.eliminarStok);
    router.post('/stocks/nuevos/:idFarmacia', stok.nuevoStok);

    //proveedor

    router.post('/laboratorios', laboratorio.nuevoLaboratorio);
    router.get('/laboratorios', laboratorio.mostrarLaboratorios);
    router.get('/laboratorios/:idLaboratorio', laboratorio.mostrarLaboratorioId);
    router.put('/laboratorios/:idLaboratorio', laboratorio.actualizarLaboratorio);
    router.delete('/laboratorios/:idLaboratorio', laboratorio.eliminarLaboratorio);

    router.post('/tipos', tipo.nuevoTipo);
    router.get('/tipos', tipo.mostrarTipos);
    router.get('/tipos/:idTipo', tipo.mostrarTipoId);
    router.put('/tipos/:idTipo', tipo.actualizarTipo);
    router.delete('/tipos/:idTipo', tipo.eliminarTipo);

    router.post('/patentes', patente.nuevaPatente);
    router.get('/patentes', patente.mostrarPatentes);
    router.get('/patentes/:idPatente', patente.mostrarPatenteId);
    router.put('/patentes/:idPatente', patente.actualizarPatente);
    router.delete('/patentes/:idPatente', patente.eliminarPatente);

    router.post('/proveedores', proveedor.nuevoProveedor);
    router.get('/proveedores', proveedor.mostrarProveedores);
    router.get('/proveedores/:idProveedor', proveedor.mostrarProveedorId);
    router.put('/proveedores/:idProveedor', proveedor.actualizarProveedor);
    router.delete('/proveedores/:idProveedor', proveedor.eliminarProveedor);

    router.post('/productos', producto.nuevoProducto);
    router.get('/productos', producto.mostrarProductos);
    router.get('/productos/:idProducto', producto.mostrarProductoId);
    router.put('/productos/:idProducto', producto.actualizarProducto);
    router.delete('/productos/:idProducto', producto.eliminarProducto);
    router.post('/productos/busqueda/:query', producto.buscarProducto);

    //Cuentas
    
    router.post('/cuentas', cuenta.nuevaCuenta);
    router.get('/cuentas', cuenta.mostrarCuentas);
    router.get('/cuentas/:idCuenta', cuenta.mostrarCuentaId);
    router.put('/cuentas/:idCuenta', cuenta.actualizarCuenta);
    router.delete('/cuentas/:idCuenta', cuenta.eliminarCuenta);

    return router;
}