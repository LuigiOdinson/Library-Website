import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { userContext } from "../UserContext.js";
import axios from "axios"
import './header.css'

export default function Header() {
  const navigate = useNavigate();
  const {user, setUser, loading} = useContext(userContext);

  const logoutButtonClicked = async () => {
    await axios.post("/api/auth/logout");
    setUser(null); // refresh user state
    navigate("/");
  }

  if (loading) {return <div>Loading</div>}

  return (
    <div className="header">
      <NavLink to={"/"} className="left-section link">
        <img src="/images/book-icon-blue.png" alt="book-icon" className="book-icon"></img>
        <p className='logo-text'>Library</p>
      </NavLink>

      <div>
        {user
          ? <div>
            <NavLink to={"/profile"} className="link">{user.first_name}</NavLink> | <button onClick={logoutButtonClicked}>Logout</button>
            </div>
          : <NavLink to={"/auth/login"} className="link">Login</NavLink>
        }
        
      </div>
    </div>
  )
}
