import React, {useState, useContext } from 'react'
import { GlobalContext } from "../context/GlobalState";

export const StartGame = () => {
    const [players, setPlayers] = useState(1);
    const [rounds, setRounds] = useState(3)

    const { startGame } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault()

        const newGame = {
            players,
            rounds
        }

        startGame(newGame)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="playerAmount">Amount of Players (1-4)</label>
                    <input
                        type="number"
                        value={players}
                        onChange={(event) => setPlayers(Number(event.target.value))}
                        min="1"
                        max="4"
                    />
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