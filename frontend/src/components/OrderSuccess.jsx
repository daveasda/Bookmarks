
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  const formatPrice = (value) =>
    `Rs. ${Number(value).toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <div
          className="checkout-container"
          style={{ maxWidth: "750px", padding: "70px 20px" }}
        >
          <section
            className="checkout-billing"
            style={{ textAlign: "center" }}
          >
            {order ? (
              <>
                <h1>Order Placed Successfully!</h1>

                <p>Thank you for shopping with BookMarks.</p>

                <h2>Order #{order.orderId}</h2>

                <p>Confirmation email: {order.email}</p>

                <h3>Order Summary</h3>

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="checkout-summary-row"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>

                    <strong>
                      {formatPrice(item.lineTotal)}
                    </strong>
                  </div>
                ))}

                <div className="checkout-summary-row">
                  <span>Subtotal</span>
                  <strong>{formatPrice(order.subtotal)}</strong>
                </div>

                <div className="checkout-summary-row">
                  <span>Delivery</span>
                  <strong>{formatPrice(order.deliveryFee)}</strong>
                </div>

                <div className="checkout-summary-row checkout-total">
                  <span>Total</span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>

                <p>
                  Payment method: Cash on Delivery
                </p>
              </>
            ) : (
              <>
                <h1>Order Confirmation</h1>
                <p>
                  No order details are available on this page.
                </p>
              </>
            )}

            <Link to="/books">Continue Shopping</Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default OrderSuccess;
