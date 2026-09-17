const express = require("express");
const {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  getDashboard,
} = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect); // todas requieren estar logueado

router.post("/", createOrder);
router.get("/mine", getMyOrders);

router.get("/", authorize("barista", "admin"), getOrders);
router.patch("/:id/status", authorize("barista", "admin"), updateOrderStatus);

router.get("/dashboard", authorize("admin"), getDashboard);

module.exports = router;
