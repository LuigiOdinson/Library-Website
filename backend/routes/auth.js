import express from "express"
import bcrypt from "bcrypt"
import * as usersDB from "../data/usersDB.js"

const router = express.Router();

router.post("/register", async (req, res) => {
  const {first_name, last_name, birth_date, email, password, address} = req.body;

  if (!first_name || !email || !password){
    return res.status(400).json({error: "Please provide your name, email and password"});
  }

  try {
    const [user] = await usersDB.findUserByEmail(email);
  if (user) {
    return res.status(400).json({error: "User with this email already exists", user: user.first_name});
  } 

  // hashing password
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  const [newUser] = await usersDB.register({first_name, last_name, birth_date, email, password:hashedPassword, address});

  res.status(201).json({message: "user registered", user: newUser.first_name});

  } catch (error) {
    console.log(error);
  }
})


router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({error: "Provide email and password"});
  }
  
  try {
    const [user] = await usersDB.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({error: "Invalid email or password: User wasn't found"});
    }

    // checking password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({error: "Invalid password"});
    }

    // setting session var
    req.session.user_id = user.id;

    res.status(201).json({message: "user loged in", user: user});

  } catch (error) {
    console.log(error);
  }
})

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({error: "error when loging out"});
    }
    res.clearCookie('connect.sid');
    res.status(201).json({message: "user logged out"});
  })
})

router.get("/profile", async (req, res) => {
  if (req.session.user_id) {
    const [user] = await usersDB.findUserById(req.session.user_id);
    res.json(user);
  }
  else {
    res.status(401).json({error: "not logged in"});
  }
})

export default router;