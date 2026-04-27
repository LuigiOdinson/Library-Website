import { useState, useEffect } from "react"
import { useParams } from "react-router";
import axios from "axios"

export default function BookSection() {
  const { bookId } = useParams();
  const [book, setBook] = useState();

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`/api/books/${bookId}`);
        setBook(res.data);
      }
      catch (err) {
        console.log(err.response.data.error)
      }
    }
    getBook();
  }, []);

  return (
    <div className="book-section">
      { // show the book info only when book is loaded
        book &&
        <>
          <img src={book.img_url} alt="" />
          <div className="book-info">
            <p>Book Name: {book.book_name}</p>
            <p>Book Author: {book.author_name}</p>
            <p>Published At: {book.published_at}</p>
            <p>Genre: {book.genre_name}</p>

            <p className="borrow-state-message"
              style={{
                color: (book.borrowed) ? 'rgb(255, 106, 106)' : 'rgb(40, 189, 53)',
              }}>
              {
                book.borrowed
                  ? "This book is already borrowed"
                  : "This Book is available"
              }
            </p>
          </div>
        </>
      }
    </div>
  )
}
