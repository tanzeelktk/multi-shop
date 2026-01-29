import express from "express";
import {
  allOrders,
  placeOrder,
  singleOrder,
  updateOrderStatus,
  userOrders,
} from "../controllers/orderControllers.js";
import { adminOnly, protect } from "../middlewares/auth.middleware.js";
const ordersRouter = express.Router();

ordersRouter.post("/place-order", protect, placeOrder);
ordersRouter.get("/user-orders",protect, userOrders);
ordersRouter.get("/get-all",protect, adminOnly, allOrders);
ordersRouter.get("/single-order/:id",protect, singleOrder);
ordersRouter.put("/update-status/:id",protect, adminOnly, updateOrderStatus);

export default ordersRouter;
