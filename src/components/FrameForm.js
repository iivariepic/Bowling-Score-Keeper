// The form that can be used to submit the scores of the current frame

import React, {useState, useContext, useEffect} from 'react'
import { GlobalContext } from "../context/GlobalState";

export const FrameForm = () => {
    const { game, currentFrame, updatePlayers, nextFrame, prevFrame } = useContext(GlobalContext);
    const [frameScores, setFrameScores] = useState({});
    const players = game.players


    // Initialize frame scores
    useEffect(() => {
        const initialScores = {};
        players.forEach(player => {
            const frameScore = player.scores?.[currentFrame - 1] || { ball1: "", ball2: "" };
            initialScores[player.name] = {
                ball1: frameScore.ball1 ?? "",
                ball2: frameScore.ball2 ?? "",
                ball3: frameScore.ball3 ?? ""
            };
        });
        setFrameScores(initialScores);
    }, [players, currentFrame]);

    // Handle ball input changes
    const handleChange = (playerName, ball, value) => {
        value = Number(value);

        if (ball !== "ball3"){
            // Make sure the ball scores equal to at most 10 (Only for balls 1 and 2)
            const otherBall = ball === "ball1" ? "ball2" : "ball1";
            const otherValue = frameScores[playerName]?.[otherBall] ?? 0;

            if (value + otherValue > 10) {
                value = 10 - otherValue;
            }
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
        const { ball1, ball2, ball3 } = frameScores[player.name];

        const b1 = Number(ball1) || 0;
        const b2 = Number(ball2) || 0;
        const b3 = Number(ball3) || 0;

        let totalScore = b1 + b2;

        // Frame 10 logic
        if (currentFrame === 10) {
            if (b1 === 10 || b1 + b2 === 10) {
                totalScore += b3;
            }
        }

        return {
            total: totalScore,
            ball1: b1,
            ball2: b2,
            ball3: b3,
        };
    }

    // Function to update player scores
    const updatePlayerScore = (player) => {
        const frameScore = calculateFrameScore(player);
        const newScores = [...player.scores];

        // Update the previous scores if it was a strike or spare
        const lastIndex = currentFrame - 2;

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

        newScores[currentFrame - 1] = frameScore;

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
    };

    // This is needed for the "Prev Frame"
    const submitAndPrevFrame = (e) => {
        e.preventDefault();

        const updatedPlayers = players.map(player => updatePlayerScore(player));
        updatePlayers(updatedPlayers);

        prevFrame();
    };

    // This is needed for the "Next Frame"
    const submitAndNextFrame = (e) => {
        e.preventDefault();

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
                        {/* Ball 3 Input but only for frame 10 AND if there was a strike or a spare*/}
                        {currentFrame === 10 && (
                            (frameScores[player.name]?.ball1 === 10 ||
                                frameScores[player.name]?.ball1 + frameScores[player.name]?.ball2 === 10)
                            && (
                                <input
                                    type="number"
                                    placeholder="Pins (Ball 3)"
                                    value={frameScores[player.name]?.ball3 ?? ""}
                                    style={{ marginBottom: "1rem" }}
                                    max="10"
                                    min="0"
                                    onChange={(e) =>
                                        handleChange(player.name, "ball3", e.target.value)
                                    }
                                />
                            )
                        )}
                    </div>
                ))}
            </div>
            <div className="form-control">
                <div className="inline">
                    <button
                        className="btn"
                        onClick={submitAndPrevFrame}
                        disabled={currentFrame <= 1}
                    >
                        Previous Frame
                    </button>
                    <button
                        className="btn"
                        onClick={submitAndNextFrame}
                    >
                        {currentFrame !== 10 ? "Next Frame" : "Submit Round"}
                    </button>
                </div>
            </div>
        </form>
    )
}