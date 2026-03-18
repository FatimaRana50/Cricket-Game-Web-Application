import { useState, useCallback } from 'react';
import { TOTAL_BALLS, TOTAL_WICKETS, getOutcome, getRandomCommentary } from '../gameConfig';

const INITIAL_STATE = {
  runs: 0,
  wickets: 0,
  ballsBowled: 0,
  battingStyle: 'aggressive',
  gamePhase: 'idle',       // idle | bowling | batting | result | gameover
  lastResult: null,        // { outcome, runs, commentary }
  sliderPos: 0,
  isSliderRunning: false,
};

export default function useGameState() {
  const [state, setState] = useState(INITIAL_STATE);

  const setBattingStyle = useCallback((style) => {
    setState(s => ({ ...s, battingStyle: style }));
  }, []);

  const startBowling = useCallback(() => {
    setState(s => ({
      ...s,
      gamePhase: 'bowling',
      lastResult: null,
      isSliderRunning: false,
    }));
  }, []);

  const startBatting = useCallback(() => {
    setState(s => ({
      ...s,
      gamePhase: 'batting',
      isSliderRunning: true,
      sliderPos: 0,
    }));
  }, []);

  const updateSlider = useCallback((pos) => {
    setState(s => ({ ...s, sliderPos: pos }));
  }, []);

  const playShot = useCallback((sliderPos) => {
    setState(s => {
      if (s.gamePhase !== 'batting') return s;

      const seg = getOutcome(sliderPos, s.battingStyle);
      const isWicket = seg.outcome === 'Wicket';
      const runsScored = isWicket ? 0 : seg.runs;
      const newWickets = isWicket ? s.wickets + 1 : s.wickets;
      const newRuns = s.runs + runsScored;
      const newBalls = s.ballsBowled + 1;

      const isGameOver = newWickets >= TOTAL_WICKETS || newBalls >= TOTAL_BALLS;

      return {
        ...s,
        runs: newRuns,
        wickets: newWickets,
        ballsBowled: newBalls,
        sliderPos,
        isSliderRunning: false,
        gamePhase: isGameOver ? 'gameover' : 'result',
        lastResult: {
          outcome: seg.outcome,
          runs: runsScored,
          commentary: getRandomCommentary(seg.outcome),
          color: seg.color,
          isWicket,
          isBoundary: seg.runs === 4 || seg.runs === 6,
        },
      };
    });
  }, []);

  const nextBall = useCallback(() => {
    setState(s => ({ ...s, gamePhase: 'idle', lastResult: null }));
  }, []);

  const restartGame = useCallback(() => {
    setState({ ...INITIAL_STATE });
  }, []);

  return {
    state,
    setBattingStyle,
    startBowling,
    startBatting,
    updateSlider,
    playShot,
    nextBall,
    restartGame,
  };
}
