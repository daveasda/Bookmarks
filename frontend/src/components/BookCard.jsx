import React from "react";
import {Link} from "react-router-dom";

function BookCard({book}) {

    const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`;


    return (
        <Link to={`/book/${book.id}`} className="book-card">
            <img src={coverUrl} className="book-card-image" loading="lazy" onError = {(e) => { e.currentTarget.onerror=null; e.currentTarget.src="/images/no-cover.jpg";}} />
            <h3> {book.title}</h3>
            <p> {book.author}</p>
            <p className="book-price">Rs. {book.price}</p>
        </Link>
    );

}

export default BookCard;