import express from 'express';
import * as borrowDB from "../data/borrowDB.js"
import * as usersDB from "../data/usersDB.js"
import * as booksDB from "../data/booksDB.js"

const router = express.Router();

// auth middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.user_id) {
    next();
  }
  else {
    res.status(400).json({error: "Login first"});
  }
}

router.get("/", async (req, res) => {
  const [borrow] = await borrowDB.get_borrow();
  res.json(borrow);
});

// borrowed books and borrow info for the current user
router.get("/myBorrows", isAuthenticated, async (req, res) => {
  const user_id = req.session.user_id;
  const [myBorrows] = await borrowDB.get_borrows_info_by_user(user_id);

  let active = [];
  let history = [];
  // if borrow has been returned it gets added to history, else it's still active
  myBorrows.forEach((borrow) => {
    if (borrow.returned_at) { // if returned_at value isn't null
      history.push(borrow);
    } else {
      active.push(borrow);
    }
  });

  let totalFine = 0;
  let totalBorrows = 0;
  myBorrows.map((borrow) => {
    totalFine += Number(borrow.borrow_fine);
    totalBorrows++;
  })

  res.status(200).json({active, history, totalBorrows, totalFine});
});

router.post("/", isAuthenticated, async (req, res) => {
  const {book_id, return_option_id} = req.body;
  const user_id = req.session.user_id;

  const [user] = await usersDB.findUserById(user_id);
  const [book] = await booksDB.get_single_book(book_id);

  if (user.banned){
    return res.status(400).json({ error: 'User is banned' });
  }
  if (book.borrowed){
    return res.status(400).json({ error: 'Book is already borrowed' })
  }
  const [borrow] = await borrowDB.add_borrow(book_id, user_id, return_option_id);
  await booksDB.update_book_status(book_id, true);

  res.json({message: "Book Borrowed successfully", borrow: borrow});
})

router.put("/:borrow_id", async (req, res) => {
  const {returned_at, borrow_fine} = req.body;
  const borrow_id = req.params.borrow_id;
  
  if (returned_at) {
    const borrow = await borrowDB.update_borrow_status(borrow_id, returned_at);
    res.json({message: "returned_at updated", borrow: borrow});
  }
  if (borrow_fine) {
    const borrow = await borrowDB.update_borrow_fine(borrow_id, borrow_fine);
    res.json({message: "borrow_fine updated", borrow: borrow});
  }
})

export default router;