import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Game from "./Components/Game";
import Lobby2 from "./Components/Lobby2";
import CreateGame from "./Components/CreateGame";
import { Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import "./App.css";
import Lobby from "./Components/Lobby";


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game" element={<Game />} />
      <Route path="/Lobby" element={<Lobby />} />
      <Route path="/CreateGame" element={<CreateGame />} />
      <Route path="/Lobby2" element={<Lobby2 />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>

  );
}

export default App;
