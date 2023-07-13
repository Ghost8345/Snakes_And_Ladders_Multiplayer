import React from "react";

export const Ledger = () => {
  return (
      <div className="ledger-player row d-flex justify-content-center ">
        <p>
        - Players are in random shapes
        </p>
        <p>
        - The board has 100 cells.
        </p>
        <p>
        - If a cell has a snake/ladder,
        </p>
        <p>
        it only has a single link to the cell where the snake/ladder leads.
        </p>
        <p>
        - Each player starts at 0.
        </p>
        <p>
        - Every move of a player is made by adding
        </p>
        <p>
        the number of steps to its current cell number.
        </p>
        <p>
        - The player, if lands on a snake/ladder cell,
        </p>
        <p>
        moves to the corresponding cell.
        </p>
        </div>
  );
};