const express = require("express");
const {
  getInventory,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/inventoryController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/", getInventory);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
