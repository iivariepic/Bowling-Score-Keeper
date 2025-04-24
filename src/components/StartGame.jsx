import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const StartGame = () => {
  const [players, setPlayers] = useState([
    { name: "", scores: Array(10).fill({ total: 0 }) },
    { name: "", scores: Array(10).fill({ total: 0 }) },
  ]);
  const [rounds, setRounds] = useState(3);
  const { startGame } = useContext(GlobalContext);

  const handlePlayerNameChange = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = value;
    setPlayers(updatedPlayers);
  };

  const onAdd = () => {
    if (players.length < 4) {
      setPlayers([
        ...players,
        { name: "", scores: Array(10).fill({ total: 0 }) },
      ]);
    }
  };

  const onDelete = () => {
    if (players.length > 2) {
      setPlayers(players.slice(0, -1));
    }
  };

  const validatePlayers = () => {
    const names = players.map((player) => player.name.trim());
    const uniqueNames = new Set(names);
    return (
      names.length === uniqueNames.size &&
      names.every((name) => name.length > 0)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validatePlayers()) {
      alert("Please ensure all player names are unique and non-empty.");
      return;
    }

    const newGame = {
      players: players.map((player) => ({
        ...player,
        scores: Array(10).fill({ total: 0 }),
        gameTotal: 0,
      })),
      rounds,
    };

    startGame(newGame);
  };

  return (
    <form onSubmit={onSubmit} className="start-game-form">
      <div className="start-game-container">
        <h2 className="start-title">Game Setup</h2>

        <div className="start-game-section">
          <label>Players:</label>
          {players.map((player, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Player ${index + 1} Name`}
              value={player.name}
              onChange={(e) => handlePlayerNameChange(index, e.target.value)}
              maxLength="20"
              className="input player-input"
            />
          ))}

          <div className="player-buttons">
            <button
              type="button"
              className="btn small"
              onClick={onDelete}
              disabled={players.length <= 2}
            >
              Delete Player
            </button>
            <button
              type="button"
              className="btn small"
              onClick={onAdd}
              disabled={players.length >= 4}
            >
              Add Player
            </button>
          </div>
        </div>

        <div className="start-game-section">
          <label>Number of Games:</label>
          <div className="round-options">
            <label>
              3
              <input
                type="radio"
                value="3"
                checked={rounds === 3}
                onChange={(e) => setRounds(Number(e.target.value))}
              />
            </label>
            <label>
              5
              <input
                type="radio"
                value="5"
                checked={rounds === 5}
                onChange={(e) => setRounds(Number(e.target.value))}
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn full"
          disabled={!validatePlayers()}
        >
          Start Match
        </button>
      </div>
    </form>
  );
};
