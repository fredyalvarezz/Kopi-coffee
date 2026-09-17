const express = require("express");
const {
  getUsers,
  createStaffUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Todas las rutas de este archivo requieren estar logueado Y ser admin
router.use(protect, authorize("admin"));

router.get("/", getUsers);
router.post("/", createStaffUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
