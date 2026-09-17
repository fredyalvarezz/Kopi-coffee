const mongoose = require("mongoose");

// Se conecta a MongoDB usando la URI del .env
// La usamos una sola vez, al arrancar el servidor (ver server.js)
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    // Si no hay base de datos, no tiene sentido seguir corriendo el servidor
    process.exit(1);
  }
}

module.exports = connectDB;
