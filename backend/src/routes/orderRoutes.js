import express from 'express'
import { allOrders, placeOrder, singleOrder, updateOrderStatus, userOrders } from '../controllers/orderControllers.js'
const ordersRouter = express.Router()

ordersRouter.post("/place-order", placeOrder)
ordersRouter.get("/user-orders/:id", userOrders)
ordersRouter.get("/get-all", allOrders)
ordersRouter.get("/single-order/:id", singleOrder)
ordersRouter.put("/update-status/:id", updateOrderStatus)


export default ordersRouter