const { Schema, model } = require('mongoose');

const ProcesadorSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    tecnologia: {
        type: String,        
    },
    nucleos: {
        type: String, 
        required: true
    },
    subprocesos: {
        type: String, 
        required: true
    },
    cache: {
        type: String, 
        required: true
    }

});


module.exports = model('Procesador', ProcesadorSchema );

