import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from '../Context/socketContext.jsx'; // Import the SocketContext

import styles from './Pending.module.css';
import { BACKEND_URL } from '../../Api/const.js';

export default function Pending() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const gameId = parseInt(searchParams.get('gameId'));
    const numberOfPlayers = parseInt(searchParams.get('numberOfPlayers'));
    const [playersJoined, setPlayersJoined] = useState(0);
    const socket = useSocket(); // Access the socket instance from the SocketContext

    const handlePlayerJoined = () => {
        console.log('yes');
    };

    const getPlayers = async () => {
        const url = `${BACKEND_URL}/game/getPlayers/${gameId}`;
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Problem connecting with the server!');
            }

            const jsonResponse = await response.json();
            setPlayersJoined(jsonResponse.length); // Update the number of players who have joined
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const gameCreate = () => {
        if (playersJoined === numberOfPlayers) {
            navigate('/game');
        }
    };

    useEffect(() => {
        getPlayers(); // Initial call to getPlayers when the component mounts

        socket.on('playerjoined', handlePlayerJoined); // Listen for 'playerjoined' event

        return () => {
            socket.off('playerjoined', handlePlayerJoined); // Clean up the event listener
        };
    }, [socket]);

    useEffect(() => {
        gameCreate();
    }, [playersJoined]);

    return (
        <section>
            <div className={styles.home}>
                <div className={`d-flex justify-content-center align-items-center ${styles.layer} `}>
                    <div className="content">
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <span className={styles.loader}></span>
                        </div>
                        <h1 className="text-white">Pending...</h1>
                        <p className="text-white">{numberOfPlayers - playersJoined} player remaining</p>
                        <p className="text-white">{playersJoined} players joined</p>
                        <button onClick={getPlayers}>Refresh</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
