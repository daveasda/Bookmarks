import express from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { full_name, email, password } = req.body;
        
        if (
            typeof full_name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !full_name.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({ message: "Invalid input" });
          }
        const cleanName = full_name.trim();
        const cleanEmail = email.trim().toLowerCase();
        
        const passwordHash = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `INSERT INTO account (full_name, email, password_hash, role)
             VALUES ($1, $2, $3, 'customer')
             RETURNING account_id, full_name, email, role`,
             [cleanName, cleanEmail, passwordHash]
        );

        return res.status(201).json({
            message: "Registration successful!",
            account: result.rows[0]
        });
         
    } catch (error) {
        console.error("Registration error: ", error);
        return res.status(500).json({
            message: "Server error during registration."
        });
    }
});

export default router;