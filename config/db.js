
const mongoose = require("mongoose");

const dbconnect = async () => {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/dbTareas"
  );

  console.log("Conexión a la base de datos establecida");
};

module.exports = dbconnect;
