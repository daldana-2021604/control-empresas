const { Router } = require('express');
const { check } = require('express-validator');

const { getSucursal, postSucursal, putSucursal, deleteSucursal } = require('../controllers/sucursal');
const { esMunicipioValido, existeSucursalPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar',[
    validarJWT,
    validarCampos
], getSucursal);

router.post('/agregar',[
    validarJWT,
    check('nombre', 'El campo nombre debe de estar lleno').not().isEmpty(),
    check('municipio', 'El campo municipio debe de estar lleno').not().isEmpty(),
    check('municipio').custom(esMunicipioValido),
    validarCampos
], postSucursal);

router.put('/editar/:id',[
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeSucursalPorId),
    check('nombre', 'El campo nombre debe de estar lleno').not().isEmpty(),
    check('municipio', 'El campo municipio debe de estar lleno').not().isEmpty(),
    check('municipio').custom(esMunicipioValido),
    validarCampos
], putSucursal);

router.delete('/eliminar/:id',[
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeSucursalPorId),
    validarCampos
], deleteSucursal);

module.exports = router;