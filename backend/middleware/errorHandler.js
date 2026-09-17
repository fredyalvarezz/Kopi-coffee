// Para rutas que no existen (404)
function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Ruta no encontrada: ${req.originalUrl}`));
}

// Captura cualquier error lanzado en controllers (incluyendo errores de Mongoose)
function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // ID de Mongo con formato inválido
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Recurso no encontrado (id inválido)";
  }

  // Email duplicado u otro índice único duplicado
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Ya existe un registro con ese ${field}`;
  }

  // Errores de validación de Mongoose
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}

module.exports = { notFound, errorHandler };
