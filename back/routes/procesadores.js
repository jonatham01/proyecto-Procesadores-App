const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { getProcesadores,CrearProcesador,eliminarProcesador,actualizarProcesador,getProcesadoresFiltrados} = require('../controllers/procesadores');

const router = Router();

// Obtener eventos 
router.get('/',  getProcesadores );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('tecnologia','Tecnologia es obligatorio').not().isEmpty(),
        check('nucleos','Nucleos es obligatorio').not().isEmpty(),
        check('subprocesos','subprocesos es obligatorio').not().isEmpty(),
        check('cache','cache es obligatoria').not().isEmpty(),
        validarCampos
    ],
    CrearProcesador
);

router.post(
    '/filtro',
    [
        
        check('tecnologia','Tecnologia es obligatorio').not().isEmpty(),
        check('nucleos','Nucleos es obligatorio').not().isEmpty(),
        check('subprocesos','subprocesos es obligatorio').not().isEmpty(),
        check('cache','cache es obligatoria').not().isEmpty(),
        validarCampos
    ],
    getProcesadoresFiltrados
);
// Actualizar Evento
router.put(
    '/:id', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('tecnologia','Tecnologia es obligatorio').not().isEmpty(),
        check('nucleos','Nucleos es obligatorio').not().isEmpty(),
        check('subprocesos','subprocesos es obligatorio').not().isEmpty(),
        check('cache','cache es obligatoria').not().isEmpty(),

        validarCampos
    ],
    actualizarProcesador
);

// Borrar evento
router.delete('/:id', eliminarProcesador );

module.exports = router;