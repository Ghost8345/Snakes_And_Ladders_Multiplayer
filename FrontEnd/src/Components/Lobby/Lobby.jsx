import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BACKEND_URL } from "../../Api/const.js";
import { JoinGame } from '../../Api/gameApi.js'
import { Slide, ToastContainer, toast } from 'react-toastify';
export default function Login() {
  const navigate = useNavigate();



  const [games, setGames] = useState([]);
  const [answer, serAnswer] = useState(" ")

  const toastMessage = (msg) => {
    toast.success("ehab", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide
    });

    console.log("yes");
  }
  const handleJoinGameSubmit = async (gameId) => {
    // Logic for handling form submission (e.g., API call, validation, etc.)
    console.log(gameId);

    try {
      const response = await JoinGame({
        gameId
      })
      const responseBody = await response.json()
      console.log(responseBody.message)

      if (responseBody.message === "success") {
        navigate("/home")
      }
      serAnswer(responseBody)
    }
    catch (error) {
      console.log(error.message, "Asdasdasdasdasdasdsa")
      serAnswer(error.message)
      toastMessage(answer)

    }
  };


  const getPendingGames = async () => {
    const url = `${BACKEND_URL}/game/`;
    const token = localStorage.getItem('token')

    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    }).catch((error) => {
      throw new Error("Problem connecting with the server!");
    });

    if (response.status !== 200) {
      const json = await response.json();
      const message = json.message
      throw new Error(message);
    }

    const res = await response.json()
    return res;
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPendingGames();
        setGames(res.games);
        console.log(res.games);
      } catch (error) {
        console.error(error);
        // Handle the error accordingly
      }
    };

    fetchData();
  }, []);

  return (

    <section>
      <div className="container">
        <div className="row">
          <h1 className="my-3 text-dark">LOBBY</h1>
          <div className="content d-flex flex-wrap justify-content-center p-4">

            {games.map((game, index) => (
              <div className="card p-4 shadow col-md-4 mb-4 m-4" key={index}>
                <div className="border-bottom">
                  <p>Created By :{game.createdBy}</p>
                  <p>ID: {game.id}</p>
                  <p>Number Of Players: {game.numberOfPlayers}</p>
                  <p>Status: <span className={'text-danger'}>{game.status}</span></p>
                </div>

                <button className="btn btn-success" onClick={async () => {
                  await handleJoinGameSubmit(game.id)
                  toastMessage(answer)


                }}>JOIN GAME</button>

              </div>

            ))}

          </div>
        </div>
      </div>
    </section>

    // <section id="pages">
    //   <div>
    //     <h1>     </h1>
    //     <h2>Lobby</h2>
    //     <form>
    //       <div>
    //       </div>
    //       <button id="btn" class="btn bg-main text-white" onClick={handleCreateGameClick}>Create Game</button>
    //       <button id="btn" class="btn bg-main text-white" onClick={handleJoinGameClick}>Join Game</button>
    //     </form>
    //   </div>
    // </section>
  );
}
