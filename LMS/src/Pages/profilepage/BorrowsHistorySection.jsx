import dayjs from "dayjs"

export default function BorrowsHistorySection({ history }) {
  if (!history) { return <div>Loading</div> }
  if (history.length === 0) {
    return (
      <div className="borrows-history-section">
        <p className="title">No History Yet</p>
      </div>
    )
  }

  return (
    <div className="borrows-history-section">
      <p className="title">History:</p>
      <div className="books-container">
        {
          history.map((borrow) => {

            let borrowedAtMS = dayjs(borrow.borrowed_at).valueOf();
            let returnedAtMS = dayjs(borrow.returned_at).valueOf();
            let borrowedAtDate = dayjs(borrowedAtMS).format("DD-MM-YYYY");
            let returnedAtDate = dayjs(returnedAtMS).format("DD-MM-YYYY");

            return (
              <div key={borrow.id} className="book-container">

                <div className="book-details">
                  <img src="/images/They Both Die At The End by Adam Silvera.jpeg" alt="" />
                  <p>{borrow.book_name}</p>
                  <p>{borrow.author_name}</p>
                </div>

                <div className="return-status">
                  <p>Borrowed at: {borrowedAtDate}</p>
                  <p>Returned at: {returnedAtDate}</p>
                  <p>Fine: {borrow.borrow_fine ? borrow.borrow_fine + "$" : "No Fine"}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
