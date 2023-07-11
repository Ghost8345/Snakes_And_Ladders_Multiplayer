import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { createGame, JoinGame, move} from "../Api/gameApi";

export default function Game() {
    const [boardId, setBoardId] = useState();
    const [numberOfPlayers, setNumberOfPlayers] = useState();
    const [gameIdJ, setgameIdJ] = useState();
    const [gameIdM, setgameIdM] = useState();

    const navigate = useNavigate();


    const handleBoardIdChange = (e) => {
        setBoardId(e.target.value);
      };

    const handleNumberOfPlayersChange = (e) => {
        setNumberOfPlayers(e.target.value);
      };

      const handleGameIdJChange = (e) => {
        setgameIdJ(e.target.value);
      };

      const handleGameIdMChange = (e) => {
        setgameIdM(e.target.value);
      };
      const handleLogoutClick = (e) => {
        localStorage.removeItem('token')
        navigate("/login")
      };

    
      const handleCreateGameSubmit = async (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)
        console.log('boardId:', boardId);
        console.log('numberOfPlayers:', numberOfPlayers);

        try{
          const response = await createGame({
            boardId,
            numberOfPlayers
          })
          const responseBody = await response.json()
          console.log(responseBody)
        }
        catch(error){
          console.log(error.message)
        }
      };

      const handleJoinGameSubmit = async (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)
        console.log('gameId:', gameIdJ);

        const gameId = gameIdJ

        try{
          const response = await JoinGame({
            gameId
          })
          const responseBody = await response.json()
          console.log(responseBody)
        }
        catch(error){
          console.log(error.message)
        }
      };

      const handleMoveSubmit = async (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)
        console.log('gameId:', gameIdM);

        const gameId = gameIdM

        try{
          const response = await move({
            gameId
          })
          const responseBody = await response.json()
          console.log(responseBody)
        }
        catch(error){
          console.log(error.message)
        }
      };

    return (
        
        <section id="home">
            <div id="createGame">
                <form onSubmit={handleCreateGameSubmit}>
                    <label htmlFor="boardId">boardId:</label>
                    <input
                    type="text"
                    id="boardId"
                    value={boardId}
                    onChange={handleBoardIdChange}
                    />
                    <label htmlFor="numberOfPlayers">numberOfPlayers:</label>
                    <input
                    type="text"
                    id="numberOfPlayers"
                    value={numberOfPlayers}
                    onChange={handleNumberOfPlayersChange}
                    />
                    <button type="submit">Create Game</button>
                </form>
                
            </div>
            <div id="JoinGame">
                <form onSubmit={handleJoinGameSubmit}>
                    <label htmlFor="gameId">gameId:</label>
                    <input
                    type="text"
                    id="gameId"
                    value={gameIdJ}
                    onChange={handleGameIdJChange}
                    />
                    <button type="submit">Join Game</button>
                </form>
                
            </div>
            <div id="move">
                <form onSubmit={handleMoveSubmit}>
                    <label htmlFor="gameId">gameId:</label>
                    <input
                    type="text"
                    id="gameId"
                    value={gameIdM}
                    onChange={handleGameIdMChange}
                    />
                    <button type="submit">Move</button>
                </form>
            </div>

            <div>
                <button type = "button" onClick={handleLogoutClick}>Logout</button>
            </div>
        </section>

    )
}