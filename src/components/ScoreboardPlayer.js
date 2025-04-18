// Scoreboard table row for a single player

import React from "react";

export const ScoreboardPlayer = ({ player }) => {
    const total = player.scores.reduce((sum, score) => sum + score, 0);

    return (
        <tr>
            <td>{player.name}</td>
            {Array.from({ length: 10 }, (_, i) => (
                <td>{player.scores[i] !== undefined ? player.scores[i] : ''}</td>
            ))}
            <td>{total}</td>
        </tr>
    )
}