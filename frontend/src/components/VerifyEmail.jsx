
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { API_URL } from "../config/api";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState(
    "Verifying your email address..."
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification link is missing or invalid.");
      return;
    }

    let cancelled = false;

    const verify = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/auth/verify-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        if (cancelled) return;

        if (!response.ok) {
          setStatus("error");
          setMessage(
            data.message || "Email verification failed."
          );
          return;
        }

        setStatus("success");
        setMessage(
          data.message ||
            "Your email has been verified successfully!"
        );
      } catch (error) {
        if (cancelled) return;

        console.error("Email verification error:", error);
        setStatus("error");
        setMessage(
          "Unable to verify your email. Please try again."
        );
      }
    };

    verify();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <>
      <Navbar />

      <main className="account-page">
        <div className="account-container">
          <div
            className="account-box"
            style={{
              maxWidth: "520px",
              margin: "40px auto",
              textAlign: "center",
            }}
          >
            <h1 className="account-title">
              Email Verification
            </h1>

            {status === "loading" && (
              <p role="status">{message}</p>
            )}

            {status === "success" && (
              <>
                <p
                  className="profile-success"
                  role="status"
                >
                  {message}
                </p>

                <p>
                  Your email address is confirmed.
                  You can now log in to BookMarks.
                </p>

                <Link
                  to="/account"
                  className="account-submit-btn"
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    marginTop: "20px",
                  }}
                >
                  Go to Login
                </Link>
              </>
            )}

            {status === "error" && (
              <>
                <p
                  className="profile-error"
                  role="alert"
                >
                  {message}
                </p>

                <p>
                  The verification link may have expired
                  or already been used.
                </p>

                <Link to="/account">
                  Return to Account
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default VerifyEmail;
