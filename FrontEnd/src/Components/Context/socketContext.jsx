import React, { createContext, useEffect,useContext  } from 'react';
import io from 'socket.io-client';

// Create the SocketContext
const SocketContext = createContext();

// Custom SocketProvider component
export const SocketProvider = ({ children }) => {
    // Create the socket instance
    const socket = io('http://localhost:4000'); // Replace with your server URL

    useEffect(() => {
        // Clean up the socket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to access the socket instance
export const useSocket = () => {
    return useContext(SocketContext);
};
