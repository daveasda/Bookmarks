
import {
  saveBookRating,
  getBookRatingSummary,
  getCustomerBookRating,
} from "../models/ratingModel.js";

import pool from "../config/db.js";

// Check whether a book ID is valid
const isValidId = (id) => {
  return /^[1-9]\d*$/.test(String(id));
};

// GET /api/books/:id/ratings
// Anyone can view the average rating
export const getRatingSummary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    const summary = await getBookRatingSummary(id);

    return res.status(200).json(summary);

  } catch (error) {
    console.error("Error fetching rating summary:", error);

    return res.status(500).json({
      message: "Unable to load book ratings.",
    });
  }
};

// GET /api/books/:id/ratings/me
// Only logged-in customers can view their own rating
export const getMyBookRating = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    const rating = await getCustomerBookRating(
      req.accountId,
      id
    );

    return res.status(200).json({
      rating,
    });

  } catch (error) {
    console.error("Error fetching customer rating:", error);

    return res.status(500).json({
      message: "Unable to load your rating.",
    });
  }
};

// POST /api/books/:id/ratings
// Only logged-in customers can submit ratings
export const submitBookRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    // Accept only whole numbers from 1 to 5
    if (
      typeof rating !== "number" ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be a whole number between 1 and 5.",
      });
    }

    // Confirm that the book exists and is active
    const bookResult = await pool.query(
      `
        SELECT book_id
        FROM book
        WHERE book_id = $1
          AND is_active = true
      `,
      [id]
    );

    if (bookResult.rows.length === 0) {
      return res.status(404).json({
        message: "Book not found.",
      });
    }

    // Save or update the rating
    // req.accountId comes from requireAuth middleware
    const savedRating = await saveBookRating(
      req.accountId,
      id,
      rating
    );

    // Get the updated average and total ratings
    const summary = await getBookRatingSummary(id);

    return res.status(200).json({
      message: "Your rating has been saved successfully.",
      rating: savedRating.rating,
      average_rating: summary.average_rating,
      total_ratings: summary.total_ratings,
    });

  } catch (error) {
    console.error("Error saving book rating:", error);

    return res.status(500).json({
      message: "Unable to save your rating.",
    });
  }
};
