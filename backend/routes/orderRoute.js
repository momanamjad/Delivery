import express from "express";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/adminAuth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  getStats
} from "../controllers/orderController.js";
import { verifyOrder } from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders", authMiddleware, userOrders);
orderRouter.get("/list", adminMiddleware, listOrders);
orderRouter.post("/status", adminMiddleware, updateStatus);
orderRouter.get("/stats", adminMiddleware, getStats);

export default orderRouter;
