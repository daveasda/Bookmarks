import React from "react";
import BookCard from "./BookCard.jsx";

function BookSection({ title, books }) {
  return (
    <section className="book-section">
      <h2>{title}</h2>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default BookSection;
