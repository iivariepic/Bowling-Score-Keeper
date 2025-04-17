import React from 'react';
import { Header } from './components/Header';
import { StartGame } from './components/StartGame'

import './App.css';

function App() {
  return (
    <div>
      <Header />
        <div className="container">
            <StartGame />
        </div>
    </div>
  );
}

export default App;
