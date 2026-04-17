import { pool } from "./database.js";

export async function get_borrow() {
  const result = await pool.query(`
      SELECT * FROM borrow
  `)
  return result;
}

export async function get_borrows_info_by_user(user_id) {
  const result = await pool.query(`
      SELECT * FROM book_borrow_returnOption
      WHERE user_id = ?
  `, [user_id]);
  return result;
}

export async function get_single_borrow(id) {
  const [result] = await pool.query(`
    SELECT * FROM borrow
    WHERE id = ?
  `, [id])
  return result;
}

export async function add_borrow(book_id, user_id, return_option_id){
  const [result] = await pool.query(`
    INSERT INTO borrow (book_id, user_id, return_option_id)
    VALUES (?, ?, ?)
  `, [book_id, user_id, return_option_id]);
  const borrow_id = result.insertId;
  return get_single_borrow(borrow_id);
}

export async function update_borrow_status(borrow_id, returned_at){
  await pool.query(`
    UPDATE borrow
    SET returned_at = ?
    WHERE id = ?
  `, [returned_at, borrow_id])
  return get_single_borrow(borrow_id);
}

export async function update_borrow_fine(borrow_id, borrow_fine) {
  await pool.query(`
    UPDATE borrow
    SET borrow_fine = ?
    WHERE id = ?
  `, [borrow_fine, borrow_id]);
  return get_single_borrow(borrow_id);
}