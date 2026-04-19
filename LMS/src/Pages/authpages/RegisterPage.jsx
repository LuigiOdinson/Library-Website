import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router";
import { userContext } from "../../UserContext.js";
import Header from "../../components/Header.jsx";
import axios from "axios"
import "./authpages.css"

export default function RegisterPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const registerButtonClicked = async () => {
    setError("");
    try {
      const res = await axios.post("/api/auth/register", {
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
        email: email,
        password: password,
        address: address
      });

      navigate("/auth/login");
    } catch (err) {
      setError(err.response.data.error);
    }
  }


  const firstNameOnChange = (event) => {
    setFirstName(event.target.value);
  }
  const lastNameOnChange = (event) => {
    setLastName(event.target.value);
  }
  const birthDateOnChange = (event) => {
    setBirthDate(event.target.value);
  }
  const addressOnChange = (event) => {
    setAddress(event.target.value);
  }
  const emailOnChange = (event) => {
    setEmail(event.target.value);
  }
  const passwordOnChange = (event) => {
    setPassword(event.target.value);
  }

  return (
    <>
      <title>Register</title>
      <Header />
      <div className="register-page">

        <div className="auth-container">

          <div className="auth-section">
            <NavLink to={"/auth/login"} className="auth-link">Login</NavLink>

            <div>
              <p>First Name:</p>
              <input type="text" value={firstName} onChange={firstNameOnChange} />
            </div>
            <div>
              <p>Last Name:</p>
              <input type="text" value={lastName} onChange={lastNameOnChange}/>
            </div>
            <div>
              <p>Birth Date:</p>
              <input type="date" value={birthDate} onChange={birthDateOnChange}/>
            </div>
            <div>
              <p>Address:</p>
              <input type="text" value={address} onChange={addressOnChange}/>
            </div>
            <div>
              <p>Email:</p>
              <input type="text" value={email} onChange={emailOnChange} />
            </div>
            <div>
              <p>Password:</p>
              <input type="password" value={password} onChange={passwordOnChange} />
            </div>
            <div className="auth-button-container">
              <button className="auth-button" onClick={registerButtonClicked}>Register</button>
            </div>
            
            {error &&
              <div className="message-section">
                {error}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
