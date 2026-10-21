import React from "react";
import {Link} from "react-router-dom";

function BookCard({book}) {
    return (
        <Link to={`/book/${book.id}`} className="book-card">
            <img src={book.image} alt={book.title} className="book-card-image" />
            <h3> {book.title}</h3>
            <p> {book.author}</p>
            <p className="book-price">Rs. {book.price}</p>
        </Link>
    );

}

export default BookCard;