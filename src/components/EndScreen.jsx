// The End Screen that plays after all the rounds are finished

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ResultsTable } from "./ResultsTable";

export const EndScreen = () => {
  const { game, currentRound, backToMain, restartGame } =
    useContext(GlobalContext);
  const players = [...game.players].sort((a, b) => b.gameTotal - a.gameTotal);

  return (
    <div className="end-screen-container">
      <ResultsTable
        players={players}
        currentRound={currentRound}
        title="Final Results"
      />
      <div className="form-control">
        <button className="btn" onClick={backToMain}>
          Back To Main Menu
        </button>
        <button className="btn" onClick={restartGame}>
          Restart Game With the Same Players
        </button>
      </div>
    </div>
  );
};
