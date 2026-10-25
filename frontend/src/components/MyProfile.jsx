import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Temporary order data.
// Later, these orders will come from PostgreSQL.
const sampleOrders = [
  {
    id: "BM-1001",
    date: "15 Oct 2026",
    items: "The Mad Ship",
    total: 4140,
    status: "Delivered",
  },
  {
    id: "BM-1002",
    date: "18 Oct 2026",
    items: "Atomic Habits",
    total: 3250,
    status: "Processing",
  },
  {
    id: "BM-1003",
    date: "20 Oct 2026",
    items: "The Silent Patient, The Alchemist",
    total: 5850,
    status: "Shipped",
  },
  {
    id: "BM-1004",
    date: "21 Oct 2026",
    items: "The Psychology of Money",
    total: 2890,
    status: "Pending",
  },
];

function MyProfile() {
  const formatPrice = (price) =>
    `Rs. ${price.toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const totalOrders = sampleOrders.length;

  const deliveredOrders = sampleOrders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const activeOrders = sampleOrders.filter(
    (order) =>
      order.status === "Pending" ||
      order.status === "Processing" ||
      order.status === "Shipped"
  ).length;

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <div className="profile-container">

          {/* PAGE TITLE */}
          <h1 className="profile-title">My Profile</h1>

          {/* WELCOME SECTION */}
          <section className="profile-welcome">
            <div>
              <p className="profile-eyebrow">
                MY ACCOUNT
              </p>

              <h2>Welcome to BookMarks!</h2>

              <p>
                Manage your account and keep track of
                your latest book orders, all in one place.
              </p>
            </div>

            <Link
              to="/books"
              className="profile-shop-btn"
            >
              Continue Shopping
            </Link>
          </section>

          {/* ACCOUNT OVERVIEW */}
          <section className="profile-overview">

            <div className="profile-info-card">
              <h3>Account Details</h3>

              <div className="profile-info-row">
                <span>Name</span>
                <strong>Alex Perera</strong>
              </div>

              <div className="profile-info-row">
                <span>Email</span>
                <strong>alex@example.com</strong>
              </div>

              <div className="profile-info-row">
                <span>Phone</span>
                <strong>0777123456</strong>
              </div>

              <p className="profile-demo-note">
                Sample account details
              </p>
            </div>

            <div className="profile-stats">

              <div className="profile-stat-card">
                <span>Total Orders</span>
                <strong>{totalOrders}</strong>
              </div>

              <div className="profile-stat-card">
                <span>Active Orders</span>
                <strong>{activeOrders}</strong>
              </div>

              <div className="profile-stat-card">
                <span>Delivered</span>
                <strong>{deliveredOrders}</strong>
              </div>

            </div>
          </section>

          {/* MY ORDERS */}
          <section className="profile-orders">

            <div className="profile-orders-heading">
              <div>
                <p className="profile-eyebrow">
                  ORDER HISTORY
                </p>
                <h2>My Orders</h2>
              </div>
            </div>

            <div className="profile-table-wrapper">
              <table className="profile-orders-table">

                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Books</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {sampleOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="profile-order-id">
                        {order.id}
                      </td>

                      <td>{order.date}</td>

                      <td>{order.items}</td>

                      <td>{formatPrice(order.total)}</td>

                      <td>
                        <span
                          className={`profile-status profile-status-${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default MyProfile;
