import React from "react";

export const ResultsTable = ({ players, currentRound, title }) => {
  return (
    <div className="table-wrapper">
      <h2>{title}</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              {Array.from(
                {
                  length: Math.max(
                    ...players.map(
                      (p) => (p.displayRounds || p.rounds || []).length
                    ),
                    currentRound
                  ),
                },
                (_, i) => (
                  <th key={`round-${i + 1}`}>Round {i + 1}</th>
                )
              )}
              <th>Average</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              // Prefer displayRounds/Total/Average if present, fallback to old fields
              const rounds = player.displayRounds || player.rounds || [];
              const isCurrentRoundComplete = rounds.length === currentRound;
              const currentScore = player.scores?.reduce(
                (sum, s) => sum + (s.total || 0),
                0
              );
              const totalRounds = isCurrentRoundComplete
                ? rounds
                : [...rounds, currentScore];
              return (
                <tr key={player.name}>
                  <td>{player.name}</td>
                  {Array.from(
                    {
                      length: Math.max(
                        ...players.map(
                          (p) => (p.displayRounds || p.rounds || []).length
                        ),
                        currentRound
                      ),
                    },
                    (_, i) => (
                      <td key={`player-${player.name}-round-${i + 1}`}>
                        {totalRounds[i] || 0}
                      </td>
                    )
                  )}
                  <td>
                    {(
                      totalRounds.reduce((sum, score) => sum + score, 0) /
                      totalRounds.length
                    ).toFixed(1)}
                  </td>
                  <td>{totalRounds.reduce((sum, score) => sum + score, 0)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
