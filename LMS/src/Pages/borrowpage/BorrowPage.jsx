import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router";
import Header from "../../components/Header";
import BookSection from "./BookSection";
import BorrowSection from './BorrowSection'
import './borrowpage.css'
import axios from "axios"

export default function BorrowPage() {
  const [returnOptions, setReturnOptions] = useState([]);

  useEffect(() => {
    const getReturnOptions = async () => {
      const res = await axios.get("/api/returnOptions");
      setReturnOptions(res.data);
    }
    getReturnOptions();
  }, []);

  return (
    <div className="borrow-page">
      <Header />
      
      <div className="borrow-grid">
        <BookSection />
        <BorrowSection returnOptions={returnOptions}/>
      </div>
    </div>
  )
}
