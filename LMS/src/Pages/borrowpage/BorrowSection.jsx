import { useState } from "react"
import { useParams, useNavigate } from "react-router";
import axios from "axios"

export default function BorrowSection({ returnOptions }) {
  const { bookId } = useParams();
  const [returnOptionId, setReturnOptionId] = useState(1);
  const [borrowMessage, setBorrowMessage] = useState("");
  const navigate = useNavigate();

  const borrowButtonClicked = async () => {
    try {
      const res = await axios.post('/api/borrow', {
      book_id: bookId,
      return_option_id: returnOptionId,
      });

      setBorrowMessage(res.data.message);

      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    }
    catch (err) {
      setBorrowMessage(err.response.data.error);
    }
  }

  return (
    <div className="borrow-section">
      <p className='borrow-option-title'>
        Choose your return due-date:
      </p>
      {
        returnOptions.map((returnOption) => {

          const returnOptionClicked = () => {
            setReturnOptionId(returnOption.id)
          }

          return (
            <div key={returnOption.id} className="return-option" onClick={returnOptionClicked}>
              <input type="radio" name={bookId} checked={returnOption.id === returnOptionId} onChange={() => {}}/>
              <div className="return-option-date">
                <span style={{ fontSize: "14px" }}>Return on: </span>12/12/12
              </div>
              <div className="return-option-fine">
                <span style={{ fontSize: "14px" }}>Fine for not returning: </span>{returnOption.fine} Toman
              </div>
            </div>
          )
        })
      }

      <div className="borrow-button-div">
        <button className='borrow-button' onClick={borrowButtonClicked}>Borrow</button>
      </div>

      {borrowMessage && 
      <div className="message-section">
        <p>{borrowMessage}</p>
      </div>}
    </div>
  )
}
