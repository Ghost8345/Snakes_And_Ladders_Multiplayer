import React from "react";
import { useNavigate } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Login() {
  const navigate = useNavigate();

  const handleJoinGameClick = () => {
    navigate("/lobby2");
  };

  const handleCreateGameClick = () => {
    navigate("/Game");
  };

  return (
    <section id="pages">
      <div>
        <h1>     </h1>
        <h2>Lobby</h2>
        <form>
          <div>
          </div>
          <button id="btn" class="btn bg-main text-white" onClick={handleCreateGameClick}>Create Game</button>
          <button id="btn" class="btn bg-main text-white" onClick={handleJoinGameClick}>Join Game</button>
        </form>
      </div>
    </section>
  );
}
