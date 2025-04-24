export default (state, action) => {
  switch (action.type) {
    default:
      return state;

    case "START_GAME":
      return {
        ...state,
        currentFrame: 1, // Start at frame 1
        game: action.payload,
      };

    case "NEXT_FRAME":
      return {
        ...state,
        currentFrame: state.currentFrame + 1,
      };

    case "PREV_FRAME":
      return {
        ...state,
        currentFrame: Math.max(1, state.currentFrame - 1), // Ensure min frame is 1
      };

    case "NEXT_ROUND":
      if (state.currentRound >= state.game.rounds) {
        return {
          ...state,
          showIntermission: false, // Hide intermission if the game is over
        };
      }
      return {
        ...state,
        currentRound: state.currentRound + 1, // Increment the round
        currentFrame: 1, // Reset the frame to 1
        game: {
          ...state.game,
          players: state.game.players.map((player) => {
            const roundTotal = player.scores.reduce(
              (sum, s) => sum + (s.total || 0),
              0
            );
            return {
              ...player,
              gameTotal: (player.gameTotal || 0) + roundTotal, // Update total score
              rounds: [...(player.rounds || []), roundTotal], // Add round total to rounds
              scores: [], // Reset scores for the new round
            };
          }),
        },
        showIntermission: true, // Show intermission after the round
      };

    case "BACK_TO_MAIN":
      return {
        ...state,
        currentRound: 1,
        game: null,
        currentFrame: 0,
      };

    case "RESTART_GAME":
      return {
        ...state,
        currentRound: 1,
        currentFrame: 1,
        game: {
          ...state.game,
          players: state.game.players.map((player) => ({
            ...player,
            scores: [],
            gameTotal: 0,
            rounds: [],
          })),
        },
      };

    case "UPDATE_FRAME_SCORE":
      const { playerName, frameIndex, ball, value } = action.payload;

      return {
        ...state,
        game: {
          ...state.game,
          players: state.game.players.map((player) => {
            if (player.name !== playerName) return player;

            const scores = [...player.scores];
            const frame = {
              ball1: 0,
              ball2: 0,
              ball3: 0,
              total: 0,
              ...scores[frameIndex],
            };

            frame[ball] = value;
            scores[frameIndex] = frame;

            // Recalculate all frame totals with bonuses
            for (let i = 0; i < scores.length; i++) {
              const f = {
                ball1: scores[i]?.ball1 || 0,
                ball2: scores[i]?.ball2 || 0,
                ball3: scores[i]?.ball3 || 0,
                total: 0,
              };

              const isStrike = f.ball1 === 10;
              const isSpare = f.ball1 + f.ball2 === 10 && f.ball1 !== 10;

              const next1 = scores[i + 1] || {};
              const next2 = scores[i + 2] || {};

              if (i === 9) {
                const isFinalStrike = f.ball1 === 10;
                const isFinalSpare = f.ball1 + f.ball2 === 10;

                if (isFinalStrike || isFinalSpare) {
                  f.total = f.ball1 + f.ball2 + f.ball3;
                } else {
                  f.total = f.ball1 + f.ball2;
                }
              } else if (isStrike) {
                let bonusBalls = [];

                if (next1.ball1 !== undefined) bonusBalls.push(next1.ball1);
                if (next1.ball1 === 10 && next2.ball1 !== undefined) {
                  bonusBalls.push(next2.ball1);
                } else if (next1.ball2 !== undefined) {
                  bonusBalls.push(next1.ball2);
                }

                const strikeBonus = (bonusBalls[0] || 0) + (bonusBalls[1] || 0);
                f.total = 10 + strikeBonus;
              } else if (isSpare) {
                f.total = 10 + (next1.ball1 || 0);
              } else {
                f.total = f.ball1 + f.ball2;
              }

              scores[i] = { ...scores[i], total: f.total };
            }

            const newGameTotal = scores.reduce(
              (sum, s) => sum + (s.total || 0),
              0
            );

            return {
              ...player,
              scores,
              gameTotal: newGameTotal,
              rounds: [...(player.rounds || [])],
            };
          }),
        },
      };

    case "TOGGLE_INTERMISSION":
      return {
        ...state,
        showIntermission: action.payload,
      };
  }
};
