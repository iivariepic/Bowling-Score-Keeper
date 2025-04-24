import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Scoreboard = () => {
  const { game, currentFrame, currentRound } = useContext(GlobalContext);

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
              <th>Game Score</th>
            </tr>
          </thead>
          <tbody>
            {game.players.map((player, index) => (
              <tr key={`player-row-${index}-${player.name}`}>
                <td>{player.name}</td>
                {Array.from({ length: 10 }, (_, i) => (
                  <td
                    key={`player-${index}-frame-${i}`}
                    className={i + 1 === currentFrame ? "current-frame" : ""}
                  >
                    {player.scores[i]?.total || 0}
                  </td>
                ))}
                <td>
                  {player.scores.reduce(
                    (sum, score) => sum + (score.total || 0),
                    0
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
