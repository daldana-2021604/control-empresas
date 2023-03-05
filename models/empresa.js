const {Schema, model} = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    tipo: {
        type: String,
        required: [true, 'El tipo de empresa es requerido']
    },
    telefono: {
        type: Number,
        required: [true, 'El número telefonico es obligatorio']
    }
})

module.exports = model('Empresa', EmpresaSchema)