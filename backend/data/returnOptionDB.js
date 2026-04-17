import { pool } from "./database.js";

export async function get_return_options() {
  const [result] = await pool.query(`
    SELECT * FROM return_option
  `);
  return result;
}