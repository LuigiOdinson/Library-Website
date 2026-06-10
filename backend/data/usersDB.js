import { pool } from "./database.js";

export async function get_users() {
  const [result] = await pool.query(`
    SELECT * FROM user
  `);
  return result;
}

export async function findUserById(user_id) {
  const [result] = await pool.query(`
    SELECT * FROM user
    WHERE id = ?
  `, [user_id])
  return result.length ? result : [];
}

export async function banUser(user_id) {
  await pool.query(`
    UPDATE user
    SET banned = TRUE
    WHERE id = ?
  `, [user_id]);
  return findUserById(user_id);
}

export async function unbanUser(user_id) {
  await pool.query(`
    UPDATE user
    SET banned = FALSE
    WHERE id = ?
  `, [user_id]);
  return findUserById(user_id);
}

// auth functions
export async function findUserByEmail(email) {
  const [result] = await pool.query(`
    SELECT * FROM user WHERE email = ?
  `, [email])
  return result.length ? result : [];
}

export async function register(registerInputs) {
  const {first_name, last_name, birth_date, email, password, address} = registerInputs;
  await pool.query(`
    INSERT INTO user (first_name, last_name, birth_date, email, password, address)
    VALUES (?, ?, ?, ?, ?, ?) 
  `, [first_name, last_name, birth_date, email, password, address]);
  return findUserByEmail(email);
}