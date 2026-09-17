const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1) Verifica que venga un token válido en el header Authorization
//    Formato esperado: "Authorization: Bearer <token>"
async function protect(req, res, next) {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No autorizado, falta el token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Volvemos a buscar el usuario en la DB para tener sus datos actuales
    const user = await User.findById(decoded.id);

    if (!user || !user.active) {
      return res.status(401).json({ message: "Usuario no válido o desactivado" });
    }

    req.user = user; // queda disponible en todos los controllers siguientes
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

// 2) Restringe una ruta a ciertos roles.
//    Uso: router.post("/", protect, authorize("admin"), crearProducto)
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "No tienes permiso para realizar esta acción",
      });
    }
    next();
  };
}

module.exports = { protect, authorize };
