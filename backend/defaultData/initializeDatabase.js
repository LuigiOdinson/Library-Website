import { defaultBooks } from "./defaultBooks.js";
import * as booksDB from "../data/booksDB.js"

export async function addDefautBooks() {
  const books = await booksDB.get_books();

  if (books.length === 0) {
    defaultBooks.forEach(async (book) => {
      // getting the ids from genre and author names
      const genre_result = await booksDB.get_genre_id(book.genre_name);
      const author_result = await booksDB.get_author_id(book.author_name);
      const genre_id = genre_result[0].id;
      const author_id = author_result[0].id;
  
      await booksDB.add_book(
        book.book_name,
        book.published_at,
        genre_id,
        author_id
      );

    });

  }
}
