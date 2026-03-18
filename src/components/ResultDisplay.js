import React, { useEffect, useState } from 'react';

export default function ResultDisplay({ result, onNext, gamePhase }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setVisible(true);
    }
  }, [result]);

  if (!result) return null;

  const isGameOver = gamePhase === 'gameover';
  const { outcome, commentary, color, isWicket, isBoundary } = result;

  return (
    <div className={`result-overlay ${visible ? 'show' : ''}`}>
      <div className="result-card" style={{ borderColor: color }}>
        <div
          className={`result-badge ${isWicket ? 'wicket' : isBoundary ? 'boundary' : 'normal'}`}
          style={{ background: color }}
        >
          {isWicket ? '💥 OUT!' : isBoundary ? `${outcome.split(' ')[0]} ★` : outcome}
        </div>
        <div className="result-commentary">"{commentary}"</div>
        {!isGameOver && (
          <button className="next-ball-btn" onClick={onNext}>
            ▶ NEXT BALL
          </button>
        )}
      </div>
    </div>
  );
}
