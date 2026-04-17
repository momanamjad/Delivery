import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { listOrders, placeOrder, updateStatus, userOrders } from "../controllers/orderController.js";
import { verifyOrder } from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);


export default orderRouter;
