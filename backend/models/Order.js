const mongoose = require("mongoose");

//  cada item solo guarda productId + quantity.
const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },

    // Ajusta los estados que realmente uses en tu app "completed" y "preparing").
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
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);


module.exports = mongoose.model("Order", orderSchema);
