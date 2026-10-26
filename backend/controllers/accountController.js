import { findAccountById, updateAccount } from "../models/accountModel.js";

export const getMyProfile = async (req, res) => {
    try {
        const account = await findAccountById(req.accountId);

        if(!account) {
            return res.status(401).json({
                message: "Account not found or inactive",
            });
        }

        return res.json({ account });
    } catch (error) {
        console.error("Get profile error:", error);

        return res.status(500).json({
            message: "Unable to load profile."
        });
    }
};

export const saveMyProfile = async (req, res) => {
  try {
    const { full_name, email, phone } = req.body;

    if (
      typeof full_name !== "string" ||
      typeof email !== "string" ||
      !full_name.trim() ||
      !email.trim() ||
      (phone != null && typeof phone !== "string")
    ) {
      return res.status(400).json({
        message: "Please enter valid account details.",
      });
    }

    const cleanName = full_name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone?.trim() || null;

    

    const account = await updateAccount(
      req.accountId,
      cleanName,
      cleanEmail,
      cleanPhone
    );

    if (!account) {
      return res.status(401).json({
        message: "Account not found or inactive.",
      });
    }

    return res.json({
      message: "Profile updated successfully!",
      account,
    });
  } catch (error) {
    

    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Unable to save profile.",
    });
  }
};



