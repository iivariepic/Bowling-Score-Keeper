import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  game: {},
  currentRound: 1,
  currentFrame: 1,
  showIntermission: false, // New state to control intermission visibility
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

  function nextRound() {
    dispatch({ type: "NEXT_ROUND" });
  }

  function backToMain() {
    dispatch({ type: "BACK_TO_MAIN" });
  }

  function restartGame() {
    dispatch({ type: "RESTART_GAME" });
  }

  function updateFrameScore(playerName, frameIndex, ball, value) {
    dispatch({
      type: "UPDATE_FRAME_SCORE",
      payload: { playerName, frameIndex, ball, value },
    });
  }

  function toggleIntermission(show) {
    dispatch({ type: "TOGGLE_INTERMISSION", payload: show });
  }

  return (
    <GlobalContext.Provider
      value={{
        game: state.game,
        currentRound: state.currentRound,
        currentFrame: state.currentFrame,
        showIntermission: state.showIntermission,
        startGame,
        nextFrame,
        prevFrame,
        nextRound,
        toggleIntermission,
        backToMain,
        restartGame,
        updateFrameScore,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
