import React from 'react';
import { TOTAL_BALLS, formatOvers } from '../gameConfig';

export default function GameOverScreen({ runs, wickets, ballsBowled, onRestart }) {
  const strikeRate = ballsBowled > 0 ? ((runs / ballsBowled) * 100).toFixed(1) : '0.0';
  const allOut = wickets >= 2;

  let rating = '';
  if (runs >= 80) rating = '🏆 LEGENDARY INNINGS!';
  else if (runs >= 60) rating = '⭐ OUTSTANDING!';
  else if (runs >= 40) rating = '👏 GREAT KNOCK!';
  else if (runs >= 20) rating = '✅ DECENT EFFORT';
  else rating = '📉 TOUGH DAY OUT...';

  return (
    <div className="gameover-screen">
      <div className="gameover-card">
        <div className="gameover-title">
          {allOut ? '🏏 ALL OUT!' : '⏰ INNINGS COMPLETE!'}
        </div>

        <div className="gameover-score">
          <span className="go-runs">{runs}</span>
          <span className="go-slash"> / </span>
          <span className="go-wickets">{wickets}</span>
        </div>

        <div className="gameover-detail">
          <span>({formatOvers(ballsBowled)} overs)</span>
        </div>

        <div className="gameover-rating">{rating}</div>

        <div className="gameover-stats">
          <div className="go-stat">
            <span className="go-stat-label">TOTAL RUNS</span>
            <span className="go-stat-val">{runs}</span>
          </div>
          <div className="go-stat">
            <span className="go-stat-label">WICKETS LOST</span>
            <span className="go-stat-val">{wickets}</span>
          </div>
          <div className="go-stat">
            <span className="go-stat-label">BALLS FACED</span>
            <span className="go-stat-val">{ballsBowled}</span>
          </div>
          <div className="go-stat">
            <span className="go-stat-label">STRIKE RATE</span>
            <span className="go-stat-val">{strikeRate}</span>
          </div>
        </div>

        <button className="restart-btn" onClick={onRestart}>
          🔄 PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
