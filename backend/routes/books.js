import express from 'express';
import * as booksDB from "../data/booksDB.js"

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await booksDB.get_books();
  res.status(200).json(books);
});

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