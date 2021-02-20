import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc   Pcreate order item
// @route  POST / api/orders
// @access private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json({ createOrder });
  }
});

// @desc   Pcreate order item
// @route  POST / api/orders
// @access private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found!");
  }
});

// @desc   update order to paid
// @route  PUT /api/orders/:id/pay
// @access private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.PaidAt - Date.now();

    // The Response come from API Gateway
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Payment is Failed. Something Went Wrong");
  }
});

export { addOrderItems, getOrderById, updateOrderToPaid };
