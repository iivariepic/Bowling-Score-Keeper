import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ResultsTable } from "./ResultsTable";

export const Intermission = () => {
  const { game, currentRound, nextRound, toggleIntermission, backToMain, prevFrame } =
    useContext(GlobalContext);

  return (
    <div className="intermission-container">
      <ResultsTable
        players={game.players}
        currentRound={currentRound}
        title={`Results after Game ${currentRound} of ${game.rounds}`}
      />
      <div className="form-control">
      <button
          className="btn"
          onClick={() => {
              toggleIntermission(false);
              prevFrame();
          }}
      >
          Modify Previous Game
      </button>
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
