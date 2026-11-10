import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomBytes, createHash } from "node:crypto";

import {
  createAccount,
  findAccountByEmail,
  storeEmailVerificationToken,
  consumeEmailVerificationToken,
  storePasswordResetToken,
  consumePasswordResetToken,
} from "../models/accountModel.js";

import {
  sendEmailVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
} from "../services/emailService.js";

// ------------------------------------------
// HELPERS
// ------------------------------------------

const sha256 = (value) =>
  createHash("sha256").update(value).digest("hex");

const validEmail = (email) =>
  typeof email === "string" &&
  email.length <= 254 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const createToken = () => randomBytes(32).toString("hex");

const frontendUrl = () => {
  const url = process.env.FRONTEND_URL?.replace(/\/$/, "");

  if (!url) {
    throw new Error("FRONTEND_URL is missing.");
  }

  return url;
};

const setAuthCookie = (res, accountId) => {
  const token = jwt.sign(
    { accountId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
};

const publicAccount = (account) => ({
  account_id: account.account_id,
  full_name: account.full_name,
  email: account.email,
  role: account.role,
  phone: account.phone,
  is_active: account.is_active,
  email_verified: account.email_verified,
});

// ------------------------------------------
// REGISTER
// ------------------------------------------

export const register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body || {};

    if (
      typeof full_name !== "string" ||
      !full_name.trim() ||
      full_name.trim().length > 150 ||
      !validEmail(email) ||
      typeof password !== "string" ||
      password.length === 0
    ) {
      return res.status(400).json({
        message: "Please enter valid registration details.",
      });
    }

    const cleanName = full_name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!validEmail(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    const existing = await findAccountByEmail(cleanEmail);

    if (existing) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const account = await createAccount(
      cleanName,
      cleanEmail,
      passwordHash
    );

    const token = createToken();

    await storeEmailVerificationToken(
      account.account_id,
      sha256(token)
    );

    const verifyUrl =
      `${frontendUrl()}/verify-email?token=${encodeURIComponent(token)}`;

    try {
      await sendEmailVerificationEmail({
        email: cleanEmail,
        fullName: cleanName,
        verifyUrl,
      });
    } catch (emailError) {
      console.error("Registration verification email failed:", emailError);

      return res.status(503).json({
        message:
          "Account created, but the verification email could not be sent. Please request another verification email.",
      });
    }

    // No login cookie is created until verification.
    return res.status(201).json({
      message:
        "Registration successful! Please check your email to verify your account.",
      requiresVerification: true,
      email: cleanEmail,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      message: "Server error during registration.",
    });
  }
};

// ------------------------------------------
// LOGIN
// ------------------------------------------

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const account = await findAccountByEmail(
      email.trim().toLowerCase()
    );

    if (!account || !account.is_active) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      account.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (!account.email_verified) {
      return res.status(403).json({
        message:
          "Please verify your email address before logging in.",
        requiresVerification: true,
      });
    }

    setAuthCookie(res, account.account_id);

    return res.json({
      message: "Login successful!",
      account: publicAccount(account),
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error during login.",
    });
  }
};

// ------------------------------------------
// VERIFY EMAIL
// ------------------------------------------

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body || {};

    if (
      typeof token !== "string" ||
      !/^[a-f0-9]{64}$/i.test(token)
    ) {
      return res.status(400).json({
        message: "Invalid verification link.",
      });
    }

    const account = await consumeEmailVerificationToken(
      sha256(token)
    );

    if (!account) {
      return res.status(400).json({
        message:
          "This verification link is invalid or has expired.",
      });
    }

    return res.json({
      message:
        "Email verified successfully! You can now log in.",
    });
  } catch (error) {
    console.error("Verify email error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "This email address is already in use.",
      });
    }

    return res.status(500).json({
      message: "Unable to verify email right now.",
    });
  }
};

// ------------------------------------------
// RESEND VERIFICATION EMAIL
// ------------------------------------------

export const resendVerification = async (req, res) => {
  const responseMessage =
    "If an unverified account exists for this email, a verification link will be sent.";

  try {
    const { email } = req.body || {};

    if (!validEmail(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    const account = await findAccountByEmail(
      email.trim().toLowerCase()
    );

    if (
      !account ||
      !account.is_active ||
      account.email_verified
    ) {
      return res.json({ message: responseMessage });
    }

    const token = createToken();

    await storeEmailVerificationToken(
      account.account_id,
      sha256(token)
    );

    const verifyUrl =
      `${frontendUrl()}/verify-email?token=${encodeURIComponent(token)}`;

    await sendEmailVerificationEmail({
      email: account.email,
      fullName: account.full_name,
      verifyUrl,
    });

    return res.json({ message: responseMessage });
  } catch (error) {
    console.error("Resend verification error:", error);

    return res.status(500).json({
      message: "Unable to send verification email right now.",
    });
  }
};

// ------------------------------------------
// LOGOUT
// ------------------------------------------

export const logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    path: "/",
  });

  return res.json({
    message: "Logged out successfully.",
  });
};

// ------------------------------------------
// FORGOT PASSWORD
// ------------------------------------------

const resetMessage =
  "If an active account exists for this email, a password reset link will be sent.";

export const forgotPassword = async (req, res) => {
  const { email } = req.body || {};

  if (!validEmail(email)) {
    return res.status(400).json({
      message: "Enter a valid email address.",
    });
  }

  try {
    const account = await findAccountByEmail(
      email.trim().toLowerCase()
    );

    if (account?.is_active && account.email_verified) {
      const token = createToken();

      await storePasswordResetToken(
        account.account_id,
        sha256(token)
      );

      const resetUrl =
        `${frontendUrl()}/reset-password?token=${encodeURIComponent(token)}`;

      await sendPasswordResetEmail({
        email: account.email,
        fullName: account.full_name,
        resetUrl,
      });
    }

    return res.json({
      message: resetMessage,
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      message: "Unable to process your request right now.",
    });
  }
};

// ------------------------------------------
// RESET PASSWORD
// ------------------------------------------

export const resetPassword = async (req, res) => {
  const { token, password } = req.body || {};

  if (
    typeof token !== "string" ||
    !/^[a-f0-9]{64}$/i.test(token) ||
    typeof password !== "string" ||
    password.length === 0
  ) {
    return res.status(400).json({
      message: "Invalid reset link or password.",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const account = await consumePasswordResetToken(
      sha256(token),
      passwordHash
    );

    if (!account) {
      return res.status(400).json({
        message:
          "This reset link is invalid or has expired.",
      });
    }

    try {
      await sendPasswordChangedEmail({
        email: account.email,
        fullName: account.full_name,
      });
    } catch (emailError) {
      console.error(
        "Password changed notification failed:",
        emailError
      );
    }

    return res.json({
      message:
        "Password updated. You can now log in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      message: "Unable to reset password right now.",
    });
  }
};