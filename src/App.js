import React, {useContext} from 'react';
import { Header } from './components/Header';
import { StartGame } from './components/StartGame'
import {Scoreboard} from "./components/Scoreboard";

import {GlobalContext, GlobalProvider} from "./context/GlobalState";

import './App.css';

const GameWrapper = () => {
    const { game } = useContext(GlobalContext);

    return (
        <div className="container">
            {!game?.players ?
                // This is what is visible before the game starts
                <StartGame />
                :
                // This is what is visible after the game starts
                <Scoreboard />}
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
