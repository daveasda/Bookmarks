import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "../context/CartContext.jsx";
import { useBooks } from "../context/BookContext.jsx";

function BookDetails() {
  const { id } = useParams();
  const { books, loading, error } = useBooks();
  const {addToCart} = useCart();

  const book = books.find(
    (item) => String(item.id) === String(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  
  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>Unable to load book details: {error}</p>;
  }

  if (!book) {
    return (
      <>
        <Navbar />
        <main className="book-details-page">
          <div className="book-details-container">
            <h1>Book not found</h1>
            <p>We couldn't find the book you're looking for.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const formatPrice = (price) =>
    `Rs. ${price.toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const increaseQuantity = () => {
    setQuantity((previous) => previous + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((previous) => Math.max(1, previous - 1));
  };

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setCartMessage(
      `${quantity} × ${book.title} added to cart successfully!`
    );
  };

  const handleSubmitRating = () => {
    if (userRating === 0) {
      alert("Please select a star rating first.");
      return;
    }

    setRatingSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="book-details-page">
        <div className="book-details-container">

          {/* MAIN BOOK SECTION */}
          <section className="book-details-layout">

            {/* BOOK COVER */}
            <div className="book-details-image-area">
              <img
                src={book.image}
                alt={book.title}
                className="book-details-image"
              />
            </div>

            {/* BOOK INFORMATION */}
            <div className="book-details-information">

              <p className="book-details-category">
                {book.category}
              </p>

              <h1>{book.title}</h1>

              <p className="book-details-author">
                by {book.author}
              </p>

              <p className="book-details-price">
                {formatPrice(book.price)}
              </p>

              <h3>Description</h3>

              <p className="book-details-description">
                {book.description}
              </p>

              <p className="book-details-description">
                {book.details}
              </p>

              {/* QUANTITY AND ADD TO CART */}
              <div className="book-details-actions">

                <div className="book-details-quantity">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="book-details-cart-btn"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>

              </div>
              {cartMessage && (
                <p className="book-cart-success" role="status"> {cartMessage} </p>
              )}

              {/* PRODUCT DETAILS */}
              <div className="book-details-extra">
                <h2>Product Details</h2>

                <p>
                  Discover more about this edition of
                  {" "}{book.title}.
                </p>

                <div className="book-details-specs">
                  <div>
                    <span>Author</span>
                    <strong>{book.author}</strong>
                  </div>

                  <div>
                    <span>Publisher</span>
                    <strong>{book.publisher}</strong>
                  </div>

                  <div>
                    <span>Language</span>
                    <strong>{book.language}</strong>
                  </div>

                  <div>
                    <span>Format</span>
                    <strong>{book.format}</strong>
                  </div>
                </div>
              </div>

              {/* REVIEWS */}
              <div className="book-details-reviews">

                <h2>Reviews</h2>

                {/* HARDCODED OVERALL RATING */}
                <div className="book-overall-rating">
                  <div
                    className="book-overall-stars"
                    aria-hidden="true"
                  >
                    ★★★★★
                  </div>

                  <strong> {book.rating == null? "Not rated yet" : `${book.rating.toFixed(2)} /5`} </strong>

                  <span>Overall Rating</span>
                </div>

                {/* USER RATING */}
                <h3>Rate this book</h3>

                <div
                  className="book-user-stars"
                  role="group"
                  aria-label="Select your rating"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => {
                        setUserRating(star);
                        setRatingSubmitted(false);
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      aria-label={`Rate ${star} out of 5`}
                      aria-pressed={userRating === star}
                      className={
                        star <= (hoverRating || userRating)
                          ? "selected"
                          : ""
                      }
                    >
                      ★
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="book-rating-submit"
                  onClick={handleSubmitRating}
                >
                  Submit Rating
                </button>

                {ratingSubmitted && (
                  <p className="book-rating-message">
                    Thank you! You rated this book
                    {" "}{userRating} out of 5 stars.
                  </p>
                )}

                
              </div>

            </div>

          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BookDetails;
