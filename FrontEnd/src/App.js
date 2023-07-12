import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Game from "./Components/Game";
import Lobby2 from "./Components/Lobby2";
import { createBrowserRouter, RouterProvider, ScrollView, StyleSheet, View } from 'react-router-dom';
import './index.css';
import "./App.css";
import Lobby from "./Components/Lobby";
import Layout from "./Components/Layout/Layout";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";



const routers = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      {
        index: true, element:

          <Login />

      },
      {
        path: "register", element:

          <Register />
      },
      {
        path: "game", element:


          <ProtectedRoutes>
            <Game />
          </ProtectedRoutes>

      },
      {
        path: "lobby", element:
          <ProtectedRoutes>
            <Lobby />
          </ProtectedRoutes>

      },
      {
        path: "lobby2", element:

          <ProtectedRoutes>
            <Lobby2 />
          </ProtectedRoutes>

      },
      {
        path: "*", element:

            <Login />
      }
    ]
  }

])
export default function App() {
  return (
    <div>

    
    <ScrollView>
      <View styles = {styles.container}>
        <View style = {styles.shapecontaniner}



      </View>
      </ScrollView>
  
    <RouterProvider router={routers}></RouterProvider>
    </div>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
})