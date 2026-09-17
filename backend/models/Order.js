const mongoose = require("mongoose");

// Igual que en tu orders.js: cada item solo guarda productId + quantity.
// (Si más adelante quieres guardar personalizaciones por item, este es
// el lugar donde se agregarían, pero por ahora respeta tu modelo actual.)
const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    // En tu data actual "customer" es un nombre plano (no un login real).
    // Dejamos también "user" opcional por si más adelante quieres ligar
    // el pedido a una cuenta autenticada sin romper lo que ya tienes.
    customer: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },

    // Ajusta este enum a los estados que realmente uses en tu app
    // (tu data de ejemplo trae "completed" y "preparing").
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "completed", "cancelled"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "refunded"],
      default: "unpaid",
    },
  },
  { timestamps: true } // createdAt / updatedAt automáticos
);

module.exports = mongoose.model("Order", orderSchema);


module.exports = mongoose.model("Order", orderSchema);
