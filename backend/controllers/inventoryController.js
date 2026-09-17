const InventoryItem = require("../models/InventoryItem");

// @route  GET /api/inventory
// @access Admin
async function getInventory(req, res, next) {
  try {
    const items = await InventoryItem.find().sort({ name: 1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
}

// @route  POST /api/inventory
// @access Admin
async function createItem(req, res, next) {
  try {
    const item = await InventoryItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

// @route  PUT /api/inventory/:id
// @access Admin
async function updateItem(req, res, next) {
  try {
    const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      res.status(404);
      throw new Error("Insumo no encontrado");
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
}

// @route  DELETE /api/inventory/:id
// @access Admin
async function deleteItem(req, res, next) {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error("Insumo no encontrado");
    }
    await item.deleteOne();
    res.json({ message: "Insumo eliminado" });
  } catch (error) {
    next(error);
  }
}

module.exports = { getInventory, createItem, updateItem, deleteItem };
