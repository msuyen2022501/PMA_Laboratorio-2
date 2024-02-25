const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { mascotasPost, mascotasGet, getMascotaById, mascotasPut, mascotasDelete } = require('../controllers/mascotas.controller');

const router = Router();

router.get("/", mascotasGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], getMascotaById);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], mascotasPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], mascotasDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("edad", "La edad es obligatoria").not().isEmpty(),
        check("edad", "La edad debe ser un número").isNumeric(),
        check("raza", "La raza es obligatoria").not().isEmpty(),
        check("descripcion", "La descripción es obligatoria").not().isEmpty(),
        validarCampos,
    ], mascotasPost);

module.exports = router;
