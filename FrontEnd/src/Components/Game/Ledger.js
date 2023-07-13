import React from "react";

export const Ledger = () => {
  return (
    <div >
      <div className="ledger-player row d-flex justify-content-center ">
        Players are in random shapes
        </div>
        <p className="row d-flex justify-content-center" >
        - The board has 100 cells.
        </p>
        <p>
        - If a cell has a snake/ladder, it only has a single link to the cell where the snake/ladder leads.
        </p>
        <p>
        - Each player starts at 0.
        </p>
        <p>
        - Every move of a player is made by adding the number of steps to its current cell number.
        </p>
        <p>
        - The player, if lands on a snake/ladder cell, moves to the corresponding cell.
        </p>
    </div>
  );
};