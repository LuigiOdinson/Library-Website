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

export async function add_book(book_name, published_at, genre_id, author_id) {
  // making the image url path
  const book_name_kebab = book_name.toLowerCase().replaceAll(' ', '-');
  const img_url = `http://localhost:8080/book-covers/${book_name_kebab}.jpg`;

  const [result] = await pool.query(`
    INSERT INTO book (book_name, published_at, img_url)
    VALUES (?, ?, ?)  
  `, [book_name, published_at, img_url]);

  const book_id = result.insertId;

  await pool.query(`
    INSERT INTO books_genres (book_id, genre_id) VALUES (? ,?);
  `, [book_id, genre_id]);

  await pool.query(`
    INSERT INTO books_authors (book_id, author_id) VALUES (? ,?);
  `, [book_id, author_id]);

  return get_single_book(book_id);
}

export async function update_book_status(book_id, borrowed) {
  await pool.query(`
    UPDATE book
    SET borrowed = ?
    WHERE id = ?
  `, [borrowed, book_id]);
  return get_single_book(book_id);
}

// GENRES AND AUTHORS

export async function get_genres() {
  const [result] = await pool.query(`
    SELECT * FROM genre
  `);
  return result.length ? result : null
}

export async function get_genre_id(genre) {
  const [result] = await pool.query(`
    SELECT id FROM genre WHERE genre_name = ?
  `, [genre]);
  return result.length ? result : null
}

export async function get_author_id(author) {
  const [result] = await pool.query(`
    SELECT id FROM author WHERE author_name = ?
  `, [author]);
  return result.length ? result : null
}