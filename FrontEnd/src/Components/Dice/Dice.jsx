import React, { useState } from 'react';

// function Dice(props) {
//     const { draw } = props;
//     return <div className={`dice dice-${draw}`}></div>;
// }

// function RollDice(props) {
//     const { draw } = props;
//     return <Dice draw={draw} />;
// }

const GameBoard = () => {
    const [position, setPosition] = useState(1);
    const [diceCount, setDiceCount] = useState(2);
    const [diceValue, setDiceValue] = useState(1);

    const updateDiceCount = (evt) =>
        setDiceCount(parseInt(evt.target.value) || 2);

    const rollDice = () => {
        const newDiceValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(newDiceValue);
        setPosition(position + newDiceValue);
        // Add logic for snakes and ladders
        // Update position based on the rules of the game
    };

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12  mb-5 bg-danger">
                    <h1>Dice to Ladder and Snake Game</h1>
                    <p>Current value: {diceValue}</p>
                </div>


                <div className="row">
                    <div className="col-md-12">
                        <div className=" bg-danger  mb-3">
                            {
                                <div className={` dice-${diceValue}  dice `}></div>
                            }


                        </div>
                        <button className='btn btn-danger' onClick={rollDice}>Dice</button>

                    </div>
                </div>

                {/* 
                <div className="col-md-12 mb-5 text-center">
                    <div className="row">


                        {
                            <div className='bg-danger  d-flex justify-content-center align-items-center'>
                                <RollDice draw={diceValue} />

                            </div>

                        }
                    </div>
                </div>
                <div className="col-md-12 text-center">
                    <button className="btn btn-primary" onClick={rollDice}>
                        Roll Dice
                    </button>
                </div> */}

            </div>
        </div>
    );
};

export default GameBoard;