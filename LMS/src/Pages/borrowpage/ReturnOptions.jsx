import { useParams } from "react-router"
import dayjs from "dayjs"

export default function ReturnOptions({ returnOptions, returnOptionId, setReturnOptionId }) {
  const { bookId } = useParams();
  return (
    returnOptions.map((returnOption) => {

      const returnOptionClicked = () => {
        setReturnOptionId(returnOption.id)
      }

      // calculating return date of return option
      let currentTimeMS = dayjs().valueOf();
      let returnAtDate = dayjs(currentTimeMS).add(returnOption.return_option_days, 'day').format("DD-MM-YYYY");

      return (
        <div key={returnOption.id} className="return-option-container" onClick={returnOptionClicked}>
          <div className="return-option-title">{returnOption.return_option_days} days</div>
          <div className="return-option-grid">
            <input type="radio" name={bookId} checked={returnOption.id === returnOptionId} onChange={() => { }} />
            <div className="return-option-date">
              <span style={{ fontSize: "14px" }}>Return on date: </span>{returnAtDate}
            </div>
            <div className="return-option-fine">
              <span style={{ fontSize: "14px" }}>Fine for not returning: </span>{returnOption.return_option_fine} Toman
            </div>
          </div>
        </div>
      )
    })
  )
}
