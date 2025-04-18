// The scoreboard of the current game

import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Scoreboard = () => {
    const { game } = useContext(GlobalContext);
    const { currentRound } = useContext(GlobalContext)
    const { currentFrame } = useContext(GlobalContext)


    return (
        <>
            <h3>
                Scoreboard (Game {currentRound}/{game.rounds})
            </h3>
            <table>
                <tr>
                    <th>Player</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                    <th>Total Score</th>
                </tr>
            </table>
        </>
    )
}