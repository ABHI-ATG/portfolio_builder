import { useState } from "react";
import "../css/Auth.css"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from '../backend_url'

const Signup = () => {

  const navigate=useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post(url+"/api/user/register", {
        name: name,
        email: email,
        password: password
      });
      navigate("/createportfolio/login")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <button className="auth-btn" onClick={()=>{
        navigate("/createportfolio/login")
      }}>Login</button></p>
    </div>
  );
};

export default Signup;
