import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemModel.js";

// @desc  Fetch all orders
// @route GET /api/v1/orders
// @access  Private

const getOrders = async (req, res) => {
  try {
    const result = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

// @desc  Fetch order by id
// @route GET /api/v1/orders/:id
// @access  Private

const getOrderById = async (req, res) => {
  try {
    const result = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });
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
  const totalPrices = await Promise.all(
    orderItemIdResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );
  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  console.log(totalPrice);
  const {
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    user,
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
// @desc Update an Order
// @route PUT /api/v1/orders/:id
// @access  Private
const updateOrder = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;

    const updated = await order.save();
    res.status(201).json(updated);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};
// @desc  DELETE order
// @route DELETE /api/v1/orders/:id
// @access  Private/admin

const deleteOrder = async (req, res) => {
  const deletOrder = await Order.findById(req.params.id);
  if (deletOrder) {
    await deletOrder.orderItems.map(async (orderItem) => {
      await OrderItem.findByIdAndRemove(orderItem);
    });
    await deletOrder.remove();
    res.status(200).json({ success: true, message: "Order Deleted" });
  } else {
    res.status(404).json({ success: false, message: "Order Not Found" });
  }
};

// @desc  GET tgotal sales
// @route GET /api/v1/orders/get/totalsales
// @access  Private/admin
const getTotalSales = async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);
  if (!totalSales) {
    return res.status(400).json({ message: "Total sales cannot be generated" });
  }
  res.status(200).json({ totalsales: totalSales.pop().totalsales });
};
// @desc Count Number Order
// @route GET /api/v1/orders/get/countOrders
// @access  Private
const countOrder = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments((count) => count);
    if (!orderCount) {
      res.status(500).json({ success: false, message: "Order Not Found" });
    }
    res.status(200).send({ orderCount: orderCount });
  } catch (err) {
    console.log(err);
  }
};

// @desc  Fetch order by Userid
// @route GET /api/v1/orders/get/userorders/:userid
// @access  Private

const getOrderByUserId = async (req, res) => {
  try {
    const result = await Order.find({ user: req.params.userid })
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      })
      .sort({ dateOrdered: -1 });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err, success: false });
  }
};

export {
  getOrders,
  addOrderItems,
  getOrderById,
  updateOrder,
  deleteOrder,
  getTotalSales,
  countOrder,
  getOrderByUserId,
};
