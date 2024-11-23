const bcrypt = require("bcrypt");
const pool = require("../config/db");
const multer = require("multer");
const path = require("path");

// User registration by Admin
exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO user_credential (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

// File upload by User
exports.uploadFile = [
  upload.single("file"),
  async (req, res) => {
    const { userId } = req.body;
    const filePath = req.file.path;
    try {
      await pool.query(
        "INSERT INTO user_files (user_id, file_path) VALUES ($1, $2)",
        [userId, filePath]
      );
      res.status(201).json({ message: "File uploaded successfully" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },
];
