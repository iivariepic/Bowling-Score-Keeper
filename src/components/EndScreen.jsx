import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ResultsTable } from "./ResultsTable";

export const EndScreen = () => {
  const { game, currentRound, backToMain, restartGame } =
    useContext(GlobalContext);

  const players = [...game.players].map((player) => {
    const rounds = player.rounds || [];
    const total = player.gameTotal || 0;
    const average = rounds.length > 0 ? (total / rounds.length).toFixed(1) : 0;
    return {
      ...player,
      displayTotal: total,
      displayAverage: average,
      displayRounds: rounds,
    };
  });

  return (
    <div className="end-screen-container">
      <ResultsTable
        players={players}
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
