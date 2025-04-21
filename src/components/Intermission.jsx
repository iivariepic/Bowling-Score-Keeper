// The intermission screen that pops up between rounds of a game

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Intermission = () => {
  const { game, currentRound, nextRound } = useContext(GlobalContext);
  let players = [...game.players].sort((a, b) => b.gameTotal - a.gameTotal);

  return (
    <div className="container">
      <h3>Player Standings (Round {currentRound})</h3>
      <ul className="list">
        {players.map((player, index) => {
          return (
            <li key={`intermission-player-${index}`}>
              <b>{index + 1}.</b>
              {player.name}:{" "}
              {
                // Only show the decimal if it is needed
                Number.isInteger(player.gameTotal / currentRound)
                  ? player.gameTotal / currentRound
                  : (player.gameTotal / currentRound).toFixed(1)
              }
            </li>
          );
        })}
      </ul>
      <button className="btn" onClick={nextRound}>
        Next Round
      </button>
    </div>
  );
};
