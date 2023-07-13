import React from "react";

export const Ledger = () => {
  return (
    <div className="row d-flex justify-content-center" >
      <div className="ledger-player row d-flex justify-content-center">
        Player 1 is <div className="P1_shape m-l-20" />
      </div>
      <div className="ledger-player row d-flex justify-content-center">
        Player 2 is <div className="P2_shape m-l-20" />
      </div>
      <div >
        Player 3 is <div className="P3_shape m-l-20" />
      </div>
      <div className="ledger-player row d-flex justify-content-center">
        Player 4 is <div className="P4_shape m-l-20" />
      </div>
    </div>
  );
};