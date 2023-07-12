import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    navigate("/Lobby");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission (e.g., API call, validation, etc.)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div id="pages">
      <h1>Snake and Ladder Multiplayer Game</h1>
      <h2>register</h2>
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
        </div>
        <h1>    </h1>
        <button id="btn" class="btn bg-main text-white" onClick={handleRegisterClick} >Register</button>
        <p>Have an account?</p>
        <button id="btn" class="btn bg-main text-white" onClick={handleLoginClick}>Login</button>
      </form>
    </div>
  );
}