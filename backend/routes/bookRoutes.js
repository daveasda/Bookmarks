
import express from "express";

import { listBooks } from "../controllers/bookController.js";

import {
  getRatingSummary,
  getMyBookRating,
  submitBookRating,
} from "../controllers/ratingController.js";

import {
  requireAuth,
  requireCustomer,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all books (public)
router.get("/", listBooks);

// Get a book's average rating and total ratings (public)
router.get("/:id/ratings", getRatingSummary);

// Get the logged-in customer's existing rating
router.get(
  "/:id/ratings/me",
  requireAuth,
  requireCustomer,
  getMyBookRating
);

// Submit a new rating or update an existing rating
router.post(
  "/:id/ratings",
  requireAuth,
  requireCustomer,
  submitBookRating
);

export default router;
