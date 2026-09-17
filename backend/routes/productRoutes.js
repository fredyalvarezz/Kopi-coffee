const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} = require("../controllers/productController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Público: cualquiera puede ver el menú
router.get("/", getProducts);
router.get("/:id", getProductById);

// Privado: solo admin puede modificar el catálogo
router.post("/", protect, authorize("admin"), createProduct);
router.put("/:id", protect, authorize("admin"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);
router.patch("/:id/stock", protect, authorize("admin"), updateStock);

module.exports = router;
