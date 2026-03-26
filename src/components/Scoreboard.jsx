import React from 'react';
import { TOTAL_BALLS, TOTAL_WICKETS, formatOvers } from '../gameConfig';

export default function Scoreboard({ runs, wickets, ballsBowled, battingStyle }) {
  const ballsLeft = TOTAL_BALLS - ballsBowled;
  const strikeRate = ballsBowled > 0 ? ((runs / ballsBowled) * 100).toFixed(1) : '0.0';

  return (
    <div className="scoreboard">
      <div className="sb-main">
        <div className="sb-runs">
          <span className="sb-label">RUNS</span>
          <span className="sb-value runs-value">{runs}</span>
        </div>
        <div className="sb-divider">—</div>
        <div className="sb-wickets">
          <span className="sb-label">WKTS</span>
          <span className="sb-value wickets-value">{wickets}/{TOTAL_WICKETS}</span>
        </div>
      </div>

      <div className="sb-secondary">
        <div className="sb-stat">
          <span className="sb-stat-label">OVERS</span>
          <span className="sb-stat-val">{formatOvers(ballsBowled)}</span>
        </div>
        <div className="sb-stat">
          <span className="sb-stat-label">BALLS LEFT</span>
          <span className="sb-stat-val">{ballsLeft}</span>
        </div>
        <div className="sb-stat">
          <span className="sb-stat-label">STRIKE RATE</span>
          <span className="sb-stat-val">{strikeRate}</span>
        </div>
        <div className="sb-stat">
          <span className="sb-stat-label">STYLE</span>
          <span className={`sb-stat-val style-badge ${battingStyle}`}>
            {battingStyle === 'aggressive' ? '⚡ AGG' : '🛡 DEF'}
          </span>
        </div>
      </div>

      {/* Ball tracker */}
      <div className="ball-tracker">
        {Array.from({ length: TOTAL_BALLS }).map((_, i) => (
          <div
            key={i}
            className={`ball-dot ${i < ballsBowled ? 'bowled' : ''} ${i === ballsBowled - 1 ? 'last' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
