import { Router } from "express";

import authMiddleware from "../middleware/auth.js";
import {
  getOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/getorders", getOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
