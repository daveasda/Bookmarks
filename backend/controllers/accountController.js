
import { randomBytes, createHash } from "node:crypto";

import {
  findAccountById,
  findAccountByEmail,
  updateAccount,
  storeEmailVerificationToken,
} from "../models/accountModel.js";

import { sendEmailVerificationEmail } from "../services/emailService.js";

// ------------------------------------------
// GET MY PROFILE
// ------------------------------------------

export const getMyProfile = async (req, res) => {
  try {
    const account = await findAccountById(req.accountId);

    if (!account) {
      return res.status(401).json({
        message: "Account not found or inactive.",
      });
    }

    return res.json({ account });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Unable to load profile.",
    });
  }
};

// ------------------------------------------
// UPDATE MY PROFILE
// ------------------------------------------

export const saveMyProfile = async (req, res) => {
  try {
    const { full_name, email, phone } = req.body || {};

    // Validate name and email
    if (
      typeof full_name !== "string" ||
      !full_name.trim() ||
      full_name.trim().length > 150 ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      email.trim().length > 254
    ) {
      return res.status(400).json({
        message: "Please enter valid account details.",
      });
    }

    // Validate phone number: digits only, or empty
    if (
      phone != null &&
      (typeof phone !== "string" ||
        (phone.trim() !== "" &&
          !/^[0-9]{1,20}$/.test(phone.trim())))
    ) {
      return res.status(400).json({
        message:
          "Phone number must contain only digits (maximum 20).",
      });
    }

    const cleanName = full_name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone?.trim() || null;

    const currentAccount = await findAccountById(req.accountId);

    if (!currentAccount) {
      return res.status(401).json({
        message: "Account not found or inactive.",
      });
    }

    const emailChanged =
      cleanEmail !== currentAccount.email.toLowerCase();

    if (emailChanged) {
      const existing = await findAccountByEmail(cleanEmail);

      if (existing) {
        return res.status(409).json({
          message: "This email address is already in use.",
        });
      }
    }

    // Save name and phone, but retain the current email
    // until the new address is verified.
    const account = await updateAccount(
      req.accountId,
      cleanName,
      currentAccount.email,
      cleanPhone
    );

    if (emailChanged) {
      const existing = await findAccountByEmail(cleanEmail);

      if (existing) {
        return res.status(409).json({
          message: "This email address is already in use.",
          account,
        });
      }

      const token = randomBytes(32).toString("hex");

      const tokenHash = createHash("sha256")
        .update(token)
        .digest("hex");

      await storeEmailVerificationToken(
        req.accountId,
        tokenHash,
        cleanEmail
      );

      const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, "");

      if (!frontendUrl) {
        throw new Error("FRONTEND_URL is missing.");
      }

      const verifyUrl =
        `${frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;

      await sendEmailVerificationEmail({
        email: cleanEmail,
        fullName: cleanName,
        verifyUrl,
      });

      return res.json({
        message:
          "Profile updated. Please check your new email address to confirm the email change.",
        emailVerificationPending: true,
        account,
      });
    }

    return res.json({
      message: "Profile updated successfully!",
      account,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "This email address is already in use.",
      });
    }

    return res.status(500).json({
      message: "Unable to save profile.",
    });
  }
};
