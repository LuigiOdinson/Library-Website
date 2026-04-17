import dayjs from "dayjs"

export default function ActiveBorrowsSection({ active }) {
  if (!active) { return <div>Loading</div> }
  if (active.length === 0) {
    return (
      <div className="active-borrows-section">
        <p className="title">No active borrows</p>
      </div>
    )
  }

  return (
    <div className="active-borrows-section">
      <p className="title">Currently borrowed:</p>
      <div className="books-container">
        {
          active.map((borrow) => {
            // calculating return date
            let borrowedAtMS = dayjs(borrow.borrowed_at).valueOf();
            let currentTimeMS = dayjs().valueOf();
            
            let borrowedAtDate = dayjs(borrowedAtMS).format("DD-MM-YYYY");
            let returnAtDate = dayjs(borrowedAtMS).add(borrow.return_option_days, 'day').format("DD-MM-YYYY");
            
            // calculating percentage of time elapsed
            let timeElapsedMS = currentTimeMS - borrowedAtMS;

            // ----------------FOR TESTING------------------
            //timeElapsedMS = dayjs(timeElapsedMS).add(3, 'day')
            // ---------------------------------------------

            let totalDaysMS = borrow.return_option_days * (24 * 60 * 60 * 1000);
            let timeElapsedPercentage = (timeElapsedMS / totalDaysMS) * 100;
            let timeElapsedComplete = (timeElapsedPercentage >= 100);

            return (
              <div className="book-container" key={borrow.id}>

                <div className="book-details">
                  <img src="/images/They Both Die At The End by Adam Silvera.jpeg" alt="" />
                  <p>{borrow.book_name}</p>
                  <p>{borrow.author_name}</p>
                </div>

                <div className="return-status">
                  <div>
                    {
                      timeElapsedComplete
                        ? <p className="return-status-text">Please Return the book</p>
                        : <p className="return-status-text">Time Left to return:</p>
                    }

                    <div className="progress-bar-section">
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${timeElapsedPercentage}%` }}></div>
                      </div>
                      <div className="dates-container">
                        <p className="date">borrowed at: {borrowedAtDate}</p>
                        <p className="date">(total days: {borrow.return_option_days} days)</p>
                        <p className="date">return at: {returnAtDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}
