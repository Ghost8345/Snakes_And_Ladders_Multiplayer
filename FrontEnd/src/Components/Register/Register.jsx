import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { registerUser } from "../../Api/userApi";


export default function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic for handling form submission (e.g., API call, validation, etc.)
    console.log('Username:', userName);
    console.log('Password:', password);
    try {
      const response = await registerUser({
        userName,
        password
      })
      const message = await response.json()
      console.log(message)
    }
    catch (error) {
      console.log(error.message)
    }


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
            value={userName}
            onChange={handleUserNameChange}
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
        <button type="submit" id="btn" class="btn bg-main text-white">Register</button>
        <p>Have an account?</p>
        <button type="button" id="btn" class="btn bg-main text-white" onClick={handleLoginClick}>Login</button>
      </form>
    </div>
  );
}