import React from "react";

export const ResultsTable = ({ players, currentRound, title }) => {
  const playersWithTotals = players.map((player) => {
    const rounds = player.rounds || [];
    const isCurrentRoundComplete = rounds.length === currentRound;
    const currentScore = player.scores?.reduce(
      (sum, s) => sum + (s.total || 0),
      0
    );
    const totalRounds = isCurrentRoundComplete
      ? rounds
      : [...rounds, currentScore];

    const totalScore = totalRounds.reduce((sum, score) => sum + score, 0);
    const averageScore =
      totalRounds.length > 0 ? totalScore / totalRounds.length : 0;

    return {
      ...player,
      totalRounds,
      totalScore,
      averageScore,
    };
  });

  const sortedPlayers = [...playersWithTotals].sort(
    (a, b) => b.averageScore - a.averageScore
  );

  return (
    <div>
      <h2 className="start-title">{title}</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              {Array.from(
                {
                  length: Math.max(
                    ...players.map((p) => (p.rounds || []).length),
                    currentRound
                  ),
                },
                (_, i) => (
                  <th key={`round-${i + 1}`}>Game {i + 1}</th>
                )
              )}
              <th>Avg / Game</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player) => (
              <tr key={player.name}>
                <td>{player.name}</td>
                {Array.from(
                  {
                    length: Math.max(
                      ...players.map((p) => (p.rounds || []).length),
                      currentRound
                    ),
                  },
                  (_, i) => (
                    <td key={`player-${player.name}-round-${i + 1}`}>
                      {player.totalRounds[i] || 0}
                    </td>
                  )
                )}
                <td>{player.averageScore.toFixed(1)}</td>
                <td>{player.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
