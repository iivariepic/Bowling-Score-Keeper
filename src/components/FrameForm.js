// The form that can be used to submit the scores of the current frame

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
        return {
            total: (Number(ball1) || 0) + (Number(ball2) || 0),
            ball1: Number(ball1),
            ball2: Number(ball2),
        };
    }

    // Function to update player scores
    const updatePlayerScore = (player) => {
        const frameScore = calculateFrameScore(player);
        const newScores = [...player.scores];

        // Update the previous scores if it was a strike or spare
        const lastIndex = newScores.length - 1;

        if (lastIndex >= 0) {
            const prev = newScores[lastIndex];

            // Strike
            if (prev.ball1 === 10) {
                // Add both ball 1 and ball 2 to total
                prev.total += frameScore.ball1 + frameScore.ball2;
                // Also check the frame before for double strikes
                if (lastIndex >= 1) {
                    const before_prev = newScores[lastIndex-1];
                    if (before_prev.ball1 === 10) {
                        // Add ball 1
                        before_prev.total += frameScore.ball1
                    }
                }
            }
            // Spare
            else if (prev.ball1 + prev.ball2 === 10) {
                // Add only ball 1 to total
                prev.total += frameScore.ball1
            }
        }

        newScores.push(frameScore)

        // Update the player game total score if the current frame is the last
        let newTotal = player.gameTotal || 0;
        if (currentFrame === 10){
            const prevTotal = player.gameTotal || 0;
            newTotal = prevTotal + player.scores.reduce((sum, score) => sum + score.total, 0);
        }

        return {
            ...player,
            scores: newScores,
            gameTotal: newTotal,
        };
    }

    const onSubmit = e => {
        e.preventDefault()

        const updatedPlayers = players.map(player => updatePlayerScore(player));

        updatePlayers(updatedPlayers);
        nextFrame();
    };

    return (
        <form onSubmit={onSubmit} style={{ width: '600px' }}>
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