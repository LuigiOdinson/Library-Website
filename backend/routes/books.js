import express from 'express';
import * as booksDB from "../data/booksDB.js"

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await booksDB.get_books();
  res.status(200).json(books);
});

router.post("/", async (req, res) => {
  const {book_name, published_at, genre, author} = req.body;

  // getting the ids from genre and author names
  const genre_result = await booksDB.get_genre_id(genre);
  const author_result = await booksDB.get_author_id(author);

  if (!genre_result) {
    res.status(400).json({error: "This genre hasn't been registered in the database"});
  }
  if (!author_result) {
    res.status(400).json({error: "This author hasn't been registered in the database"});
  }

  const genre_id =  genre_result[0].id;
  const author_id = author_result[0].id;

  const [book] = await booksDB.add_book(book_name, published_at, genre_id, author_id);

  if (book) {
    res.status(201).json({message: `book ${book.book_name} added to the library`});
  }
})

router.post("/search", async (req, res) => {
  const {search, genre} = req.body;
  const books = await booksDB.get_books(search, genre);
  res.status(200).json(books);
});

router.get("/:id", async (req, res) => {
  const book_id = req.params.id;
  const [book] = await booksDB.get_single_book(book_id);
  if (!book){
    res.status(404).send('book not found')
    return
  }
  res.json(book)
})

router.put("/", async(req, res) => {
  const {book_id, borrowed} = req.body;
  const [book] = await booksDB.update_book_status(book_id, borrowed);
  res.json(book);
})

export default router;