import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Scoreboard = () => {
    const { game } = useContext(GlobalContext);


    return (
        <h3>
            The Scoreboard would go here!!!
            <p>Player amount: {game.players}</p>
            <p>Round amount: {game.rounds}</p>
        </h3>
    )
}