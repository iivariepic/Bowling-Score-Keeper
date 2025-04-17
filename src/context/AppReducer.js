export default (state, action) => {
    switch(action.type) {
        default:
            return state

        case 'START_GAME':
            return {
                ...state,
                game: action.payload
            }
    }
}