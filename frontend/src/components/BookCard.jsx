import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {

  const coverUrl = book.image ||
    `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`;

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

        {book.stock === 0 && (
          <span className="book-badge">
            OUT OF STOCK
          </span>
        )}
      </div>

      <div className="book-card-content">
        <span className="book-category">{book.genre}</span>
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-price">
          Rs. {book.price.toLocaleString()}
        </p>
      </div>

    </Link>
  );
}

export default BookCard;
