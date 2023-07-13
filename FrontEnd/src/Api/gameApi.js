import { BACKEND_URL } from "./const";
import { joinRoom } from "..";

export const createGame = async (game) => {
  const url = `${BACKEND_URL}/game/createGame`;
  const token = localStorage.getItem('token')
  console.log("TOKEN IN CREATE GAME: ", token)

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(game),
  }).catch((error) => {
    throw new Error("Problem connecting with the server!");
  });

  if (response.status !== 200) {
    const json = await response.json();
    const message = json.message
    throw new Error(message);
  }
  const jsonResponse = await response.json()
  console.log("got response ", jsonResponse, " and room Id ",jsonResponse.game.roomId);
  joinRoom(jsonResponse.game.roomId)

  return jsonResponse;
};

export const JoinGame = async (game) => {
    const url = `${BACKEND_URL}/game/joinGame`;
    const token = localStorage.getItem('token')
  
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(game),
    }).catch((error) => {
      throw new Error("Problem connecting with the server!");
    });
  
    if (response.status !== 200) {
      const json = await response.json();
      const message = json.message
      throw new Error(message);
    }

    const jsonResponse = await response.json()
    console.log("got response ", jsonResponse, " and room Id ",jsonResponse.game.roomId);
    joinRoom(jsonResponse.game.roomId)
    return jsonResponse;
  };

export const move = async (game) => {
  const url = `${BACKEND_URL}/game/move`;
  const token = localStorage.getItem('token')

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(game),
  }).catch((error) => {
    throw new Error("Problem connecting with the server!");
  });

  if (response.status !== 200) {
    const json = await response.json();
    const message = json.message
    throw new Error(message);
  }

  return response;
};

export const getPendingGames = async () => {
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

  return response;
};

export const updateBoard = async (gameId) => {
  const url = `${BACKEND_URL}/game/updateBoard/${gameId}`;
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

  return response;
};

export const leaveGame = async (game) => {
  const url = `${BACKEND_URL}/game/leaveGame`;
  const token = localStorage.getItem('token')

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(game),
  }).catch((error) => {
    throw new Error("Problem connecting with the server!");
  });

  if (response.status !== 200) {
    const json = await response.json();
    const message = json.message
    throw new Error(message);
  }

  return response;
};

export const deleteGame = async (game) => {
  const url = `${BACKEND_URL}/game/deleteGame`;
  const token = localStorage.getItem('token')

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(game),
  }).catch((error) => {
    throw new Error("Problem connecting with the server!");
  });

  if (response.status !== 200) {
    const json = await response.json();
    const message = json.message
    throw new Error(message);
  }

  return response;
};
