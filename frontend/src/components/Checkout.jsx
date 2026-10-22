import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Temporary cart data.
// Later, this will come from your shopping cart.
const sampleCart = [
  {
    id: 1,
    title: "The Mad Ship",
    quantity: 1,
    price: 3690,
  },
];

function Checkout() {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "Sri Lanka",
    street: "",
    apartment: "",
    city: "",
    phone: "",
    confirmPhone: "",
  });

  const [delivery, setDelivery] = useState("home");

  // Update form fields
  const updateForm = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Format prices
  const formatPrice = (price) => {
    return `Rs. ${price.toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Calculate subtotal
  const subtotal = sampleCart.reduce(
    (total, book) => total + book.price * book.quantity,
    0
  );

  // Calculate shipping
  const shipping = delivery === "home" ? 450 : 0;

  // Calculate total
  const total = subtotal + shipping;

  // Handle checkout
  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.phone !== form.confirmPhone) {
      alert("Phone numbers do not match.");
      return;
    }

    const orderData = {
      customer: {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        street: form.street,
        apartment: form.apartment,
        city: form.city,
        phone: form.phone,
      },
      items: sampleCart,
      deliveryMethod: delivery,
      paymentMethod: "cash_on_delivery",
      subtotal,
      shipping,
      total,
    };

    console.log("Order details:", orderData);

    alert(
      "Order details validated. Actual order placement will be available after backend integration."
    );
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main className="checkout-page">
        <div className="checkout-container">

          <h1 className="checkout-title">CHECKOUT DETAILS</h1>

          <form
            className="checkout-layout"
            onSubmit={handleSubmit}
          >

            {/* =========================
                BILLING DETAILS
            ========================= */}

            <section className="checkout-billing">
              <h2>Billing Details</h2>

              <div className="checkout-field">
                <label htmlFor="checkout-email">
                  Email address *
                </label>

                <input
                  id="checkout-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateForm}
                  required
                />
              </div>

              <div className="checkout-field-row">

                <div className="checkout-field">
                  <label htmlFor="checkout-first-name">
                    First name *
                  </label>

                  <input
                    id="checkout-first-name"
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={updateForm}
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="checkout-last-name">
                    Last name *
                  </label>

                  <input
                    id="checkout-last-name"
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={updateForm}
                    required
                  />
                </div>

              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-country">
                  Country / Region *
                </label>

                <select
                  id="checkout-country"
                  name="country"
                  value={form.country}
                  onChange={updateForm}
                  required
                >
                  <option value="Sri Lanka">
                    Sri Lanka
                  </option>
                </select>
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-street">
                  Street address *
                </label>

                <input
                  id="checkout-street"
                  type="text"
                  name="street"
                  placeholder="House number and street name"
                  value={form.street}
                  onChange={updateForm}
                  required
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-apartment">
                  Apartment / Suite (optional)
                </label>

                <input
                  id="checkout-apartment"
                  type="text"
                  name="apartment"
                  placeholder="Apartment, suite, unit, etc."
                  value={form.apartment}
                  onChange={updateForm}
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-city">
                  Town / City *
                </label>

                <input
                  id="checkout-city"
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={updateForm}
                  required
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-phone">
                  Phone Number *
                </label>

                <input
                  id="checkout-phone"
                  type="tel"
                  name="phone"
                  placeholder="0777123456"
                  value={form.phone}
                  onChange={updateForm}
                  required
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="checkout-confirm-phone">
                  Re-type Phone Number *
                </label>

                <input
                  id="checkout-confirm-phone"
                  type="tel"
                  name="confirmPhone"
                  placeholder="0777123456"
                  value={form.confirmPhone}
                  onChange={updateForm}
                  required
                />
              </div>

            </section>

            {/* =========================
                ORDER SUMMARY
            ========================= */}

            <aside className="checkout-summary">

              <h2>Your Order</h2>

              {/* Product and subtotal headings */}
              <div className="checkout-summary-header">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              {/* Products */}
              {sampleCart.map((book) => (
                <div
                  className="checkout-summary-row"
                  key={book.id}
                >
                  <span>
                    {book.title} × {book.quantity}
                  </span>

                  <strong>
                    {formatPrice(
                      book.price * book.quantity
                    )}
                  </strong>
                </div>
              ))}

              {/* Subtotal */}
              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              {/* Shipment */}
              <div className="checkout-shipping">
                <h3>Shipment</h3>

                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="home"
                    checked={delivery === "home"}
                    onChange={(event) =>
                      setDelivery(event.target.value)
                    }
                  />

                  <span>
                    Home Delivery (2–5 days):
                    {" "}
                    {formatPrice(450)}
                  </span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={delivery === "pickup"}
                    onChange={(event) =>
                      setDelivery(event.target.value)
                    }
                  />

                  <span>
                    Pickup from Warehouse: FREE
                  </span>
                </label>

                {delivery === "home" ? (
                  <p className="checkout-delivery-note">
                    Delivery takes 2–5 working days.
                    Your order will be shipped on the
                    next working day. You will be notified
                    when your order is dispatched.
                  </p>
                ) : (
                  <p className="checkout-delivery-note">
                    Your order will be prepared for pickup.
                    You will be notified when it is ready
                    for collection.
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="checkout-summary-row checkout-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              {/* Cash on Delivery */}
              <div className="checkout-payment">
                <h3>Payment Method</h3>

                <div className="checkout-cod">
                  <span className="checkout-cod-indicator"></span>

                  <div>
                    <strong>Cash on Delivery</strong>
                    <p>Pay when you receive your order.</p>
                  </div>
                </div>
              </div>

              {/* Place Order */}
              <button
                type="submit"
                className="checkout-place-order"
              >
                Place Order
              </button>

            </aside>

          </form>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default Checkout;
