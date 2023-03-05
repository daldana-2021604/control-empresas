const {Schema, model} = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la sucursal es obligatorio'],
    },
    municipio: {
        type: String,
        required: [true, 'El municipio es obligatorio']
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    }
})

module.exports = model('Sucursal', SucursalSchema)