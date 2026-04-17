import Book from "./Book"

export default function BooksGrid({books}) {
  return (
    <div className="books-grid">
      {
        books.map((book) => {
          return (
            <Book key={book.id} book={book}/>
          )
      })
      }
    </div>
  )
}
