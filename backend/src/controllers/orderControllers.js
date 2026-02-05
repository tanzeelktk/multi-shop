import mongoose from "mongoose";
import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const id = req.user._id; //user id
    const { products, shippingAddress, paymentMethod, shippingPrice } =
      req.body;

    //validation
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    //calculate total price
    const itemsPrice = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const orderId =
      "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 10000) + 1;
    const totalPrice = itemsPrice + (shippingPrice || 0);
    console.log(req.body);
    //create order
    const order = await Order.create({
      orderId,
      user: id,
      products,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const userOrders = async (req, res) => {
  try {
    const id = req.user._id;
    const { status } = req.query;
    let orders;
    if (status !== undefined) {
      orders = await Order.find({ user: id, orderStatus: status }).populate(
        "user",
        "name email",
      );
    } else {
      orders = await Order.find({ user: id });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const singleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email");
    if (!order) {
      return res.status(404).json({ message: "No order id exist" });
    }
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this order" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; //order id
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Completed",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.orderStatus = status;
    if (status === "Delivered") {
      order.deliveredAt = new Date();

      if (order.paymentMethod === "cod") {
        order.isPaid = true;
        order.paidAt = new Date();
      }
    }

    if (status === "Cancelled") {
      order.isPaid = false;
      order.deliveredAt = null;
    }

    await order.save();

    res
      .status(200)
      .json({ message: "Order status updated successfully.", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
