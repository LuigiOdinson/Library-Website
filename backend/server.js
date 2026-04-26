import express from "express"
import session from "express-session"
import cors from "cors"
import { addDefautBooks } from "./defaultData/initializeDatabase.js"

import bookRoutes from './routes/books.js'
import borrowRoutes from './routes/borrow.js'
import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import genreRoutes from './routes/genres.js'
import returnOptionRoutes from './routes/returnOptions.js'

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Use Routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/returnOptions", returnOptionRoutes);


app.use((err, req, res, next) => {
  res.status(500).send(err)
})
async function startServer() {
  await addDefautBooks(); // initializing database
  app.listen(8080, () => {
    console.log("Server running on port 8080")
  })
}

startServer();