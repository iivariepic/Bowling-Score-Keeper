import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const StartGame = () => {
  const [players, setPlayers] = useState([
    { name: "", scores: Array(10).fill({ total: 0 }) },
    { name: "", scores: Array(10).fill({ total: 0 }) },
  ]); // Minimum 2 players
  const [rounds, setRounds] = useState(3);
  const { startGame } = useContext(GlobalContext);

  // Handle player name change
  const handlePlayerNameChange = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = value;
    setPlayers(updatedPlayers);
  };

  // Add a new player
  const onAdd = () => {
    if (players.length < 4) {
      setPlayers([
        ...players,
        { name: "", scores: Array(10).fill({ total: 0 }) },
      ]);
    }
  };

  // Remove the last player
  const onDelete = () => {
    if (players.length > 2) {
      setPlayers(players.slice(0, -1));
    }
  };

  // Validate player names
  const validatePlayers = () => {
    const names = players.map((player) => player.name.trim());
    const uniqueNames = new Set(names);
    return (
      names.length === uniqueNames.size && // All names are unique
      names.every((name) => name.length > 0) // No empty names
    );
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    if (!validatePlayers()) {
      alert("Please ensure all player names are unique and non-empty.");
      return;
    }

    const newGame = {
      players: players.map((player) => ({
        ...player,
        scores: Array(10).fill({ total: 0 }), // Initialize scores for 10 frames
        gameTotal: 0,
      })),
      rounds,
    };

    startGame(newGame);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Game Setup</h2>

      <div className="form-control">
        <label>Players:</label>
        {players.map((player, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Player ${index + 1} Name`}
            value={player.name}
            onChange={(e) => handlePlayerNameChange(index, e.target.value)}
            maxLength="20"
            className="input-margin"
          />
        ))}

        <div className="inline">
          <button
            type="button"
            className="btn"
            onClick={onDelete}
            disabled={players.length <= 2} // Disable if only 2 players
          >
            Delete Player
          </button>
          <button
            type="button"
            className="btn"
            onClick={onAdd}
            disabled={players.length >= 4} // Disable if 4 players
          >
            Add Player
          </button>
        </div>
      </div>

      <div className="form-control">
        <label>Number of Rounds:</label>
        <div className="radio-group">
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
        className="btn"
        disabled={!validatePlayers()} // Disable if validation fails
      >
        Start Game
      </button>
    </form>
  );
};
