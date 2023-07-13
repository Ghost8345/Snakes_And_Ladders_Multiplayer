import React, { useState, useEffect } from 'react';
import styles from './CreateGame.module.css';
import { createGame } from '../../Api/gameApi.js';
import { useNavigate } from 'react-router-dom';

export default function CreateGame() {
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    const [gameId, setGameId] = useState(null);
    const navigate = useNavigate();

    const getNumberOfPlayers = () => {
        const inputElement = document.getElementById('noofplayers-textbox');
        setNumberOfPlayers(inputElement.value);
    };

    const create = async () => {
        const game = {
            "boardId": 1,
            "numberOfPlayers": numberOfPlayers,
        };
        const res = await createGame(game);
        setGameId(res.game.id);
        navigate(`/Pending?gameId=${res.game.id}&numberOfPlayers=${numberOfPlayers}`); // Pass numberOfPlayers as a query parameter // Pass numberOfPlayers as a query parameter?gameId=${res.game.id}`);
    };


    useEffect(() => {
        console.log(numberOfPlayers);
        if (numberOfPlayers !== '') {
            create();
        }
    }, [numberOfPlayers]);

    return (
        <div className={styles.home}>
            <div className={`d-flex justify-content-center align-items-center ${styles.layer}`}>
                <div className="content">
                    <label htmlFor="" className="text-white fw-bolder">
                        Enter Number Of Players:
                    </label>
                    <input type="text" className="form-control mb-3" id="noofplayers-textbox" />
                    <button className="btn btn-info" onClick={getNumberOfPlayers}>
                        CREATE
                    </button>
                </div>
            </div>
        </div>
    );
}
