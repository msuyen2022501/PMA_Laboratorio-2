const { response } = require('express');
const Mascota = require('../models/mascota');

const mascotasGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = {};

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });
};

const getMascotaById = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findById(id);

    if (!mascota) {
        return res.status(404).json({
            msg: 'Mascota no encontrada'
        });
    }

    res.status(200).json({
        mascota
    });
};

const mascotasPut = async (req, res) => {
    const { id } = req.params;
    const { nombre, edad, especie, descripcion, adoptada } = req.body;
    const nuevaInformacion = { nombre, edad, especie, descripcion, adoptada };

    const mascotaActualizada = await Mascota.findByIdAndUpdate(id, nuevaInformacion, { new: true });

    if (!mascotaActualizada) {
        return res.status(404).json({
            msg: 'Mascota no encontrada'
        });
    }

    res.status(200).json({
        msg: 'Mascota actualizada exitosamente',
        mascota: mascotaActualizada
    });
};

const mascotasDelete = async (req, res) => {
    const { id } = req.params;

    const mascotaEliminada = await Mascota.findByIdAndDelete(id);

    if (!mascotaEliminada) {
        return res.status(404).json({
            msg: 'Mascota no encontrada'
        });
    }

    res.status(200).json({
        msg: 'Mascota eliminada exitosamente',
        mascota: mascotaEliminada
    });
};

const mascotasPost = async (req, res) => {
    const { nombre, raza, edad, especie, descripcion } = req.body;

    const nuevaMascota = new Mascota({ nombre, raza, edad, especie, descripcion, raza });

    await nuevaMascota.save();

    res.status(201).json({
        msg: 'Mascota creada exitosamente',
        mascota: nuevaMascota
    });
};

module.exports = {
    mascotasGet,
    getMascotaById,
    mascotasPut,
    mascotasDelete,
    mascotasPost
};
