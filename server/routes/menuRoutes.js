const express = require("express");
const router = express.Router();
const {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
} = require("../controllers/menuController");

router.get("/", getMenuItems);
router.post("/", addMenuItem); // Optional: Add menu items via backend
router.put("/:id", updateMenuItem);
module.exports = router;
