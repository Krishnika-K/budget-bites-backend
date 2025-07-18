const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

app.use((req, res, next) => {
  console.log(`📦 Incoming ${req.method} request to ${req.url}`);
  next();
});
// Serve static files from public folder
app.use("/public", express.static("public"));
app.use(express.json());
// Routes
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/auth", require("./routes/auth")); // If you added auth

// Root test route
app.get("/", (req, res) => {
  res.send("🍔 Welcome to Budget Bites Backend!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Catch-all 404
app.use((req, res) => {
  res.status(404).send(`❌ Route not found: ${req.originalUrl}`);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
