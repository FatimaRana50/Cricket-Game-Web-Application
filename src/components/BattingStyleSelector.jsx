import React from 'react';
import { PROBABILITIES } from '../gameConfig';

export default function BattingStyleSelector({ selected, onChange, disabled }) {
  return (
    <div className="style-selector">
      <div className="style-label">SELECT BATTING STYLE</div>
      <div className="style-buttons">
        {['aggressive', 'defensive'].map((style) => {
          const probs = PROBABILITIES[style];
          const wicketProb = probs.find(p => p.outcome === 'Wicket').prob;
          const boundaryProb = probs.filter(p => p.runs === 4 || p.runs === 6)
            .reduce((sum, p) => sum + p.prob, 0);

          return (
            <button
              key={style}
              className={`style-btn ${style} ${selected === style ? 'active' : ''}`}
              onClick={() => !disabled && onChange(style)}
              disabled={disabled}
            >
              <span className="style-icon">{style === 'aggressive' ? '⚡' : '🛡'}</span>
              <span className="style-name">{style === 'aggressive' ? 'AGGRESSIVE' : 'DEFENSIVE'}</span>
              <div className="style-stats">
                <div className="style-stat">
                  <span className="sstat-label">Wicket Risk</span>
                  <div className="sstat-bar">
                    <div
                      className="sstat-fill risk"
                      style={{ width: `${wicketProb * 100}%` }}
                    />
                  </div>
                  <span className="sstat-val">{(wicketProb * 100).toFixed(0)}%</span>
                </div>
                <div className="style-stat">
                  <span className="sstat-label">Boundary Chance</span>
                  <div className="sstat-bar">
                    <div
                      className="sstat-fill reward"
                      style={{ width: `${boundaryProb * 100}%` }}
                    />
                  </div>
                  <span className="sstat-val">{(boundaryProb * 100).toFixed(0)}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
