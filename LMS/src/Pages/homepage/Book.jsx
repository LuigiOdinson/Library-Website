import { Link } from "react-router"

export default function Book({book}) {
  return (
    <div className="book">
        <Link to={`/books/${book.id}`}>
          <div className="book-cover">
            <img src="/images/They Both Die At The End by Adam Silvera.jpeg" alt="" />
          </div>
          <div className="book-title-info">
            <h2>{book.book_name}</h2>
            <p>by: {book.author_name}</p>
          </div>
        </Link>
      </div>
  )
}
