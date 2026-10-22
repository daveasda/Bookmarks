
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Temporary cart data.
// Later, replace this with your actual cart.
const initialCart = [
  {
    id: 1,
    title: "The Mad Ship",
    price: 3690,
    quantity: 1,
    image: "/the-mad-ship.jfif",
  },
];

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(initialCart);

  // Format prices in Sri Lankan Rupees
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Increase or decrease quantity
  const updateQuantity = (id, change) => {
    setCartItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item
      )
    );
  };

  // Remove a book
  const removeItem = (id) => {
    setCartItems((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Navigate to checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <main className="cart-page">
        <div className="cart-container">

          <h1 className="cart-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <h2>Your cart is empty.</h2>
              <p>
                Looks like you haven't added any books yet.
              </p>

              <button
                className="cart-shop-button"
                onClick={() => navigate("/books")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* CART TABLE */}
              <div className="cart-table">

                {/* TABLE HEADER */}
                <div className="cart-table-header">
                  <span className="cart-product-heading">
                    Product
                  </span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Subtotal</span>
                </div>

                {/* CART ITEMS */}
                {cartItems.map((item) => (
                  <div
                    className="cart-table-row"
                    key={item.id}
                  >

                    {/* PRODUCT */}
                    <div className="cart-product">

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                      >
                        ×
                      </button>

                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-product-image"
                      />

                      <span className="cart-product-name">
                        {item.title}
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="cart-price">
                      {formatPrice(item.price)}
                    </div>

                    {/* QUANTITY */}
                    <div className="cart-quantity">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, -1)
                        }
                        disabled={item.quantity === 1}
                        aria-label={`Decrease ${item.title} quantity`}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, 1)
                        }
                        aria-label={`Increase ${item.title} quantity`}
                      >
                        +
                      </button>
                    </div>

                    {/* SUBTOTAL */}
                    <div className="cart-subtotal">
                      {formatPrice(
                        item.price * item.quantity
                      )}
                    </div>

                  </div>
                ))}
              </div>

              {/* CART TOTAL */}
              <div className="cart-total-row">
                <span>Cart Total</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>

              {/* CHECKOUT BUTTON */}
              <div className="cart-actions">
                <button
                  type="button"
                  className="cart-checkout-button"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Cart;
