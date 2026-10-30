import pool from "../config/db.js";

export const getAllBooks = async () => {
  const result = await pool.query(`
    SELECT
      b.book_id AS id,
      b.title,
      a.author_id AS author_id,
      a.name AS author,
      b.isbn,
      b.cover_url AS image,
      b.price,
      g.name AS genre,
      g.name AS category,
      b.description,
      b.stock_quantity,
      b.is_active
    FROM book b
    JOIN author a ON b.author_id = a.author_id
    JOIN genre g ON b.genre_id = g.genre_id
    WHERE b.is_active = true
    ORDER BY b.book_id ASC
  `);

  return result.rows.map((book) => ({
    ...book,
    price: Number(book.price),
    details: book.description,
    publisher: "Not specified",
    language: "English",
    format: "Not specified",
    rating: null,
  }));
};

