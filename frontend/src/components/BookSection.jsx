import React from "react";
import BookCard from "./BookCard.jsx";

function BookSection({ title, books }) {
  return (
    <section className="book-section">
      <div className="book-section-heading">
        <h2 className="book-section-title">{title}</h2>
        <div className="section-divider"></div>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default BookSection;
