const Product = require("../models/Product");

// @route  GET /api/products
// @access Público
// @desc   Lista productos. Acepta ?menuCategory=Calientes para filtrar (lo usa el Menu del cliente)
async function getProducts(req, res, next) {
  try {
    const filter = {};
    if (req.query.menuCategory) filter.menuCategory = req.query.menuCategory;
    if (req.query.productType) filter.productType = req.query.productType;

    const products = await Product.find(filter).sort({ title: 1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
}

// @route  GET /api/products/:id
// @access Público
async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Producto no encontrado");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

// @route  POST /api/products
// @access Admin
async function createProduct(req, res, next) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

// @route  PUT /api/products/:id
// @access Admin
async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // regresa el documento ya actualizado
      runValidators: true,
    });

    if (!product) {
      res.status(404);
      throw new Error("Producto no encontrado");
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}

// @route  DELETE /api/products/:id
// @access Admin
async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Producto no encontrado");
    }
    await product.deleteOne();
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    next(error);
  }
}

// @route  PATCH /api/products/:id/stock
// @access Admin
// @desc   Marca un producto como disponible/agotado (stock es booleano en tu modelo)
async function updateStock(req, res, next) {
  try {
    const { stock } = req.body;

    if (typeof stock !== "boolean") {
      res.status(400);
      throw new Error("El stock debe ser true (disponible) o false (agotado)");
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );

    if (!product) {
      res.status(404);
      throw new Error("Producto no encontrado");
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
};
