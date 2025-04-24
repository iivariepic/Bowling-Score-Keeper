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
        currentFrame: 0,
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

            // Update the specific ball
            frame[ball] = value;

            // Logic for frames 1–9
            if (frameIndex < 9) {
              if (frame.ball1 === 10) {
                // Strike: Only ball1 is counted
                frame.total = 10;
                frame.ball2 = 0; // Ensure ball2 is ignored
              } else {
                // Normal frame: Sum of ball1 and ball2
                frame.total = frame.ball1 + frame.ball2;
              }
            }

            // Logic for frame 10
            if (frameIndex === 9) {
              const isStrike = frame.ball1 === 10;
              const isSpare = frame.ball1 + frame.ball2 === 10;

              if (isStrike) {
                // Strike: Include ball2 and ball3
                frame.total = frame.ball1 + frame.ball2 + frame.ball3;
              } else if (isSpare) {
                // Spare: Include ball3
                frame.total = frame.ball1 + frame.ball2 + frame.ball3;
              } else {
                // No strike or spare: Only ball1 and ball2 are counted
                frame.total = frame.ball1 + frame.ball2;
              }
            }

            scores[frameIndex] = frame;

            // recalculate gameTotal and rounds after frame update
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
