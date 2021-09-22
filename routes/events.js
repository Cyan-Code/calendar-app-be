/**
 * Rutas de Eventos 7 Events
 * host + /api/events
 */

// Crud calendar
const {Router} = require('express');
const { check } = require('express-validator')

const {validarJWT} = require('../middlewares/validar-jwt')
const isDate = require('../helpers/isDate');

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();
//Middelware subido de nivel
router.use(validarJWT)


const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} = require('../controlers/events');

// Obtener eventos
router.get(
  '/', 
  [
    validarCampos
  ],
  getEventos
)

// Crear un nuevo elemento
router.post(
  '/',
  [
    check('title', 'El titulo esobligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('start', 'Fecha de Finalizacion es obligatoria').custom( isDate ),
  ],
  crearEvento
)

// Actualizar evento
router.put('/:id', actualizarEvento)

//Borrar evento
router.delete('/:id', eliminarEvento)


module.exports = router