import express from "express";

import {
  requireAuth,
  requireCustomer,
} from "../middleware/authMiddleware.js";

import {
  listMyShelves,
  updateMyShelf,
  deleteFromMyShelf,
  getMyGoal,
  updateMyGoal,
  getMyWrapped,
} from "../controllers/readingTrackerController.js";

const router = express.Router();

// All Reading Tracker features require
// a logged-in, active customer account.
router.use(requireAuth, requireCustomer);

// ==========================================
// BOOKSHELVES
// ==========================================

// View all books on the customer's shelves
router.get("/shelves", listMyShelves);

// Add a book or move it to another shelf
router.put("/shelves/:bookId", updateMyShelf);

// Remove a book from the customer's shelves
router.delete("/shelves/:bookId", deleteFromMyShelf);

// ==========================================
// YEARLY READING GOALS
// ==========================================

// Get reading goal and progress
router.get("/goal", getMyGoal);

// Create or update reading goal
router.put("/goal", updateMyGoal);

// ==========================================
// BOOKMARKS WRAPPED
// ==========================================

// Get the customer's yearly reading recap
router.get("/wrapped", getMyWrapped);

export default router;
