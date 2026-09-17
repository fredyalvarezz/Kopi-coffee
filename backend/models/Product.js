const mongoose = require("mongoose");

// "options" varía muchísimo según el productType (coffee, infusionType,
// containsCoffee, preparationOptions, flavors, milks, extras, sizes...)
// tal como en tu productTypeConfig del frontend. En vez de forzar un
// sub-schema rígido, lo dejamos como objeto libre (Mixed) para que el
// admin pueda mandar exactamente la misma forma que ya arma tu
// ProductForm.jsx, sin tener que tocar el backend cada vez que agregues
// un productType nuevo.
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    basePrice: { type: Number, required: true, min: 0 },

    productType: { type: String, required: true }, // Café, Frappé, Postre, Infusiones, Especialidad...
    menuCategory: { type: String, required: true }, // Calientes, Frías, Frappés, Temporada, Postres

    image: { type: String, default: "" },

    // Igual que en tu products.js actual: true/false (disponible o agotado),
    // NO es un conteo de unidades. El conteo de insumos vive en InventoryItem.
    stock: { type: Boolean, default: true },

    customizable: { type: Boolean, default: true },

    options: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

