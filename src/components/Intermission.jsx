// The intermission screen that pops up between rounds of a game

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ResultsTable } from "./ResultsTable";

export const Intermission = () => {
  const { game, currentRound, nextRound, toggleIntermission, backToMain } =
    useContext(GlobalContext);
  // Prepare players to include current round's scores in display values
  const players = [...game.players]
    .map((player) => {
      const rounds = player.rounds || [];
      const total = player.gameTotal || 0;
      const average =
        rounds.length > 0 ? (total / rounds.length).toFixed(1) : 0;
      return {
        ...player,
        displayTotal: total,
        displayAverage: average,
        displayRounds: rounds,
      };
    })
    .sort((a, b) => b.displayTotal - a.displayTotal);

  return (
    <div className="intermission-container">
      <ResultsTable
        players={players}
        currentRound={currentRound}
        title={`Results after Game ${currentRound} of ${game.rounds}`}
      />
      <div className="form-control">
        <button
          className="btn"
          onClick={() => {
            toggleIntermission(false);
            backToMain();
          }}
        >
          Main Menu
        </button>
        <button
          className="btn"
          onClick={() => {
            nextRound();
            toggleIntermission(false);
          }}
        >
          Next Game
        </button>
      </div>
    </div>
  );
};
