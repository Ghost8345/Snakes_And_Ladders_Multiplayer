import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import io from 'socket.io-client';
const socket = io('http://localhost:4000'); // Connect to the server



socket.on('connect', () => {
    console.log('Connected to Socket.io server');
  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from Socket.io server');
  });

  socket.on('update', (data)=>{
    console.log("update the board with move:",data);
  })
export const joinRoom = (roomId) =>{
    console.log("emitting to ",roomId);
    socket.emit("joinRoom",roomId)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);