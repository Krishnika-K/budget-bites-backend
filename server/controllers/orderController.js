const Order = require("../models/Order");

// POST: Place a new order
const placeOrder = async (req, res) => {
  try {
    console.log("📦 Incoming Order Payload:", req.body);
    const { userEmail, items, total } = req.body;

    // Validation Check
    if (!userEmail || !Array.isArray(items) || items.length === 0 || !total) {
      return res.status(400).json({
        error:
          "Validation failed. 'userEmail', 'items' (non-empty), and 'total' are required.",
      });
    }

    const newOrder = new Order({ userEmail, items, total });
    await newOrder.save();

    res.status(201).json({ message: "Order placed!", order: newOrder });
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Server error while placing order" });
  }
};

// GET: View all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Server error while fetching orders" });
  }
};

module.exports = { placeOrder, getOrders };
