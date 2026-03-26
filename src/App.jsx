import React, { useCallback, useEffect } from 'react';
import './App.css';
import useGameState from './hooks/useGameState';
import CricketField from './components/CricketField';
import Scoreboard from './components/Scoreboard';
import PowerBar from './components/PowerBar';
import BattingStyleSelector from './components/BattingStyleSelector';
import ResultDisplay from './components/ResultDisplay';
import GameOverScreen from './components/GameOverScreen';

export default function App() {
  const {
    state,
    setBattingStyle,
    startBowling,
    startBatting,
    updateSlider,
    playShot,
    nextBall,
    restartGame,
  } = useGameState();

const { gamePhase, battingStyle, runs, wickets, ballsBowled, lastResult } = state;
  // After bowling animation completes, move to batting phase
  const handleBowlingDone = useCallback(() => {
    startBatting();
  }, [startBatting]);

  // After result is shown, user clicks next ball
  const handleNext = useCallback(() => {
    nextBall();
  }, [nextBall]);

  const handleShot = useCallback((pos) => {
    playShot(pos);
  }, [playShot]);

  // Allow Space key to play shot
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' && gamePhase === 'batting') {
        e.preventDefault();
        // handled by powerbar click simulation
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gamePhase]);

  const isPlaying = gamePhase !== 'idle' && gamePhase !== 'gameover';
  const canStartBowl = gamePhase === 'idle';

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <span className="logo-icon">🏏</span>
          <span className="logo-text">CRICKET BLITZ</span>
        </div>
        <div className="header-right">
          <button className="restart-mini-btn" onClick={restartGame}>
            ↺ Restart
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* Left panel: field + scoreboard */}
        <div className="left-panel">
          <Scoreboard
            runs={runs}
            wickets={wickets}
            ballsBowled={ballsBowled}
            battingStyle={battingStyle}
          />

          <div className="field-wrapper">
            <CricketField
              gamePhase={gamePhase}
              onBowlingDone={handleBowlingDone}
            />

            {/* Phase overlay on field */}
            {gamePhase === 'idle' && (
              <div className="field-overlay">
                <div className="field-prompt">Ready to bat?</div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel: controls */}
        <div className="right-panel">
          <BattingStyleSelector
            selected={battingStyle}
            onChange={setBattingStyle}
            disabled={isPlaying}
          />

          {/* Play Button */}
          {canStartBowl && (
            <button className="bowl-btn" onClick={startBowling}>
              ▶ BOWL!
            </button>
          )}

          {gamePhase === 'bowling' && (
            <div className="phase-info bowling">
              <div className="phase-icon">⚾</div>
              <div>Ball incoming...</div>
            </div>
          )}

          {/* Power Bar */}
          {(gamePhase === 'batting' || gamePhase === 'result') && (
            <PowerBar
              battingStyle={battingStyle}
              isRunning={gamePhase === 'batting'}
              onShot={handleShot}
              onSliderUpdate={updateSlider}
              gamePhase={gamePhase}
            />
          )}

          {/* Result display */}
          {(gamePhase === 'result' || gamePhase === 'gameover') && lastResult && (
            <ResultDisplay
              result={lastResult}
              onNext={handleNext}
              gamePhase={gamePhase}
            />
          )}
        </div>
      </main>

      {/* Game Over Screen */}
      {gamePhase === 'gameover' && (
        <GameOverScreen
          runs={runs}
          wickets={wickets}
          ballsBowled={ballsBowled}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}
