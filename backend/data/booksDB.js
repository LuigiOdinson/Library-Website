import { pool } from "./database.js";


export async function get_books(search, genre) {
  let query = 'SELECT * FROM book_genre_author'
  let values = []
  let conditions = []

  if (search) {
    const searchTerm = `%${search}%`
    if (!genre) { // just search 
      conditions.push(' book_name LIKE ? OR author_name LIKE ? ')
      values.push(searchTerm, searchTerm)
    } else { // search with genre filter
      conditions.push('( book_name LIKE ? OR author_name LIKE ? ) AND genre_name LIKE ?')
      const genreTerm = `%${genre}%`
      values.push(searchTerm, searchTerm, genreTerm)
    }
  }

  if (genre) {
    conditions.push(' genre_name LIKE ? ')
    const genreTerm = `%${genre}%`
    values.push(genreTerm)
  }
  if (conditions.length > 0) { // we have at least one condition
    query += ` WHERE` + conditions.join(' AND ');
  }

  const [result] = await pool.query(query, values)
  return result
}

export async function get_single_book(id) {
  const [result] = await pool.query(`
    SELECT * FROM book_genre_author
    WHERE id = ?
  `, [id])
  return result.length ? result : null
}

export async function add_book(book_name, published_at) {
  const [result] = await pool.query(`
    INSERT INTO book (book_name, published_at)
    VALUES (?, ?)  
  `, [book_name, published_at])
  const id = result.insertId
  return get_single_book(id)
}

export async function update_book_status(book_id, borrowed) {
  await pool.query(`
    UPDATE book
    SET borrowed = ?
    WHERE id = ?
  `, [borrowed, book_id]);
  return get_single_book(book_id);
}

export async function get_genres() {
  const [result] = await pool.query(`
    SELECT * FROM genre
  `);
  return result.length ? result : null
}