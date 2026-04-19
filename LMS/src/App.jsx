import { useState, useEffect } from 'react'
import { Routes, Route, useSearchParams } from 'react-router'
import axios from 'axios'
import HomePage from './Pages/homepage/HomePage'
import LoginPage from './Pages/authpages/LoginPage'
import RegisterPage from './Pages/authpages/RegisterPage'
import BorrowPage from './Pages/borrowpage/BorrowPage'
import ProfilePage from './Pages/profilepage/ProfilePage'
import './App.css'
import UserProvider from './UserProvider'

axios.defaults.withCredentials = true;

function App() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const genre = searchParams.get("genre");
  
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    let res;
    if (search || genre) {
      res = await axios.post("/api/books/search", {
        search: search,
        genre: genre
      })
    }
    else {
      res = await axios.get("/api/books");
    }
    setBooks(res.data);
  }
  useEffect(() => {
    getBooks();
  }, [search, genre]) // whenever search or genre changes run getBooks

  return (
    <UserProvider>
      <Routes>
        <Route index element={<HomePage books={books} />}/>
        <Route path='/books/:bookId' element={<BorrowPage />} />
        <Route path='/auth/login' element={<LoginPage />}></Route>
        <Route path='/auth/register' element={<RegisterPage />}></Route>
        <Route path='/profile' element={<ProfilePage />}></Route>
      </Routes>
    </UserProvider>
  );
}

export default App
