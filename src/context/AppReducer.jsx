export default (state, action) => {
  switch (action.type) {
    default:
      return state;

    case "START_GAME":
      return {
        ...state,
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
        currentFrame: Math.max(1, state.currentFrame - 1),
      };

    case "UPDATE_PLAYERS":
      return {
        ...state,
        game: {
          ...state.game,
          players: action.payload,
        },
      };

    case "NEXT_ROUND":
      return {
        ...state,
        currentRound: state.currentRound + 1,
        currentFrame: 1,
        game: {
          ...state.game,
          players: state.game.players.map((player) => {
            const roundTotal = player.scores.reduce(
              (sum, s) => sum + (s.total || 0),
              0
            );
            return {
              ...player,
              gameTotal: (player.gameTotal || 0) + roundTotal,
              rounds: [...(player.rounds || []), roundTotal],
              scores: [],
            };
          }),
        },
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
        currentFrame: 0,
        game: {
          ...state.game,
          players: state.game.players.map((player) => ({
            ...player,
            scores: [],
            gameTotal: 0,
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
            if (player.name === playerName) {
              const updatedScores = [...player.scores];
              const prevFrame = updatedScores[frameIndex] || {
                ball1: 0,
                ball2: 0,
                ball3: 0,
                total: 0,
              };

              // Create a new copy of the frame to avoid direct mutation
              const updatedFrame = {
                ...prevFrame,
                [ball]: value,
              };

              // Ensure all ball values are numbers (default to 0 if undefined)
              updatedFrame.ball1 = updatedFrame.ball1 || 0;
              updatedFrame.ball2 = updatedFrame.ball2 || 0;
              updatedFrame.ball3 = updatedFrame.ball3 || 0;

              // Recalculate total for the frame
              if (frameIndex === 9) {
                const isStrike = updatedFrame.ball1 === 10;
                const isSpare = updatedFrame.ball1 + updatedFrame.ball2 === 10;
                updatedFrame.total =
                  updatedFrame.ball1 +
                  updatedFrame.ball2 +
                  (isStrike || isSpare ? updatedFrame.ball3 : 0);
              } else {
                updatedFrame.total = updatedFrame.ball1 + updatedFrame.ball2;
              }

              // Update only the current frame
              updatedScores[frameIndex] = updatedFrame;

              return { ...player, scores: updatedScores };
            }
            return player;
          }),
        },
      };
  }
};
