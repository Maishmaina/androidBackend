import Order from "../models/orderModel.js";

// @desc  Fetch all orders
// @route GET /api/v1/orders
// @access  Public

const getOrders = async (req, res) => {
  try {
    const result = await Order.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

export { getOrders };
