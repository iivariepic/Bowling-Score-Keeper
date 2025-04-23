import React, { useContext } from "react";
import { Layout } from "./components/Layout";
import { StartGame } from "./components/StartGame";
import { Scoreboard } from "./components/Scoreboard";
import { FrameForm } from "./components/FrameForm";
import { Intermission } from "./components/Intermission";
import { EndScreen } from "./components/EndScreen";

import { GlobalContext, GlobalProvider } from "./context/GlobalState";

const AppContent = () => {
  const { game, currentFrame, currentRound } = useContext(GlobalContext);

  const renderGameContent = () => {
    if (!game?.players) return <StartGame />;
    if (currentFrame === 11) {
      return currentRound === game?.rounds ? <EndScreen /> : <Intermission />;
    }
    return (
      <>
        <Scoreboard />
        <FrameForm />
      </>
    );
  };

  return (
    <Layout>
      <div className="container">{renderGameContent()}</div>
    </Layout>
  );
};

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}

export default App;
