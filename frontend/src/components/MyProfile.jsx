import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext.jsx";


// Temporary order data — unchanged.
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

const API_URL = "http://localhost:5000";

function MyProfile() {
  const navigate = useNavigate();
  
  const { setUser } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);


  const [account, setAccount] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/api/account/me`, {
          credentials: "include",
          signal: controller.signal,
        });

        if (response.status === 401) {
          navigate("/account", { replace: true });
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load profile.");
        }

        setAccount(data.account);
        setForm({
          full_name: data.account.full_name ?? "",
          email: data.account.email ?? "",
          phone: data.account.phone ?? "",
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => controller.abort();
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/account/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save changes.");
      }

      setAccount(data.account);
      setForm({
        full_name: data.account.full_name ?? "",
        email: data.account.email ?? "",
        phone: data.account.phone ?? "",
      });

      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      full_name: account.full_name ?? "",
      email: account.email ?? "",
      phone: account.phone ?? "",
    });

    setEditing(false);
    setError("");
  };

  
  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to log out. Please try again.");
      }

      setUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message);
      setLoggingOut(false);
    }
  };

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

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="profile-page">
          <div className="profile-container">
            <p>Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <div className="profile-container">
          <h1 className="profile-title">My Profile</h1>

          {/* WELCOME SECTION */}
          <section className="profile-welcome">
            <div>
              <p className="profile-eyebrow">MY ACCOUNT</p>

              <h2>
                Welcome{account ? `, ${account.full_name}!` : " to BookMarks!"}
              </h2>

              <p>
                Manage your account and keep track of
                your latest book orders, all in one place.
              </p>
            </div>

            
            <div className="profile-welcome-actions">
              <Link to="/books" className="profile-shop-btn">
                Continue Shopping
              </Link>

              <button
                type="button"
                className="profile-logout-btn"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? "Logging Out..." : "Logout"}
              </button>
            </div>

          </section>

          {/* ACCOUNT OVERVIEW */}
          <section className="profile-overview">
            <div className="profile-info-card">
              <div className="profile-account-heading">
                <h3>Account Details</h3>

                {account && !editing && (
                  <button
                    type="button"
                    className="profile-edit-btn"
                    onClick={() => {
                      setEditing(true);
                      setMessage("");
                    }}
                  >
                    Edit Details
                  </button>
                )}
              </div>

              {error && <p className="profile-error" role="alert">{error}</p>}
              {message && <p className="profile-success" role="status">{message}</p>}

              {account && !editing && (
                <>
                  {/* <div className="profile-info-row">
                    <span>Account ID</span>
                    <strong>{account.account_id}</strong>
                  </div> */}

                  <div className="profile-info-row">
                    <span>Name</span>
                    <strong>{account.full_name}</strong>
                  </div>

                  <div className="profile-info-row">
                    <span>Email</span>
                    <strong>{account.email}</strong>
                  </div>

                  <div className="profile-info-row">
                    <span>Phone</span>
                    <strong>{account.phone || "Not provided"}</strong>
                  </div>

                  <div className="profile-info-row">
                    <span>Role</span>
                    <strong>{account.role}</strong>
                  </div>

                  <div className="profile-info-row">
                    <span>Status</span>
                    <strong>{account.is_active ? "Active" : "Inactive"}</strong>
                  </div>

                  <div className="profile-info-row">
                    <span>Joined</span>
                    <strong>
                      {new Date(account.created_at).toLocaleDateString("en-LK")}
                    </strong>
                  </div>

                  <div className="profile-info-row">
                    <span>Last Updated</span>
                    <strong>
                      {new Date(account.updated_at).toLocaleDateString("en-LK")}
                    </strong>
                  </div>
                </>
              )}

              {account && editing && (
                <form className="profile-edit-form" onSubmit={handleSave}>
                  <label htmlFor="profile-name">Full Name</label>
                  <input
                    id="profile-name"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    maxLength={150}
                    required
                  />

                  <label htmlFor="profile-email">Email</label>
                  <input
                    id="profile-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    maxLength={255}
                    required
                  />

                  <label htmlFor="profile-phone">Phone Number</label>
                  <input
                    id="profile-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Not provided"
                    maxLength={20}
                  />

                  <div className="profile-edit-actions">
                    <button
                      type="submit"
                      className="profile-save-btn"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      className="profile-cancel-btn"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {!account && !error && <p>Account unavailable.</p>}
            </div>

            {/* HARDCODED ORDER STATS — UNCHANGED */}
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

          {/* HARDCODED ORDER HISTORY — UNCHANGED */}
          <section className="profile-orders">
            <div className="profile-orders-heading">
              <div>
                <p className="profile-eyebrow">ORDER HISTORY</p>
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
