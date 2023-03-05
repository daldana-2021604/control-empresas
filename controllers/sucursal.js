const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Sucursal = require('../models/sucursal');

const getSucursal = async(req = request, res = response) => {
    const data = {
        empresa: req.empresa._id
    }
    const listaSucursal = await Promise.all([
        Sucursal.countDocuments(data),
        Sucursal.find(data).populate('empresa', "nombre")
    ])

    res.json({
        msg:'GET Empresa',
        listaSucursal
    })
}

const postSucursal= async (req = request, res = response) => {
    const {nombre, municipio} = req.body;

    const data = {
        nombre,
        municipio,
        empresa: req.empresa._id
    }

    const sucursalAgregada = new Sucursal(data);

    await sucursalAgregada.save();

    res.status(201).json({
        msg: 'POST sucursal',
        sucursalAgregada
    })
}

const putSucursal= async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, empresa, ...data} = req.body;

    data.empresa = req.empresa._id;// Hacemos referencia a la empresa que hizo el put por medio del token

    //Edicion de categorias                                       // new: true sirve para enviar el nuevo documento actualizado
    const sucursalEditado = await Sucursal.findByIdAndUpdate(id, data, {new: true});

    res.json ({
        msg: 'PUT API sucursal',
        sucursalEditado
    })
}

const deleteSucursal= async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, empresa, ...data} = req.body;

    data.empresa = req.empresa._id;// Hacemos referencia a la empresa que hizo el put por medio del token

    //Edicion de categorias                                       // new: true sirve para enviar el nuevo documento actualizado
    const sucursalEliminado = await Sucursal.findByIdAndDelete(id, data, {new: true});

    res.json ({
        msg: 'DELETE sucursal',
        sucursalEliminado
    })
}

module.exports = {
    getSucursal,
    postSucursal,
    putSucursal,
    deleteSucursal
}