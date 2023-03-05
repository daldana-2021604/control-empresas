const { request, response  } = require('express');

const esAdminRole = ( req = request, res = response, next ) => {

    if ( !req.empresa ) {
        return res.status(500).json({
            msg: 'Se quiere verficar el role sin validar el token primero'
        });
    }

    //Verificación solo el rol de Admi puede realizar la eliminación
    //Si cumple con el rol de admin se envia al controllador deleteUsuario
    const { tipo, nombre  } = req.empresa
    if ( tipo !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es admin - No puede hacer esto >:v`
        });
    }

    next();
}

module.exports = {
    esAdminRole
}