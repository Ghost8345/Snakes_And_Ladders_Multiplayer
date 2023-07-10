import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [Id, setId] = useState('');
  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleJoinClick = () => {
    navigate("/Game");
  };


  const handleLoginClick = () => {
    console.log('Id:', Id);
    navigate("/Game");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission (e.g., API call, validation, etc.)
    console.log('Id:', Id);
  };

  return (
    <div>
      <h2>Snake and Ladders Muliplayer Game</h2>
      <h2>Write Game ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Id">Game ID:</label>
          <input
            type="text"
            id="Id"
            value={Id}
            onChange={handleIdChange}
          />
        </div>
        <button type="Game" onClick={handleJoinClick}>Join !</button>
      </form>
    </div>

  );
}