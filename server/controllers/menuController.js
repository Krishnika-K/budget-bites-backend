const MenuItem = require("../models/MenuItem");

// GET all menu items
const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST add a menu item (optional)
const addMenuItem = async (req, res) => {
  try {
    const { name, image, price } = req.body;
    const newItem = new MenuItem({ name, image, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item updated successfully", item: updatedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMenuItems, addMenuItem, updateMenuItem };
