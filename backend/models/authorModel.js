import pool from "../config/db.js";

// Get one author using their ID
export const getAuthorById = async (authorId) => {
  const result = await pool.query(
    `
    SELECT
      author_id,
      name,
      biography,
      image_url
    FROM author
    WHERE author_id = $1
    `,
    [authorId]
  );

  return result.rows[0] || null;
};

// Get all active books written by this author
export const getBooksByAuthorId = async (authorId) => {
  const result = await pool.query(
    `
    SELECT
      b.book_id AS id,
      b.title,
      a.author_id,
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
    WHERE b.author_id = $1
      AND b.is_active = true
    ORDER BY b.title ASC
    `,
    [authorId]
  );

  return result.rows.map((book) => ({
    ...book,
    price: Number(book.price),
  }));
};


// Search authors by their names
export const searchAuthors = async (searchTerm) => {
  const result = await pool.query(
    `
      SELECT
        author_id,
        name,
        biography,
        image_url
      FROM author
      WHERE name ILIKE $1
      ORDER BY name ASC
      LIMIT 20
    `,
    [`%${searchTerm}%`]
  );

  return result.rows;
};
