// The form that contains the settings for the game

import React, {useState, useContext, useEffect} from 'react'
import { GlobalContext } from "../context/GlobalState";

export const FrameForm = () => {
    const { game, currentFrame, updatePlayers, nextFrame } = useContext(GlobalContext);
    const [frameScores, setFrameScores] = useState({});
    const players = game.players


    // Initialize frame scores
    useEffect(() => {
        const initialScores = {};
        players.forEach(player => {
            initialScores[player.name] = {ball1: "", ball2: ""}
        });
        setFrameScores(initialScores);
    }, [players])

    // Handle ball input changes
    const handleChange = (playerName, ball, value) => {
        // Make sure the ball scores equal to at most 10
        value = Number(value);
        const otherBall = ball === "ball1" ? "ball2" : "ball1";
        const otherValue = frameScores[playerName]?.[otherBall] ?? 0;

        if (value + otherValue > 10) {
            value = 10 - otherValue;
        }

        setFrameScores(prev => ({
            ...prev,
            [playerName]: {
                ...prev[playerName],
                [ball]: value
            }
        }))
    }

    // Calculate Frame Score
    const calculateFrameScore = (player) => {
        const {ball1, ball2} = frameScores[player.name];
        return (Number(ball1) || 0) + (Number(ball2) || 0);
    }

    const onSubmit = e => {
        e.preventDefault()

        const updatedPlayers = players.map(player => {
            const frameScore = calculateFrameScore(player)

            return {
                ...player,
                scores: [...player.scores, frameScore],
            };
        });

        updatePlayers(updatedPlayers);
        nextFrame();
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-control">
                <h3>Current Frame: {currentFrame}</h3>
                {/* Entry fields for ball scores */}
                {players.map((player, index) => (
                    <div className="inline">
                        {/* Ball 1 Input */}
                        <label>{player.name}:</label>
                        <input
                            type="number"
                            placeholder="Pins (Ball 1)"
                            value={frameScores[player.name]?.ball1 ?? ""}
                            style={{marginBottom: "1rem"}}
                            max="10"
                            min="0"
                            onChange={(e) =>
                                handleChange(player.name, "ball1", e.target.value)
                            }
                        />
                        {/* Ball 2 Input */}
                        <input
                            type="number"
                            placeholder="Pins (Ball 2)"
                            value={frameScores[player.name]?.ball2 ?? ""}
                            style={{marginBottom: "1rem"}}
                            max="10"
                            min="0"
                            onChange={(e) =>
                                handleChange(player.name, "ball2", e.target.value)
                            }
                        />
                    </div>
                ))}
            </div>
            <div className="form-control">
                <button className="btn">
                    Submit Frame Scores
                </button>
            </div>
        </form>
    )
}