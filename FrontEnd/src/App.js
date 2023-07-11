import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Game from "./Components/Game";
import Lobby2 from "./Components/Lobby2";
import { Route, Routes, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import "./App.css";
import Lobby from "./Components/Lobby";
import Layout from "./Components/Layout/Layout";


const routers = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "game", element: <Game /> },
      { path: "lobby", element: <Lobby /> },
      { path: "lobby2", element: <Lobby2 /> }
    ]
  }

])
export default function App() {
  return (

    <RouterProvider router={routers}></RouterProvider>

  );
}