import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  const coverUrl =
    book.image ||
    (book.isbn
      ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`
      : "/images/no-cover.jpg");

  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <div className="book-card-cover">
        <img
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          className="book-card-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/no-cover.jpg";
          }}
        />

        {Number(book.stock_quantity) === 0 && (
          <span className="book-badge">OUT OF STOCK</span>
        )}
      </div>

      <div className="book-card-content">
        <span className="book-category">{book.genre}</span>
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-price">
          Rs. {Number(book.price).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

export default BookCard;
