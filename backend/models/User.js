const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: 6,
      select: false, // nunca se regresa por defecto en las consultas
    },
    role: {
      type: String,
      // Tu data actual usa "user" y "admin". Dejamos "barista" ya
      // disponible por si separas la operación de cocina del admin
      // más adelante; si no lo usas, no pasa nada.
      enum: ["user", "barista", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true, // permite "desactivar" baristas/admins sin borrarlos
    },
  },
  { timestamps: true }
);

// Antes de guardar, si la contraseña cambió, la hasheamos
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método de instancia para comparar contraseña en login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
