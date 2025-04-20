// The End Screen that plays after all the rounds are finished

import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const EndScreen = () => {
    const {game, currentRound, backToMain} = useContext(GlobalContext);
    let players = [...game.players].sort((a, b) => b.gameTotal - a.gameTotal);

    return (
        <div className="container">
            <h3>Player Final Standings</h3>
            <div className="list">
                {players.map(player => {
                    return (
                        <li><b>{players.indexOf(player) + 1}.</b>{player.name}
                            : {Number.isInteger(player.gameTotal / currentRound)
                                // Only show the decimal if it is needed
                                ? player.gameTotal / currentRound
                                : (player.gameTotal / currentRound).toFixed(1)}</li>
                    );
                })}
            </div>
            <button
                className="btn"
                onClick={backToMain}
            >
                Back To Main Menu
            </button>
        </div>
    )
}