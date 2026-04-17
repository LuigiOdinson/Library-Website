import { useContext, useState, useEffect } from "react"
import { userContext } from "../../UserContext.js";
import axios from "axios"
import Header from "../../components/Header.jsx";
import ActiveBorrowsSection from "./ActiveBorrowsSection.jsx";
import BorrowsHistorySection from "./BorrowsHistorySection.jsx";
import "./profilepage.css"

export default function ProfilePage() {
  const { user, loading } = useContext(userContext);
  const [userBorrows, setUserBorrows] = useState([]);

  useEffect(() => {
    const getBorrowsForUser = async () => {
      const res = await axios.get("/api/borrow/myBorrows");
      console.log(res.data)
      setUserBorrows(res.data);
    }
    getBorrowsForUser();
  }, []);

  if (loading) { return <div>Loading</div> } // if user hasn't loaded

  return (
    <div className="profile-page">
      <title>Profile</title>
      <Header />

      <div className="user-info-section">
        <p className="title">User Info:</p>
        {user.banned == 1 &&
        <p style={{color: 'red'}}>
          This user is banned. Please return any books you've borrowed to the library to get unbanned.
        </p>}
        <p>Name: {user.first_name}, {user.last_name}</p>
        <p>Email: {user.email}</p>
        <p>Total books borrowed: {userBorrows.totalBorrows}</p>
        <p>Total fine: {userBorrows.totalFine} Toman</p>
      </div>

      <ActiveBorrowsSection active={userBorrows.active}/>

      <BorrowsHistorySection history={userBorrows.history}/>
    </div>
  )
}
