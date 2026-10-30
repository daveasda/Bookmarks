import express from "express";
import { placeOrder, getMyOrders, } from "../controllers/orderController.js";
import { optionalAuth, requireAuth,} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/guest", optionalAuth, placeOrder);
router.get("/my", requireAuth, getMyOrders);

export default router;