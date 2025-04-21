// Scoreboard table row for a single player

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const ScoreboardPlayer = ({ player }) => {
  const total = player.scores.reduce((sum, score) => sum + score.total, 0);
  const { currentFrame } = useContext(GlobalContext);

  return (
    <tr>
      <td>{player.name}</td>
      {Array.from({ length: 10 }, (_, i) => (
        <td
          key={`player-frame-${i}`}
          className={i + 1 === currentFrame ? "current-frame" : ""}
        >
          {player.scores[i] !== undefined ? player.scores[i].total : ""}
        </td>
      ))}
      <td>{total}</td>
    </tr>
  );
};
