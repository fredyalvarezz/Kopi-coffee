const mongoose = require("mongoose");

// "options" varía muchísimo según el productType (coffee, infusionType,
// containsCoffee, preparationOptions, flavors, milks, extras, sizes...)
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    basePrice: { type: Number, required: true, min: 0 },

    productType: { type: String, required: true }, // Café, Frappé, Postre, Infusiones, Especialidad...
    menuCategory: { type: String, required: true }, // Calientes, Frías, Frappés, Temporada, Postres

    image: { type: String, default: "" },

    // true/false (disponible o agotado),

    stock: { type: Boolean, default: true },

    customizable: { type: Boolean, default: true },

    options: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

