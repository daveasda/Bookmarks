import bcrypt from "bcrypt"
import {createAccount} from "../models/accountModel.js";

export const register = async (req, res) => {
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

        const account = await createAccount(cleanName, cleanEmail, passwordHash);

        return res.status(201).json({
            message: "Registration successful!",
            account: account
        });
         
    } catch (error) {
        console.error("Registration error: ", error);
        return res.status(500).json({
            message: "Server error during registration."
        });
    }
}