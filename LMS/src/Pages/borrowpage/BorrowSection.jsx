import { useState } from "react"
import { useParams, useNavigate } from "react-router";
import ReturnOptions from "./ReturnOptions";
import axios from "axios"

export default function BorrowSection({ returnOptions }) {
  const { bookId } = useParams();
  const [returnOptionId, setReturnOptionId] = useState(1);
  const [borrowError, setBorrowError] = useState("");
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
      setBorrowError(err.response.data.error);
    }
  }

  return (
    <div className="borrow-section">
      <p className='borrow-option-title'>
        Choose your return due-date:
      </p>
      
      <ReturnOptions returnOptions={returnOptions} returnOptionId={returnOptionId} setReturnOptionId={setReturnOptionId} />

      <div className="borrow-button-div">
        <button className='global-button-style' onClick={borrowButtonClicked}>Borrow</button>
      </div>

      {borrowError && 
      <div className="message-section">
        <p>{borrowError}</p>
      </div>}

      {borrowMessage && 
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popup-row">
            <img src="/images/check-icon.ico" alt="check-icon" className="check-icon" />
            {borrowMessage}
          </div>
          <div className="popup-row">Moving you to your profile page...</div>
        </div>
        
      </div>}
    </div>
  )
}
