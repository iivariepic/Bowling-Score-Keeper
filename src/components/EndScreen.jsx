// The End Screen that plays after all the rounds are finished

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const EndScreen = () => {
  const { game, currentRound, backToMain, restartGame } =
    useContext(GlobalContext);
  let players = [...game.players].sort((a, b) => b.gameTotal - a.gameTotal);

  return (
    <div className="container">
      <h3>Player Final Standings</h3>
      <div className="list">
        {players.map((player, index) => {
          return (
            <li key={`end-screen-player-${index}`}>
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
      </div>
      <div className="inline">
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
