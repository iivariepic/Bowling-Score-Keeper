import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer';

const initialState = {
    game: {},
    currentRound: 1,
    currentFrame: 1,
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    function startGame(game) {
        dispatch({
            type: 'START_GAME',
            payload: game
        });
    }

    function nextFrame() {
        dispatch({ type: "NEXT_FRAME" });
    }

    function updatePlayers(players) {
        dispatch({ type: "UPDATE_PLAYERS", payload: players });
    }

    return (<GlobalContext.Provider value={{
        game: state.game,
        currentRound: state.currentRound,
        currentFrame: state.currentFrame,
        startGame,
        nextFrame,
        updatePlayers,
    }}>
        {children}
    </GlobalContext.Provider>)
}