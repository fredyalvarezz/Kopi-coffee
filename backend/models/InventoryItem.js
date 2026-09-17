const mongoose = require("mongoose");

// Esto es el inventario de INSUMOS (café, leche, jarabes...), igual que
// tu data/inventory.js — es distinto del "stock" booleano del Product,
// que solo indica si esa bebida está disponible o agotada.
const inventoryItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    unit: { type: String, required: true }, // "kg", "L", "botellas", etc.
    stock: { type: Number, required: true, default: 0, min: 0 },
    minimum: { type: Number, required: true, default: 0, min: 0 }, // umbral de "stock bajo"
  },
  { timestamps: true }
);

// Útil para que el frontend pinte en rojo lo que está por debajo del mínimo,
// sin tener que recalcularlo en cada componente.
inventoryItemSchema.virtual("belowMinimum").get(function () {
  return this.stock <= this.minimum;
});
inventoryItemSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("InventoryItem", inventoryItemSchema);
