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
    }
}