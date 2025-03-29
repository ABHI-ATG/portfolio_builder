import { useState } from "react";
import "../css/Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from '../backend_url'

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url+"/api/user/login", {
        email: email,
        password: password,
      });
      const token=response.data.token;
      localStorage
      .setItem("token", token);
      navigate("/createportfolio")
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button className="auth-btn" onClick={()=>{
        navigate('/createportfolio/register')
      }}>Sign up</button></p>
    </div>
  );
};

export default Login;
