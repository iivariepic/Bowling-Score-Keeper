import React, { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";
import { ResultsTable } from "./ResultsTable";

export const EndScreen = () => {
  const { game, currentRound, backToMain, restartGame, prevFrame } = useContext(GlobalContext);
  const resultRef = useRef();

  const downloadPDF = async () => {
    const element = resultRef.current;

    try {
      const html2pdf = (await import('html2pdf.js')).default;

      const opt = {
        margin: 0.5,
        filename: 'bowling-score.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Failed to load html2pdf.js", error);
    }
  };

  return (
    <div className="end-screen-container">
      <div ref={resultRef}>
        <ResultsTable
          players={game.players}
          currentRound={currentRound}
          title="Final Results"
        />
      </div>
      <div className="form-control">
        <button
            className="btn"
            onClick={() => {
              prevFrame();
            }}
        >
          Modify Last Game
        </button>
        <button className="btn" onClick={backToMain}>Main Menu</button>
        <button className="btn" onClick={restartGame}>Restart Match</button>
        <button className="btn" onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
};
