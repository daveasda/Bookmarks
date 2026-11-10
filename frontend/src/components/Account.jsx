
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { API_URL } from "../config/api";

function Account() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [register, setRegister] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");

  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate(
        user.role === "admin"
          ? "/admin-dashboard"
          : "/my-profile",
        { replace: true }
      );
    }
  }, [user, loading, navigate]);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLogin((previous) => ({
      ...previous,
      [name]: value,
    }));

    setLoginError("");
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    setRegister((previous) => ({
      ...previous,
      [name]: value,
    }));

    setRegisterError("");
    setRegisterMessage("");
    setResendMessage("");
    setVerificationEmail("");
  };

  // LOGIN
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(login),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setLoginError(
          data.message || "Unable to log in."
        );
        return;
      }

      setUser(data.account);

      navigate(
        data.account.role === "admin"
          ? "/admin-dashboard"
          : "/my-profile",
        { replace: true }
      );
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Unable to connect to the backend.");
    } finally {
      setLoggingIn(false);
    }
  };

  // REGISTER
  const handleRegister = async (event) => {
    event.preventDefault();

    setRegisterError("");
    setRegisterMessage("");
    setResendMessage("");
    setRegistering(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(register),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(
          data.message || "Registration failed."
        );

        if (data.requiresVerification) {
          setVerificationEmail(register.email.trim());
        }

        return;
      }

      // Do not log in before email verification.
      setVerificationEmail(register.email.trim());

      setRegisterMessage(
        data.message ||
          "Registration successful! Check your email to verify your account."
      );

      setRegister({
        full_name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      setRegisterError(
        "Unable to connect to the backend."
      );
    } finally {
      setRegistering(false);
    }
  };

  // RESEND VERIFICATION EMAIL
  const handleResendVerification = async () => {
    if (!verificationEmail || resending) return;

    setResending(true);
    setResendMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: verificationEmail,
          }),
        }
      );

      const data = await response.json();

      setResendMessage(
        data.message ||
          "Unable to send verification email."
      );
    } catch (error) {
      console.error("Resend verification error:", error);
      setResendMessage(
        "Unable to connect to the backend."
      );
    } finally {
      setResending(false);
    }
  };

  if (loading || user) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="account-page">
        <div className="account-container">
          <h1 className="account-title">Account</h1>

          <div className="account-layout">
            {/* LOGIN FORM */}
            <section className="account-box">
              <h2>Login</h2>

              <form
                className="account-form"
                onSubmit={handleLogin}
              >
                <div className="account-field">
                  <label htmlFor="login-email">
                    Email address *
                  </label>

                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={login.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="account-field">
                  <label htmlFor="login-password">
                    Password *
                  </label>

                  <input
                    id="login-password"
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                </div>

                <div className="forgot-password-link">
                  <Link to="/forgot-password">
                    Forgot Password?
                  </Link>
                </div>

                {loginError && (
                  <p
                    className="profile-error"
                    role="alert"
                  >
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className="account-submit-btn"
                  disabled={loggingIn}
                >
                  {loggingIn ? "Logging in..." : "Login"}
                </button>
              </form>
            </section>

            {/* REGISTER FORM */}
            <section className="account-box">
              <h2>Register</h2>

              <form
                className="account-form"
                onSubmit={handleRegister}
              >
                <div className="account-field">
                  <label htmlFor="register-name">
                    Full Name *
                  </label>

                  <input
                    id="register-name"
                    type="text"
                    name="full_name"
                    value={register.full_name}
                    onChange={handleRegisterChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={150}
                    required
                  />
                </div>

                <div className="account-field">
                  <label htmlFor="register-email">
                    Email address *
                  </label>

                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    value={register.email}
                    onChange={handleRegisterChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </div>

                <div className="account-field">
                  <label htmlFor="register-password">
                    Password *
                  </label>

                  <input
                    id="register-password"
                    type="password"
                    name="password"
                    value={register.password}
                    onChange={handleRegisterChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                  />
                </div>

                {registerError && (
                  <p
                    className="profile-error"
                    role="alert"
                  >
                    {registerError}
                  </p>
                )}

                {registerMessage && (
                  <p
                    className="profile-success"
                    role="status"
                  >
                    {registerMessage}
                  </p>
                )}

                {verificationEmail && (
                  <div className="account-verification-info">
                    <p>
                      Verification email:
                      {" "}
                      <strong>{verificationEmail}</strong>
                    </p>

                    <button
                      type="button"
                      className="account-submit-btn"
                      onClick={handleResendVerification}
                      disabled={resending}
                    >
                      {resending
                        ? "Sending..."
                        : "Resend Verification Email"}
                    </button>

                    {resendMessage && (
                      <p role="status">
                        {resendMessage}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="account-submit-btn"
                  disabled={registering}
                >
                  {registering
                    ? "Registering..."
                    : "Register"}
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Account;
