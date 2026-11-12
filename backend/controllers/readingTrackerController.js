import pool from "../config/db.js";

import {
  getCustomerShelves,
  saveBookToShelf,
  removeBookFromShelf,
  getReadingGoal,
  saveReadingGoal,
  getReadingStats,
  getTopAuthors,
  getTopGenres,
} from "../models/readingTrackerModel.js";

// ==========================================
// HELPERS
// ==========================================

const validShelves = [
  "want_to_read",
  "currently_reading",
  "read",
];

function getValidYear(value) {
  const year = Number(value);

  if (
    !Number.isInteger(year) ||
    year < 2000 ||
    year > 2099
  ) {
    return null;
  }

  return year;
}

// ==========================================
// 1. GET ALL CUSTOMER SHELVES
// GET /api/reading/shelves
// ==========================================

export async function listMyShelves(req, res) {
  try {
    const books = await getCustomerShelves(
      req.accountId
    );

    return res.json({
      books,
      total: books.length,
    });
  } catch (error) {
    console.error("Error loading reading shelves:", error);

    return res.status(500).json({
      message: "Unable to load your bookshelves.",
    });
  }
}

// ==========================================
// 2. ADD OR MOVE BOOK TO SHELF
// PUT /api/reading/shelves/:bookId
// ==========================================

export async function updateMyShelf(req, res) {
  try {
    const bookId = Number(req.params.bookId);
    const { shelf } = req.body;

    if (
      !Number.isSafeInteger(bookId) ||
      bookId <= 0
    ) {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    if (!validShelves.includes(shelf)) {
      return res.status(400).json({
        message: "Please select a valid shelf.",
      });
    }

    // Ensure book exists and is active
    const bookResult = await pool.query(
      `
      SELECT book_id
      FROM book
      WHERE book_id = $1
        AND is_active = TRUE
      `,
      [bookId]
    );

    if (bookResult.rowCount === 0) {
      return res.status(404).json({
        message: "Book not found.",
      });
    }

    const saved = await saveBookToShelf(
      req.accountId,
      bookId,
      shelf
    );

    return res.json({
      message: "Your bookshelf has been updated.",
      book: saved,
    });
  } catch (error) {
    console.error("Error updating bookshelf:", error);

    return res.status(500).json({
      message: "Unable to update your bookshelf.",
    });
  }
}

// ==========================================
// 3. REMOVE BOOK FROM SHELVES
// DELETE /api/reading/shelves/:bookId
// ==========================================

export async function deleteFromMyShelf(req, res) {
  try {
    const bookId = Number(req.params.bookId);

    if (
      !Number.isSafeInteger(bookId) ||
      bookId <= 0
    ) {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    const removed = await removeBookFromShelf(
      req.accountId,
      bookId
    );

    if (!removed) {
      return res.status(404).json({
        message: "This book is not on your shelves.",
      });
    }

    return res.json({
      message: "Book removed from your shelves.",
    });
  } catch (error) {
    console.error("Error removing book:", error);

    return res.status(500).json({
      message: "Unable to remove this book.",
    });
  }
}

// ==========================================
// 4. GET YEARLY READING GOAL
// GET /api/reading/goal?year=2026
// ==========================================

export async function getMyGoal(req, res) {
  try {
    const year = getValidYear(
      req.query.year ?? new Date().getFullYear()
    );

    if (!year) {
      return res.status(400).json({
        message: "Invalid year.",
      });
    }

    const goal = await getReadingGoal(
      req.accountId,
      year
    );

    const stats = await getReadingStats(
      req.accountId,
      year
    );

    const completed = stats.books_read;
    const target = goal?.target_books ?? 0;

    return res.json({
      year,
      goal,
      completed,
      remaining: Math.max(target - completed, 0),
      percentage:
        target > 0
          ? Math.round((completed / target) * 100)
          : 0,
    });
  } catch (error) {
    console.error("Error loading reading goal:", error);

    return res.status(500).json({
      message: "Unable to load your reading goal.",
    });
  }
}

// ==========================================
// 5. CREATE OR UPDATE YEARLY GOAL
// PUT /api/reading/goal
// ==========================================

export async function updateMyGoal(req, res) {
  try {
    const year = getValidYear(
      req.body.year ?? new Date().getFullYear()
    );

    const targetBooks = Number(
      req.body.target_books
    );

    if (!year) {
      return res.status(400).json({
        message: "Invalid goal year.",
      });
    }

    if (
      !Number.isInteger(targetBooks) ||
      targetBooks < 1 ||
      targetBooks > 10000
    ) {
      return res.status(400).json({
        message:
          "Reading goal must be between 1 and 10,000 books.",
      });
    }

    const goal = await saveReadingGoal(
      req.accountId,
      year,
      targetBooks
    );

    return res.json({
      message: "Reading goal saved successfully.",
      goal,
    });
  } catch (error) {
    console.error("Error saving reading goal:", error);

    return res.status(500).json({
      message: "Unable to save your reading goal.",
    });
  }
}

// ==========================================
// 6. GET BOOKMARKS WRAPPED
// GET /api/reading/wrapped?year=2026
// ==========================================

export async function getMyWrapped(req, res) {
  try {
    const year = getValidYear(
      req.query.year ?? new Date().getFullYear()
    );

    if (!year) {
      return res.status(400).json({
        message: "Invalid year.",
      });
    }

    const [
      stats,
      topAuthors,
      topGenres,
      goal,
    ] = await Promise.all([
      getReadingStats(req.accountId, year),
      getTopAuthors(req.accountId, year),
      getTopGenres(req.accountId, year),
      getReadingGoal(req.accountId, year),
    ]);

    return res.json({
      year,
      books_read: stats.books_read,
      authors_read: stats.authors_read,
      genres_read: stats.genres_read,
      top_authors: topAuthors,
      top_genres: topGenres,
      reading_goal: goal?.target_books ?? null,
      goal_completed:
        goal !== null
          ? stats.books_read >= goal.target_books
          : false,
    });
  } catch (error) {
    console.error("Error loading BookMarks Wrapped:", error);

    return res.status(500).json({
      message: "Unable to load your BookMarks Wrapped.",
    });
  }
}
