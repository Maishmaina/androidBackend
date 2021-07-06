import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemModel.js";

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

// @desc  Place an order
// @route POST /api/v1/orders
// @access  Public
const addOrderItems = async (req, res) => {
  const orderItemIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  const orderItemIdResolved = await orderItemIds;
  const {
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    user,
    totalPrice,
  } = req.body;
  let orderItems = orderItemIdResolved;
  if (!orderItems) {
    res.status(400).json({ message: "No order item Found" });
    return;
  } else {
    const order = new Order({
      orderItems,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      user,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

export { getOrders, addOrderItems };
