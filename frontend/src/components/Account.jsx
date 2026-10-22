
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Account() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [register, setRegister] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLogin((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    setRegister((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Frontend-only login
  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/my-profile");
  };

  // Frontend-only registration
  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/my-profile");
  };

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

                <button
                  type="submit"
                  className="account-submit-btn"
                >
                  Login
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
                    minLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="account-submit-btn"
                >
                  Register
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
