import Stripe from "stripe";

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from front end
const placeOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivey Charges" },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error!" });
  }
};

// verify order
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Payment Successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Not Paid" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error!" });
  }
};

// get user orders
const userOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error!" });
  }
};

// get all orders from all users
const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: true, message: "Error!" });
  }
};

// update order status
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    await orderModel.findByIdAndUpdate(orderId, { status });
    res
      .status(200)
      .json({ success: true, message: "Status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Error!" });
  }
};

export { placeOrder, verifyOrder, userOrders, getOrders, updateStatus };
