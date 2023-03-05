const Empresa = require('../models/empresa');
const Tipo = require('../models/tipo');
const Municipio = require('../models/municipio');
const Sucursal = require('../models/sucursal');
//const Categoria = require('../models/categorias');
//const Producto = require('../models/producto');

//Validamos en contro de la db si ese correo ya existe
const emailExiste = async( email = '' ) => {
    //Verficar si el correo existe
    const existeEmailDeEmpresa = await Empresa.findOne( { email } );
    if ( existeEmailDeEmpresa) {
        throw new Error(`El email ${ email }, ya esta registrado en la DB `);
    }
}

const esTipoValido = async( tipo = '') => {
    //Verificar si el rol es valido y existe en la DB
    tipo = tipo.toUpperCase();
    const existeTipoDB = await Tipo.findOne( { tipo } );
    if ( !existeTipoDB ) {
        throw new Error(`El tipo ${ tipo }, no existe en la DB `);
    }
}

const existeEmpresaPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfCompany = await Empresa.findById( id );
    if ( !existIdOfCompany ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const esMunicipioValido = async( municipio = '') => {
    municipio = municipio.toUpperCase();
    const existeMunicipioDB = await Municipio.findOne( { municipio } );
    if ( !existeMunicipioDB ) {
        throw new Error(`El municipio ${ municipio }, no existe en la DB `);
    }
}

const existeSucursalPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfBranch = await Sucursal.findById( id );
    if ( !existIdOfBranch ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

module.exports = {
    emailExiste,
    esTipoValido,
    existeEmpresaPorId,
    esMunicipioValido,
    existeSucursalPorId
}
