const express = require("express");
const { createUser, uploadFile } = require("../controllers/userController");

const router = express.Router();

// User registration route
router.post("/register", createUser);

// File upload route
router.post("/upload", uploadFile);

module.exports = router;
