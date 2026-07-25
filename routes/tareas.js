const express = require("express");
const Tarea = require("../models/tareamodel");

const router = express.Router();

// Crear una nueva tarea.
router.post("/tareas", async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);

    const tareaGuardada = await nuevaTarea.save();

    res.status(201).json(tareaGuardada);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear la tarea",
      error: error.message,
    });
  }
});

// Obtener todas las tareas.
router.get("/tareas", async (req, res) => {
  try {
    const tareas = await Tarea.find();

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las tareas",
      error: error.message,
    });
  }
});

// Obtener una tarea por su ID.
router.get("/tareas/:id", async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({
        mensaje: "Tarea no encontrada",
      });
    }

    res.status(200).json(tarea);
  } catch (error) {
    res.status(400).json({
      mensaje: "ID de tarea inválido",
      error: error.message,
    });
  }
});

// Actualizar una tarea por su ID.
router.put("/tareas/:id", async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!tareaActualizada) {
      return res.status(404).json({
        mensaje: "Tarea no encontrada",
      });
    }

    res.status(200).json(tareaActualizada);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar la tarea",
      error: error.message,
    });
  }
});


// Eliminar una tarea por su ID.
router.delete("/tareas/:id", async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(
      req.params.id
    );

    if (!tareaEliminada) {
      return res.status(404).json({
        mensaje: "Tarea no encontrada",
      });
    }

    res.status(200).json({
      mensaje: "Tarea eliminada correctamente",
      tarea: tareaEliminada,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al eliminar la tarea",
      error: error.message,
    });
  }
});


// Marcar una tarea como completada.
router.put("/tareas/:id/completar", async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({
        mensaje: "Tarea no encontrada",
      });
    }

    tarea.completada = true;

    await tarea.save();

    res.status(200).json({
      mensaje: "Tarea marcada como completada",
      tarea,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al completar la tarea",
      error: error.message,
    });
  }
});


// Obtener tareas según su prioridad.
router.get("/tareas/prioridad/:nivel", async (req, res) => {
  try {
    const nivel = req.params.nivel.toLowerCase();

    const prioridadesPermitidas = ["alta", "media", "baja"];

    if (!prioridadesPermitidas.includes(nivel)) {
      return res.status(400).json({
        mensaje: "La prioridad debe ser alta, media o baja",
      });
    }

    const tareas = await Tarea.find({
      prioridad: nivel,
    });

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las tareas por prioridad",
      error: error.message,
    });
  }
});


// Obtener tareas próximas a vencer.
router.get("/tareas/proximas-vencer/:dias", async (req, res) => {
  try {
    const dias = Number(req.params.dias);

    if (!Number.isInteger(dias) || dias <= 0) {
      return res.status(400).json({
        mensaje: "La cantidad de días debe ser un número entero mayor que cero",
      });
    }

    const fechaActual = new Date();

    const fechaFinal = new Date();
    fechaFinal.setDate(fechaFinal.getDate() + dias);

    const tareas = await Tarea.find({
      fechaLimite: {
        $gte: fechaActual,
        $lte: fechaFinal,
      },
    });

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las tareas próximas a vencer",
      error: error.message,
    });
  }
});

module.exports = router;