const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Empresa = require('../models/empresa');

const getEmpresa = async(req = request, res = response) => {

    const listaEmpresas = await Promise.all([
        Empresa.countDocuments(),
        Empresa.find()
    ])

    res.json({
        msg:'GET Empresa',
        listaEmpresas
    })
}

const postEmpresa = async(req = request, res = response) => {
    const { nombre, email, password,telefono } = req.body;
    const tipo = req.body.tipo.toUpperCase();
    const empresaDB = new Empresa({ nombre, email, password, tipo,telefono });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    empresaDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await empresaDB.save();

    res.status(201).json({
        msg: 'POST API de empresa',
        empresaDB
    });
}

const putEmpresa = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, tipo, ...resto} = req.body;

    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    const empresaEditada = await Empresa.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de empresa',
        empresaEditada
    })
}

const deleteEmpresa = async(req = request, res = response) => {
    const {id} = req.params;

    const empresaEliminada = await Empresa.findByIdAndDelete(id);

    res.json({
        mdg: 'DELETE API empresa',
        empresaEliminada
    })
}

module.exports = {
    getEmpresa,
    postEmpresa,
    putEmpresa,
    deleteEmpresa
}