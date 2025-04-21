import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  game: {},
  currentRound: 1,
  currentFrame: 1,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function startGame(game) {
    dispatch({
      type: "START_GAME",
      payload: game,
    });
  }

  function nextFrame() {
    dispatch({ type: "NEXT_FRAME" });
  }

  function prevFrame() {
    dispatch({ type: "PREV_FRAME" });
  }

  function updatePlayers(players) {
    dispatch({ type: "UPDATE_PLAYERS", payload: players });
  }

  function nextRound() {
    dispatch({ type: "NEXT_ROUND" });
  }

  function backToMain() {
    dispatch({ type: "BACK_TO_MAIN" });
  }

  function restartGame() {
    dispatch({ type: "RESTART_GAME" });
  }

  return (
    <GlobalContext.Provider
      value={{
        game: state.game,
        currentRound: state.currentRound,
        currentFrame: state.currentFrame,
        startGame,
        nextFrame,
        prevFrame,
        updatePlayers,
        nextRound,
        backToMain,
        restartGame,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
