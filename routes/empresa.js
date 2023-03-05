const { Router } = require('express');
const { check } = require('express-validator');

const { getEmpresa, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/empresa');
const { emailExiste, esTipoValido, existeEmpresaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getEmpresa);

router.post('/agregar',[
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('email', 'Ingrese un email valido').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('tipo', 'El tipo de empresa es obligatorio para el post').not().isEmpty(),
    check('tipo').custom( esTipoValido ),
    check('telefono', 'El telefono es obligatorio para el post').not().isEmpty(),
    validarCampos
], postEmpresa);

router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeEmpresaPorId),
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('email', 'Ingrese un email valido').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('tipo', 'El tipo de empresa es obligatorio para el post').not().isEmpty(),
    check('tipo').custom( esTipoValido ),
    check('telefono', 'El telefono es obligatorio para el post').not().isEmpty(),
    validarCampos
], putEmpresa);

router.delete('/eliminar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeEmpresaPorId),
    validarCampos
], deleteEmpresa);

module.exports = router;