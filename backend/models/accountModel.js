import pool from "../config/db.js";

const publicColumns = `
  account_id,
  full_name,
  email,
  phone,
  role,
  is_active,
  email_verified,
  created_at,
  updated_at
`;

export const findAccountByEmail = async (email) => {
  const result = await pool.query(
    `SELECT ${publicColumns}, password_hash
     FROM account
     WHERE LOWER(email) = LOWER($1)`,
    [email]
  );

  return result.rows[0];
};

export const findAccountById = async (accountId) => {
  const result = await pool.query(
    `SELECT ${publicColumns}
     FROM account
     WHERE account_id = $1
       AND is_active = TRUE`,
    [accountId]
  );

  return result.rows[0];
};

export const createAccount = async (
  fullName,
  email,
  passwordHash
) => {
  const result = await pool.query(
    `INSERT INTO account (
       full_name,
       email,
       password_hash,
       role,
       email_verified
     )
     VALUES ($1, $2, $3, 'customer', FALSE)
     RETURNING ${publicColumns}`,
    [fullName, email, passwordHash]
  );

  return result.rows[0];
};

export const updateAccount = async (
  accountId,
  fullName,
  email,
  phone
) => {
  const result = await pool.query(
    `UPDATE account
     SET full_name = $1,
         phone = $2,
         updated_at = NOW()
     WHERE account_id = $3
       AND is_active = TRUE
     RETURNING ${publicColumns}`,
    [fullName, phone, accountId]
  );

  return result.rows[0];
};

// EMAIL VERIFICATION

export const storeEmailVerificationToken = async (
  accountId,
  tokenHash,
  pendingEmail = null
) => {
  await pool.query(
    `INSERT INTO email_verification_token (
       account_id,
       token_hash,
       pending_email,
       expires_at
     )
     VALUES (
       $1,
       $2,
       $3,
       NOW() + INTERVAL '24 hours'
     )
     ON CONFLICT (account_id)
     DO UPDATE SET
       token_hash = EXCLUDED.token_hash,
       pending_email = EXCLUDED.pending_email,
       expires_at = EXCLUDED.expires_at`,
    [accountId, tokenHash, pendingEmail]
  );
};

export const consumeEmailVerificationToken = async (
  tokenHash
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const found = await client.query(
      `SELECT account_id, pending_email
       FROM email_verification_token
       WHERE token_hash = $1
         AND expires_at > NOW()
       FOR UPDATE`,
      [tokenHash]
    );

    if (!found.rows.length) {
      await client.query("ROLLBACK");
      return null;
    }

    const { account_id, pending_email } = found.rows[0];

    const updated = await client.query(
      pending_email
        ? `UPDATE account
           SET email = $1,
               email_verified = TRUE,
               updated_at = NOW()
           WHERE account_id = $2
             AND is_active = TRUE
           RETURNING ${publicColumns}`
        : `UPDATE account
           SET email_verified = TRUE,
               updated_at = NOW()
           WHERE account_id = $1
             AND is_active = TRUE
           RETURNING ${publicColumns}`,
      pending_email
        ? [pending_email, account_id]
        : [account_id]
    );

    if (!updated.rows.length) {
      await client.query("ROLLBACK");
      return null;
    }

    await client.query(
      `DELETE FROM email_verification_token
       WHERE account_id = $1`,
      [account_id]
    );

    await client.query("COMMIT");

    return updated.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// FORGOT PASSWORD - KEEP EXISTING FUNCTIONALITY

export const storePasswordResetToken = async (
  accountId,
  tokenHash
) => {
  await pool.query(
    `INSERT INTO password_reset_token (
       account_id,
       token_hash,
       expires_at
     )
     VALUES (
       $1,
       $2,
       NOW() + INTERVAL '15 minutes'
     )
     ON CONFLICT (account_id)
     DO UPDATE SET
       token_hash = EXCLUDED.token_hash,
       expires_at = EXCLUDED.expires_at`,
    [accountId, tokenHash]
  );
};

export const consumePasswordResetToken = async (
  tokenHash,
  passwordHash
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `SELECT account_id
       FROM password_reset_token
       WHERE token_hash = $1
         AND expires_at > NOW()
       FOR UPDATE`,
      [tokenHash]
    );

    if (!result.rows.length) {
      await client.query("ROLLBACK");
      return null;
    }

    const accountId = result.rows[0].account_id;

    const changed = await client.query(
      `UPDATE account
       SET password_hash = $1,
           updated_at = NOW()
       WHERE account_id = $2
         AND is_active = TRUE
       RETURNING email, full_name`,
      [passwordHash, accountId]
    );

    if (!changed.rows.length) {
      await client.query("ROLLBACK");
      return null;
    }

    await client.query(
      `DELETE FROM password_reset_token
       WHERE account_id = $1`,
      [accountId]
    );

    await client.query("COMMIT");

    return changed.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};