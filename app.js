
const express = require("express");
const cors = require("cors");
const dbconnect = require("./config/db");
const tareasRoutes = require("./routes/tareas");

const app = express();
const PORT = 3000;

// Permite peticiones desde el frontend local de Vite.
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
  ],
};

app.use(cors(corsOptions));

// Permite recibir información en formato JSON.
app.use(express.json());

// Activa las rutas del archivo routes/tareas.js.
app.use(tareasRoutes);

// Ruta para comprobar que el servidor funciona.
app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API de tareas funcionando correctamente",
  });
});

// Conecta la base de datos y después inicia el servidor.

dbconnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Servidor funcionando en http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "No se pudo iniciar la API:",
      error.message
    );

    process.exit(1);
  });

