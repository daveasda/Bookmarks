import pool from "../config/db.js"

export const findAccountByEmail = async (email) => {
    const result = await pool.query(
        `SELECT account_id, full_name, email, password_hash, role, is_active
         FROM account
         WHERE LOWER(email) = $1`,
         [email.toLowerCase()]
    );

    return result.rows[0];
};

export const createAccount = async (fullName, email, passwordHash) => {
    const result = await pool.query(
         `INSERT INTO account (full_name, email, password_hash, role)
          VALUES ($1, $2, $3, 'customer')
          RETURNING account_id, full_name, email, role`,
          [fullName, email, passwordHash]
    );

    return result.rows[0];
};