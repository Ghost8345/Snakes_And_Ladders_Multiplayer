import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Game from "./Components/Game";
import Lobby2 from "./Components/Lobby2";
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
      <Route path="/Lobby2" element={<Lobby2 />} />
    </Routes>

  );
}

export default App;