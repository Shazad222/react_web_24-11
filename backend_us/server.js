const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
