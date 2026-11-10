
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_URL } from "../config/api";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();

    setMessage("");

    if (!password) {
      setMessage("Please enter a password.");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!token) {
      setMessage("Invalid reset link.");
      return;
    }

    setBusy(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await response.json();

      setMessage(
        data.message || "Unable to reset password."
      );

      if (response.ok) {
        setSuccess(true);
        setPassword("");
        setConfirm("");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="account-page">
        <div className="account-container">
          <h1 className="account-title">
            Reset Password
          </h1>

          <section
            className="account-box"
            style={{
              maxWidth: 480,
              margin: "auto",
            }}
          >
            {!token ? (
              <p role="alert">
                Invalid reset link. Please request another.
              </p>
            ) : !success ? (
              <form
                className="account-form"
                onSubmit={submit}
              >
                <div className="account-field">
                  <label htmlFor="new-password">
                    New Password
                  </label>

                  <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="account-field">
                  <label htmlFor="confirm-password">
                    Confirm New Password
                  </label>

                  <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(event) =>
                      setConfirm(event.target.value)
                    }
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="account-submit-btn"
                  disabled={busy}
                >
                  {busy
                    ? "Saving..."
                    : "Reset Password"}
                </button>
              </form>
            ) : null}

            {message && (
              <p
                role="status"
                className={
                  success
                    ? "profile-success"
                    : "profile-error"
                }
              >
                {message}
              </p>
            )}

            <Link to="/account">
              Back to Login
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
