import './Game.css';
import Board from './components/Board/Board.component';
import React from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


function Game() {
  return (
    <div className="Game">
      <header className="Game-header">
        <Board></Board>
      </header>
    </div>
  );
}

export default Game;
