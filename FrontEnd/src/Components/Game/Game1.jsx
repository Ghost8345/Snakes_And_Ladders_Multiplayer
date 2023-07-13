import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, JoinGame, move, getPendingGames, updateBoard, leaveGame, deleteGame } from "../../Api/gameApi.js";

export default function Game() {
    const [boardId, setBoardId] = useState();
    const [numberOfPlayers, setNumberOfPlayers] = useState();
    const [gameIdJ, setgameIdJ] = useState();
    const [gameIdM, setgameIdM] = useState();
    const [gameIdU, setgameIdU] = useState();
    const [gameIdL, setgameIdL] = useState();
    const [gameIdD, setgameIdD] = useState();

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

    const handleGameIdUChange = (e) => {
        setgameIdU(e.target.value);
    };

    const handleGameIdLChange = (e) => {
        setgameIdL(e.target.value);
    };

    const handleGameIdDChange = (e) => {
        setgameIdD(e.target.value);
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

        try {
            const response = await createGame({
                boardId,
                numberOfPlayers
            })
            const responseBody = await response.json()
            console.log(responseBody)
        }
        catch (error) {
            console.log(error.message)
        }
    };

    const handleJoinGameSubmit = async (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)
        console.log('gameId:', gameIdJ);

        const gameId = gameIdJ

        try {
            const response = await JoinGame({
                gameId
            })
            const responseBody = await response.json()
            console.log(responseBody)
        }
        catch (error) {
            console.log(error.message, "Asdasdasdasdasdasdsa")
        }
    };

    const handleMoveSubmit = async (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)
        console.log('gameId:', gameIdM);

        const gameId = gameIdM

        try {
            const response = await move({
                gameId
            })
            const responseBody = await response.json()
            console.log(responseBody)
        }
        catch (error) {
            console.log(error.message)
        }
    };

    const handleGetGamesSubmit = async (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)

        try {
            const response = await getPendingGames()
            const responseBody = await response.json()
            console.log(responseBody)
        }
        catch (error) {
            console.log(error.message)
        }
    };

    const handleupdateBoardSubmit = async (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)
        console.log('gameId:', gameIdU);

        const gameId = gameIdU

        try {
            const response = await updateBoard(gameId)
            const responseBody = await response.json()
            console.log(responseBody)
        }
        catch (error) {
            console.log(error.message)
        }
    };

    const handleLeaveGameSubmit = async (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)
        console.log('gameId:', gameIdL);

        const gameId = gameIdL

        try {
            const response = await leaveGame({ gameId })
            const responseBody = await response.json()
            console.log(responseBody)
        }
        catch (error) {
            console.log(error.message)
        }
    };

    const handleDeleteGameSubmit = async (e) => {
        e.preventDefault();
        // Logic for handling form submission (e.g., API call, validation, etc.)
        console.log('gameId:', gameIdD);

        const gameId = gameIdD

        try {
            const response = await deleteGame({ gameId })
            const responseBody = await response.json()
            console.log(responseBody)
        }
        catch (error) {
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

            <div id="getGames">
                <form onSubmit={handleGetGamesSubmit}>
                    <button type="submit">GetGames</button>
                </form>
            </div>

            <div id="updateBoard">
                <form onSubmit={handleupdateBoardSubmit}>
                    <label htmlFor="gameId">gameId:</label>
                    <input
                        type="text"
                        id="gameId"
                        value={gameIdU}
                        onChange={handleGameIdUChange}
                    />
                    <button type="submit">updateBoard</button>
                </form>
            </div>

            <div id="leaveGame">
                <form onSubmit={handleLeaveGameSubmit}>
                    <label htmlFor="gameId">gameId:</label>
                    <input
                        type="text"
                        id="gameId"
                        value={gameIdL}
                        onChange={handleGameIdLChange}
                    />
                    <button type="submit">Leave Game</button>
                </form>
            </div>

            <div id="deleteGame">
                <form onSubmit={handleDeleteGameSubmit}>
                    <label htmlFor="gameId">gameId:</label>
                    <input
                        type="text"
                        id="gameId"
                        value={gameIdD}
                        onChange={handleGameIdDChange}
                    />
                    <button type="submit">Delete Game</button>
                </form>
            </div>

            <button type="button" onClick={handleLogoutClick}>Logout</button>

        </section>
    )
}