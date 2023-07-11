import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    navigate("/lobby");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission (e.g., API call, validation, etc.)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div id = "pages">
      <h1>Snake and Ladders Muliplayer Game</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        <h1>   </h1>
        </div>
        <MDBBtn id="btn" class="btn bg-main text-white"  onClick={handleLoginClick}>Login</MDBBtn>
        <p>Or create a new account</p>
        <MDBBtn id="btn" class="btn bg-main text-white" onClick={handleRegisterClick}>Register</MDBBtn>
      </form>
    </div>

  );
}