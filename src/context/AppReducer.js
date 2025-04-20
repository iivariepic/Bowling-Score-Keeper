export default (state, action) => {
    switch(action.type) {
        default:
            return state

        case 'START_GAME':
            return {
                ...state,
                game: action.payload
            }

        case "NEXT_FRAME":
            return {
                ...state,
                currentFrame: state.currentFrame + 1,
            }

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
                currentFrame: 0,
                game: {
                    ...state.game,
                    players: state.game.players.map(player => ({
                        ...player,
                        scores: [],
                    })),
                },
            };

        case "BACK_TO_MAIN":
            return {
                ...state,
                currentRound: 1,
                game: null,
                currentFrame: 0,
        };
    }
}