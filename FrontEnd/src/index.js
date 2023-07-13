import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { SocketProvider } from '../src/Components/Context/socketContext.jsx'; // Import the SocketProvider
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Create a new instance of the socket

socket.on('connect', () => {
  console.log('Connected to Socket.io server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.io server');
});

socket.on('update', (data) => {
  console.log("update the board with move:", data);
});

export const joinRoom = (roomId) => {
  console.log("emitting to ", roomId);
  socket.emit("joinRoom", roomId)
};

ReactDOM.render(
  <SocketProvider>
    {/* Your app components */}
    <App />
  </SocketProvider>,
  document.getElementById('root')
);