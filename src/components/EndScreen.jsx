import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ResultsTable } from "./ResultsTable";

export const EndScreen = () => {
  const { game, currentRound, backToMain, restartGame } =
    useContext(GlobalContext);

  return (
    <div className="end-screen-container">
      <ResultsTable
        players={game.players}
        currentRound={currentRound}
        title="Final Results"
      />
      <div className="form-control">
        <button className="btn" onClick={backToMain}>
          Main Menu
        </button>
        <button className="btn" onClick={restartGame}>
          Restart Match
        </button>
      </div>
    </div>
  );
};
