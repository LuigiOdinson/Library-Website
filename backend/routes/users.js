import express from "express"
import * as usersDB from "../data/usersDB.js"

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await usersDB.get_users();
  res.json(users);
})

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const user = await usersDB.get_single_user(user_id);
  res.json(user);
})


export default router;