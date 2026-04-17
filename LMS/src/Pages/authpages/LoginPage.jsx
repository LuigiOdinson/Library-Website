import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router";
import { userContext } from "../../UserContext.js";
import axios from "axios"

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setUser} = useContext(userContext);

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
    <div className="LoginPage">
      <title>Login</title>
      
      <NavLink to={"/auth/register"} className="link">Register</NavLink>

      <div className="auth-section">
        <div className="email-section">
          <p>Email:</p>
          <input type="text" value={email} onChange={emailOnChange} />
        </div>
        <div className="password-section">
          <p>Password:</p>
          <input type="password" value={password} onChange={passwordOnChange} />
        </div>
        <button className="login-button" onClick={loginButtonClicked}>Login</button>
        {error && 
        <div className="message">
          {error}
        </div>
        }
      </div>
    </div>
  )
}
