import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register"
import Game from "./Components/Game"
import { Route, Routes, Navigate} from 'react-router-dom'
import './styles.css'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path = "/game" element = {<Game />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    
  );
}


export default App;
