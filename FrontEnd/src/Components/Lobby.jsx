import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleJoinGameClick = () => {
    navigate("/lobby2");
  };

  const handleCreateGameClick = () => {
    navigate("/Game");
  };

  return (
    <div>
      <h2>Lobby</h2>
      <form>
        <div>
        </div>
        <button class="btn bg-main text-white" type="Game" onClick={handleCreateGameClick}>Create Game</button>
        <button class="btn bg-main text-white" type="Lobby2" onClick={handleJoinGameClick}>Join Game</button>
      </form>
    </div>

  );
}