// Backend Route Configuration for Admin (adminRoutes.js)

const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminController");

const router = express.Router();

// Admin registration route
router.post("/register", registerAdmin);

// Admin login route
router.post("/login", loginAdmin);

module.exports = router;
