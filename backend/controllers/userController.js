const User = require("../models/User");

// @route  GET /api/users
// @access Admin
// @desc   Lista todos los usuarios (para que el admin vea quién es quién)
async function getUsers(req, res, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
}

// @route  POST /api/users
// @access Admin
// @desc   El admin crea un usuario con rol "barista" o "admin".
//         (El registro público de authController siempre es "cliente")
async function createStaffUser(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400);
      throw new Error("Nombre, email, contraseña y rol son obligatorios");
    }

    if (!["barista", "admin"].includes(role)) {
      res.status(400);
      throw new Error('El rol debe ser "barista" o "admin"');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("Ya existe una cuenta con ese email");
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
}

// @route  PATCH /api/users/:id
// @access Admin
// @desc   Activar/desactivar un usuario, o cambiarle el rol
async function updateUser(req, res, next) {
  try {
    const { role, active, name } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("Usuario no encontrado");
    }

    if (role) user.role = role;
    if (typeof active === "boolean") user.active = active;
    if (name) user.name = name;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      active: updated.active,
    });
  } catch (error) {
    next(error);
  }
}

// @route  DELETE /api/users/:id
// @access Admin
async function deleteUser(req, res, next) {
  try {
    // evita que el admin se elimine a sí mismo por accidente
    if (req.params.id === String(req.user._id)) {
      res.status(400);
      throw new Error("No puedes eliminar tu propia cuenta");
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("Usuario no encontrado");
    }

    await user.deleteOne();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers, createStaffUser, updateUser, deleteUser };
