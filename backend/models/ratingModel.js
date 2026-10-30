
import pool from "../config/db.js";

// Save a new rating or update an existing rating
export const saveBookRating = async (
  accountId,
  bookId,
  rating
) => {
  const result = await pool.query(
    `
      INSERT INTO review (
        account_id,
        book_id,
        rating
      )
      VALUES ($1, $2, $3)

      ON CONFLICT (account_id, book_id)
      DO UPDATE SET
        rating = EXCLUDED.rating,
        updated_at = NOW()

      RETURNING
        review_id,
        account_id,
        book_id,
        rating
    `,
    [accountId, bookId, rating]
  );

  return result.rows[0];
};

// Get the average rating and number of ratings
export const getBookRatingSummary = async (bookId) => {
  const result = await pool.query(
    `
      SELECT
        ROUND(AVG(rating)::numeric, 2) AS average_rating,
        COUNT(*)::integer AS total_ratings
      FROM review
      WHERE book_id = $1
    `,
    [bookId]
  );

  return {
    average_rating: result.rows[0].average_rating === null
      ? null
      : Number(result.rows[0].average_rating),

    total_ratings: result.rows[0].total_ratings,
  };
};

// Get the logged-in customer's rating for a book
export const getCustomerBookRating = async (
  accountId,
  bookId
) => {
  const result = await pool.query(
    `
      SELECT rating
      FROM review
      WHERE account_id = $1
        AND book_id = $2
    `,
    [accountId, bookId]
  );

  return result.rows[0]?.rating ?? null;
};
