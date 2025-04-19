// The intermission screen that pops up between rounds of a game

import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Intermission = () => {
    const { game } = useContext(GlobalContext);

    return (
        <div className="container">
            <h3>Player Total Scores</h3>
            {game.players.map(player => {
                return (
                    <li>{player.name}: {player.gameTotal}</li>
                );
            })}
        </div>
    )
}