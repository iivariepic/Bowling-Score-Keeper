// The scoreboard of the current game

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Scoreboard = () => {
    const { game } = useContext(GlobalContext);
    const { currentRound } = useContext(GlobalContext)
    const { currentFrame } = useContext(GlobalContext)

    const frames = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <>
            <h3>
                Scoreboard (Game {currentRound}/{game.rounds})
            </h3>
            <table>
                <tr>
                    <th>Player</th>
                    {frames.map(frame => (
                        <th>{frame}</th>
                    ))}
                    <th>Total Score</th>
                </tr>
            </table>
        </>
    )
}