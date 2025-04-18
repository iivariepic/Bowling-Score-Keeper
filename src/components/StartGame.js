// The form that contains the settings for the game

import React, {useState, useContext } from 'react'
import { GlobalContext } from "../context/GlobalState";

export const StartGame = () => {
    const [players, setPlayers] = useState([{name:"", scores:[]}]);
    const [rounds, setRounds] = useState(3);

    const { startGame } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault()

        const newGame = {
            players,
            rounds
        }

        startGame(newGame)
    }

    // Delete button pressed
    const onDelete = e => {
        e.preventDefault()
        let newPlayers = [...players]
        newPlayers.pop()
        setPlayers(newPlayers)
    }

    // Add button pressed
    const onAdd = e => {
        e.preventDefault()
        setPlayers([...players, {name:"", scores:[]}])
    }

    // Handle player name change
    const handlePlayerNameChange = (index, value) => {
        const updatedPlayers = [...players];
        updatedPlayers[index].name = value;
        setPlayers(updatedPlayers);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="playerAmount">Players</label>
                    {/* Render the player name inputs */}
                    {players.map((player, index) => (
                        <input
                            type="text"
                            placeholder={`Player ${index +1} name`}
                            value = {player.name}
                            onChange={(event) => handlePlayerNameChange(
                                index, event.target.value
                            )}
                            style={{ marginBottom: "1rem"}}
                        />
                    ))}

                    <div className="inline">
                        {/* Delete button */}
                        <button
                            type="button"
                            className="btn"
                            onClick={ onDelete }
                            disabled={players.length <= 1}

                        >
                            Delete Player
                        </button>

                        {/* Add button */}
                        <button
                            type="button"
                            className="btn"
                            onClick={ onAdd}
                            disabled={players.length >= 4}
                        >
                            Add Player
                        </button>
                    </div>
                </div>

                <div className="form-control">
                    <label>Number of Rounds</label>
                    <div>
                        <input
                            type="radio"
                            value="3"
                            checked={rounds === 3}
                            onChange={(event) => setRounds(Number(event.target.value))}
                        />
                        <label htmlFor="round3">3</label>

                        <input
                            type="radio"
                            value="5"
                            checked={rounds === 5}
                            onChange={(event) => setRounds(Number(event.target.value))}
                        />
                        <label htmlFor="round5">5</label>
                    </div>
                </div>
                <button className="btn">Start Game with these Settings</button>
            </form>
        </>
    )
}