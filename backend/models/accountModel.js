import pool from "../config/db.js"

export const findAccountByEmail = async (email) => {
    const result = await pool.query(
        `SELECT account_id, full_name, email, password_hash,
            phone, role, is_active, created_at, updated_at
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
          RETURNING account_id, full_name, email, phone,
               role, is_active, created_at, updated_at`,
          [fullName, email, passwordHash]
    );

    return result.rows[0];
};

export const findAccountById = async (accountId) => {
  const result = await pool.query(
    `SELECT account_id, full_name, email, phone,
            role, is_active, created_at, updated_at
     FROM account
     WHERE account_id = $1 AND is_active = TRUE`,
    [accountId]
  );

  return result.rows[0];
};

export const updateAccount = async (accountId, fullName, email, phone) => {
    const result = await pool.query(
        `UPDATE account
         SET full_name = $1,
         email = $2,
         phone = $3,
         updated_at = NOW()
        WHERE account_id = $4 AND is_active = TRUE
        RETURNING account_id, full_name, email, phone,
               role, is_active, created_at, updated_at`,
        [fullName, email, phone, accountId]
    );

  return result.rows[0];
};