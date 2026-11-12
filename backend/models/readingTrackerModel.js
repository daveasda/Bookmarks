
import pool from "../config/db.js";

// ==========================================
// 1. GET ALL BOOKS ON A CUSTOMER'S SHELVES
// ==========================================

export async function getCustomerShelves(accountId) {
  const result = await pool.query(
    `
    SELECT
      rt.tracker_id,
      rt.book_id,
      rt.shelf,
      rt.started_at,
      rt.finished_at,
      rt.created_at,
      b.title,
      b.cover_url,
      b.isbn,
      a.name AS author_name,
      g.name AS genre_name
    FROM reading_tracker rt
    JOIN book b ON b.book_id = rt.book_id
    LEFT JOIN author a ON a.author_id = b.author_id
    LEFT JOIN genre g ON g.genre_id = b.genre_id
    WHERE rt.account_id = $1
    ORDER BY rt.updated_at DESC, rt.tracker_id DESC
    `,
    [accountId]
  );

  return result.rows;
}

// ==========================================
// 2. ADD A BOOK OR MOVE IT TO ANOTHER SHELF
// ==========================================

export async function saveBookToShelf(
  accountId,
  bookId,
  shelf
) {
  const result = await pool.query(
    `
    INSERT INTO reading_tracker (
      account_id,
      book_id,
      shelf,
      started_at,
      finished_at
    )
    VALUES (
      $1,
      $2,
      $3::VARCHAR,
      CASE
        WHEN $3::VARCHAR = 'currently_reading'
        THEN CURRENT_DATE
        ELSE NULL
      END,
      CASE
        WHEN $3::VARCHAR = 'read'
        THEN CURRENT_DATE
        ELSE NULL
      END
    )
    ON CONFLICT (account_id, book_id)
    DO UPDATE SET
      shelf = EXCLUDED.shelf,

      started_at = CASE
        WHEN EXCLUDED.shelf = 'currently_reading'
        THEN COALESCE(
          reading_tracker.started_at,
          CURRENT_DATE
        )
        ELSE reading_tracker.started_at
      END,

      finished_at = CASE
        WHEN EXCLUDED.shelf = 'read'
        THEN COALESCE(
          reading_tracker.finished_at,
          CURRENT_DATE
        )
        ELSE NULL
      END,

      updated_at = NOW()

    RETURNING *
    `,
    [accountId, bookId, shelf]
  );

  return result.rows[0];
}

// ==========================================
// 3. REMOVE A BOOK FROM ALL SHELVES
// ==========================================

export async function removeBookFromShelf(
  accountId,
  bookId
) {
  const result = await pool.query(
    `
    DELETE FROM reading_tracker
    WHERE account_id = $1
      AND book_id = $2
    RETURNING tracker_id
    `,
    [accountId, bookId]
  );

  return result.rowCount > 0;
}

// ==========================================
// 4. GET CUSTOMER'S YEARLY GOAL
// ==========================================

export async function getReadingGoal(accountId, year) {
  const result = await pool.query(
    `
    SELECT
      goal_id,
      goal_year,
      target_books
    FROM reading_goal
    WHERE account_id = $1
      AND goal_year = $2
    `,
    [accountId, year]
  );

  return result.rows[0] || null;
}

// ==========================================
// 5. CREATE OR UPDATE YEARLY GOAL
// ==========================================

export async function saveReadingGoal(
  accountId,
  year,
  targetBooks
) {
  const result = await pool.query(
    `
    INSERT INTO reading_goal (
      account_id,
      goal_year,
      target_books
    )
    VALUES ($1, $2, $3)
    ON CONFLICT (account_id, goal_year)
    DO UPDATE SET
      target_books = EXCLUDED.target_books,
      updated_at = NOW()
    RETURNING *
    `,
    [accountId, year, targetBooks]
  );

  return result.rows[0];
}

// ==========================================
// 6. GET YEARLY READING STATISTICS
// ==========================================

export async function getReadingStats(accountId, year) {
  const result = await pool.query(
    `
    SELECT
      COUNT(*)::INTEGER AS books_read,
      COUNT(DISTINCT b.author_id)::INTEGER
        AS authors_read,
      COUNT(DISTINCT b.genre_id)::INTEGER
        AS genres_read
    FROM reading_tracker rt
    JOIN book b ON b.book_id = rt.book_id
    WHERE rt.account_id = $1
      AND rt.shelf = 'read'
      AND rt.finished_at >= MAKE_DATE($2::INTEGER, 1, 1)
      AND rt.finished_at <
          MAKE_DATE(($2::INTEGER + 1), 1, 1)
    `,
    [accountId, year]
  );

  return result.rows[0];
}

// ==========================================
// 7. GET TOP AUTHORS FOR WRAPPED
// ==========================================

export async function getTopAuthors(accountId, year) {
  const result = await pool.query(
    `
    SELECT
      a.author_id,
      a.name,
      a.image_url,
      COUNT(*)::INTEGER AS books_read
    FROM reading_tracker rt
    JOIN book b ON b.book_id = rt.book_id
    JOIN author a ON a.author_id = b.author_id
    WHERE rt.account_id = $1
      AND rt.shelf = 'read'
      AND rt.finished_at >= MAKE_DATE($2::INTEGER, 1, 1)
      AND rt.finished_at <
          MAKE_DATE(($2::INTEGER + 1), 1, 1)
    GROUP BY a.author_id, a.name, a.image_url
    ORDER BY books_read DESC, a.name ASC
    LIMIT 5
    `,
    [accountId, year]
  );

  return result.rows;
}

// ==========================================
// 8. GET TOP GENRES FOR WRAPPED
// ==========================================

export async function getTopGenres(accountId, year) {
  const result = await pool.query(
    `
    SELECT
      g.genre_id,
      g.name,
      COUNT(*)::INTEGER AS books_read
    FROM reading_tracker rt
    JOIN book b ON b.book_id = rt.book_id
    JOIN genre g ON g.genre_id = b.genre_id
    WHERE rt.account_id = $1
      AND rt.shelf = 'read'
      AND rt.finished_at >= MAKE_DATE($2::INTEGER, 1, 1)
      AND rt.finished_at <
          MAKE_DATE(($2::INTEGER + 1), 1, 1)
    GROUP BY g.genre_id, g.name
    ORDER BY books_read DESC, g.name ASC
    LIMIT 5
    `,
    [accountId, year]
  );

  return result.rows;
}
