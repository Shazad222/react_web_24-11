// const bcrypt = require("bcrypt");
// const pool = require("../config/db");

// // Admin registration
// exports.registerAdmin = async (req, res) => {
//   const { name, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       "INSERT INTO admin_credential (name, password) VALUES ($1, $2) RETURNING *",
//       [name, hashedPassword]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };

// // Admin login
// exports.loginAdmin = async (req, res) => {
//   const { name, password } = req.body;
//   try {
//     const result = await pool.query(
//       "SELECT * FROM admin_credential WHERE name = $1",
//       [name]
//     );
//     if (result.rows.length === 0)
//       return res.status(401).json({ error: "Invalid credentials" });

//     const admin = result.rows[0];
//     const match = await bcrypt.compare(password, admin.password);
//     if (!match) return res.status(401).json({ error: "Invalid credentials" });

//     res.status(200).json({ message: "Login successful" });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };

const bcrypt = require("bcrypt");
const pool = require("../config/db");

// Admin registration
exports.registerAdmin = async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO admin_credential (name, password) VALUES ($1, $2) RETURNING *",
      [name, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  const { name, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM admin_credential WHERE name = $1",
      [name]
    );
    if (result.rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const admin = result.rows[0];
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Get all user files for admin
exports.getAllFiles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user_files");
    res.status(200).json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
