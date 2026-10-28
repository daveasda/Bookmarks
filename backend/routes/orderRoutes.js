import express from "express";
import { placeGuestOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/guest", placeGuestOrder);

export default router;