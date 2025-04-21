// The scoreboard of the current game

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ScoreboardPlayer } from "./ScoreboardPlayer";

export const Scoreboard = () => {
  const { game } = useContext(GlobalContext);
  const { currentRound } = useContext(GlobalContext);
  const { currentFrame } = useContext(GlobalContext);

  const frames = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <>
      <h3>
        Scoreboard (Game {currentRound}/{game.rounds})
      </h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              {frames.map((frame) => (
                <th
                  key={`frame-${frame}`}
                  className={frame === currentFrame ? "current-frame" : ""}
                >
                  {frame}
                </th>
              ))}
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {game.players.map((player, index) => (
              <ScoreboardPlayer key={`player-${index}`} player={player} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
