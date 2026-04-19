import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router";
import { userContext } from "../../UserContext.js";
import Header from "../../components/Header.jsx";
import axios from "axios"
import "./authpages.css"

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(userContext);

  const loginButtonClicked = async () => {
    setError("");
    try {
      const res = await axios.post("/api/auth/login", {
        email: email,
        password: password
      });
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response.data.error);
    }
  }

  const emailOnChange = (event) => {
    setEmail(event.target.value);
  }
  const passwordOnChange = (event) => {
    setPassword(event.target.value);
  }

  return (
    <>
      <title>Login</title>
      <Header />
      <div className="login-page">

        <div className="auth-container">

          <div className="auth-section">
            <NavLink to={"/auth/register"} className="auth-link">Register</NavLink>
            <div className="email-section">
              <p>Email:</p>
              <input type="text" value={email} onChange={emailOnChange} />
            </div>
            <div className="password-section">
              <p>Password:</p>
              <input type="password" value={password} onChange={passwordOnChange} />
            </div>
            <div className="auth-button-container">
              <button className="auth-button" onClick={loginButtonClicked}>Login</button>
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
