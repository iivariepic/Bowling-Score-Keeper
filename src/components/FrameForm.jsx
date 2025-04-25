import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

export const FrameForm = () => {
  const {
    game,
    currentFrame,
    updateFrameScore,
    nextFrame,
    prevFrame,
    nextRound,
    toggleIntermission,
  } = useContext(GlobalContext);
  const players = game.players;

  const [frameScores, setFrameScores] = useState({});

  // Initialize frame scores
  useEffect(() => {
    const initialScores = {};
    players.forEach((player) => {
      const frameScore = player.scores?.[currentFrame - 1] || {
        ball1: 0,
        ball2: 0,
        ball3: 0,
      };
      initialScores[player.name] = {
        ball1: frameScore.ball1 ?? 0,
        ball2: frameScore.ball2 ?? 0,
        ball3: frameScore.ball3 ?? 0,
      };
    });
    setFrameScores(initialScores);
  }, [players, currentFrame]);

  // Handle input changes
  const handleChange = (playerName, ball, value) => {
    value = Number(value);

    // Ensure valid input for Ball 1 and Ball 2 (frames 1-9 only)
    if (ball !== "ball3" && currentFrame < 10) {
      const otherBall = ball === "ball1" ? "ball2" : "ball1";
      const otherValue = frameScores[playerName]?.[otherBall] ?? 0;

      if (value + otherValue > 10) {
        value = 10 - otherValue;
      }
    }

    // For frame 10, ball2 and ball3 can be up to 10 individually, no sum restriction

    // Update local state
    setFrameScores((prevScores) => ({
      ...prevScores,
      [playerName]: {
        ...prevScores[playerName],
        [ball]: value,
      },
    }));

    // Update global state immediately
    updateFrameScore(playerName, currentFrame - 1, ball, value); // Ensure frameIndex is correct
  };

  // Submit and move to the previous frame
  const submitAndPrevFrame = (e) => {
    e.preventDefault();

    players.forEach((player) => {
      const frameScore = frameScores[player.name] || {};
      updateFrameScore(
        player.name,
        currentFrame - 1,
        "ball1",
        frameScore.ball1 || 0
      );
      updateFrameScore(
        player.name,
        currentFrame - 1,
        "ball2",
        frameScore.ball2 || 0
      );
      if (currentFrame === 10) {
        updateFrameScore(
          player.name,
          currentFrame - 1,
          "ball3",
          frameScore.ball3 || 0
        );
      }
    });

    prevFrame();
  };

  // Submit and move to the next frame
  const submitAndNextFrame = (e) => {
    e.preventDefault();

    players.forEach((player) => {
      const frameScore = frameScores[player.name] || {};
      updateFrameScore(
        player.name,
        currentFrame - 1,
        "ball1",
        frameScore.ball1 || 0
      );
      updateFrameScore(
        player.name,
        currentFrame - 1,
        "ball2",
        frameScore.ball2 || 0
      );
      if (currentFrame === 10) {
        updateFrameScore(
          player.name,
          currentFrame - 1,
          "ball3",
          frameScore.ball3 || 0
        );
      }
    });

    if (currentFrame === 10) {
      nextFrame();
      toggleIntermission(true); // Show the intermission screen
    } else {
      nextFrame(); // Move to the next frame
    }
  };

  // Determine if Roll 3 should be shown in header and rows
  const showRoll3Header =
    currentFrame === 10 &&
    players.some((p) => {
      const ball1 = Number(frameScores[p.name]?.ball1) || 0;
      const ball2 = Number(frameScores[p.name]?.ball2) || 0;
      return ball1 === 10 || ball1 + ball2 === 10;
    });

  return (
    <form onSubmit={submitAndNextFrame} className="frame-form">
      <h3>Current Frame: {currentFrame}</h3>
      <div className="table-wrapper">
        <table className="frame-form-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Roll 1</th>
              <th>Roll 2</th>
              {showRoll3Header && <th>Roll 3</th>}
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => {
              const ball1 = Number(frameScores[player.name]?.ball1) || 0;
              const ball2 = Number(frameScores[player.name]?.ball2) || 0;
              const showRoll3 =
                currentFrame === 10 && (ball1 === 10 || ball1 + ball2 === 10);

              return (
                <tr key={`frame-form-player-${index}-${player.name}`}>
                  <td>{player.name}</td>
                  <td>
                    <input
                      type="number"
                      value={frameScores[player.name]?.ball1 ?? 0} // Default to 0
                      max="10"
                      min="0"
                      onInput={(e) =>
                        (e.target.value = Math.max(
                          0,
                          Math.min(10, e.target.value)
                        ))
                      }
                      onChange={(e) =>
                        handleChange(player.name, "ball1", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={frameScores[player.name]?.ball2 ?? 0} // Default to 0
                      max="10"
                      min="0"
                      onInput={(e) =>
                        (e.target.value = Math.max(
                          0,
                          Math.min(10, e.target.value)
                        ))
                      }
                      onChange={(e) =>
                        handleChange(player.name, "ball2", e.target.value)
                      }
                      disabled={
                        currentFrame < 10 &&
                        frameScores[player.name]?.ball1 === 0
                      }
                    />
                  </td>
                  {showRoll3 && (
                    <td>
                      <input
                        type="number"
                        value={frameScores[player.name]?.ball3 ?? 0} // Default to 0
                        max="10"
                        min="0"
                        onInput={(e) =>
                          (e.target.value = Math.max(
                            0,
                            Math.min(10, e.target.value)
                          ))
                        }
                        onChange={(e) =>
                          handleChange(player.name, "ball3", e.target.value)
                        }
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="form-control">
          <button
            className="btn"
            onClick={submitAndPrevFrame}
            disabled={currentFrame <= 1}
          >
            Previous Frame
          </button>
          <button className="btn" type="submit">
            {currentFrame !== 10 ? "Next Frame" : "Submit Round"}
          </button>
        </div>
      </div>
    </form>
  );
};
