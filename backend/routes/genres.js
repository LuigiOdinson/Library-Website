import express from 'express';
import * as booksDB from "../data/booksDB.js"

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await booksDB.get_genres();
  res.status(200).json(genres);
})

export default router;