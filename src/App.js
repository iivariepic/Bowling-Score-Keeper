import React, {useContext} from 'react';
import { Header } from './components/Header';
import { StartGame } from './components/StartGame'
import {Scoreboard} from "./components/Scoreboard";
import {FrameForm} from "./components/FrameForm";
import {Intermission} from "./components/Intermission";

import {GlobalContext, GlobalProvider} from "./context/GlobalState";

import './App.css';

const GameWrapper = () => {
    const { game, currentFrame } = useContext(GlobalContext);

    if (!game?.players) {
        // This is what is visible before the game starts
        return <StartGame />
    }

    if (currentFrame === 11) {
        return <Intermission />;
    }

    return (
        <div className="container">
            {/* This is what is visible after the game starts */}
            <Scoreboard />
            <FrameForm />
        </div>
    )
}

function App() {
  return (
    <GlobalProvider>
      <Header />
      <GameWrapper />
    </GlobalProvider>
  );
}

export default App;
