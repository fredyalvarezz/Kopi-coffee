const jwt = require("jsonwebtoken");

// Genera un token firmado que incluye el id del usuario.
// El rol NO se pone dentro del token como fuente de verdad definitiva;
// en cada request protegido volvemos a consultar el usuario en la DB
// (ver middleware/auth.js) para evitar usar un rol "viejo" si cambió.
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

module.exports = generateToken;
