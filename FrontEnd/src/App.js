import React from "react";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Game from "./Components/Game11/Game";
import Lobby2 from "./Components/Lobby2/Lobby2";
import { createBrowserRouter, RouterProvider, ScrollView, StyleSheet, View } from 'react-router-dom';
import './index.css';
import Lobby from "./Components/Lobby/Lobby";
import Layout from "./Components/Layout/Layout";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import GameBoard from "./Components/Dice/Dice";
import Test from "./Components/Dice/Test";


// function App() {
//   return (
//     <Router>
//       <nav>
//         <Link to="/"> Login </Link>
//         <Link to="login"> Login </Link>
//         <Link to="products/search"> Products </Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="login" element={<Login />} />
//         <Route path="products" element={<Products />}>
//           <Route path="search" element={<Search />} />
//           <Route path="list" element={<ListProducts />} />
//           <Route path="add" element={<AddProduct />} />
//           <Route path=":id" element={<ProductDisplay />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

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
      },
      { path: "dice", element: <GameBoard /> },
      { path: 'test', element: <Test /> }
    ]
  }
])
export default function App() {
  return (
    <div>
      {/* <ScrollView>
      <View styles = {styles.container}>
        <View style = {styles.shapecontaniner}
      </View>
      </ScrollView> */}
      <RouterProvider router={routers}></RouterProvider>
    </div>
  );
}

{/* const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
}) */}