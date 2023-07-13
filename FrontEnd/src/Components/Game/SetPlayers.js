import React from "react";

export const SetPlayers = props => {
  const {
    numOfPlayers,
    invalidNumOfPlayers,
    updateNumberOfPlayers,
    showLayout
  } = props;
  return (
    <div>
      <div>
        <input
          type="number"
          onChange={updateNumberOfPlayers}
          value={numOfPlayers}
          max="4"
          min="2"
        />
        {invalidNumOfPlayers && (
          <p className="error">Please select a number between 2 and 15</p>
        )}
        <button
          className="btn  bg-main m-l-20" id="btn" 
          disabled={invalidNumOfPlayers}
          onClick={showLayout}
        >
          {" "}
          START
        </button>
      </div>
    </div>
  );
};