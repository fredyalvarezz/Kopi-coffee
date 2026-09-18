const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @route  POST /api/auth/register
// @desc   Registro público. SIEMPRE crea un usuario con rol "cliente".
//         (Para crear admins/baristas se usa userController, protegido por admin)
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Nombre, email y contraseña son obligatorios");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("Ya existe una cuenta con ese email");
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "cliente",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
}

// @route  POST /api/auth/login
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email y contraseña son obligatorios");
    }

    // .select("+password") porque en el modelo lo marcamos como select:false
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Email o contraseña incorrectos");
    }

    if (!user.active) {
      res.status(403);
      throw new Error("Esta cuenta está desactivada");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
}

// @route  GET /api/auth/me
// @desc   Devuelve el perfil del usuario autenticado (viene de req.user, del middleware protect)
async function getMe(req, res) {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
}

module.exports = { register, login, getMe };
