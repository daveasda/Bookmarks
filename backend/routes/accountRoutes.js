import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { getMyProfile, saveMyProfile } from "../controllers/accountController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/me", getMyProfile);
router.put("/me", saveMyProfile);

export default router;