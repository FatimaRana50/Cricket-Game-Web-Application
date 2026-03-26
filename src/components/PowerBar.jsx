import React, { useEffect, useRef, useCallback } from 'react';
import { buildSegments } from '../gameConfig';

export default function PowerBar({ battingStyle, isRunning, onShot, onSliderUpdate, gamePhase }) {
  const sliderRef = useRef(0);
  const dirRef = useRef(1);
  const rafRef = useRef(null);
  const lockedRef = useRef(false);
  const speedRef = useRef(0.008);

  const animate = useCallback(() => {
    if (lockedRef.current) return;

    sliderRef.current += dirRef.current * speedRef.current;

    if (sliderRef.current >= 1) {
      sliderRef.current = 1;
      dirRef.current = -1;
    } else if (sliderRef.current <= 0) {
      sliderRef.current = 0;
      dirRef.current = 1;
    }

    onSliderUpdate(sliderRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [onSliderUpdate]);

  useEffect(() => {
    if (isRunning && gamePhase === 'batting') {
      lockedRef.current = false;
      sliderRef.current = 0;
      dirRef.current = 1;
      // Vary speed slightly per ball for challenge
      speedRef.current = 0.007 + Math.random() * 0.006;
      rafRef.current = requestAnimationFrame(animate);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isRunning, gamePhase, animate]);

  const handleClick = useCallback(() => {
    if (!isRunning || lockedRef.current) return;
    lockedRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    onShot(sliderRef.current);
  }, [isRunning, onShot]);

  const segments = buildSegments(battingStyle);

  return (
    <div className="powerbar-section">
      <div className="powerbar-label">
        <span>⚡ POWER BAR — Click to Play Shot!</span>
        <span className="pb-style-tag">{battingStyle.toUpperCase()}</span>
      </div>

      {/* Segments legend */}
      <div className="pb-legend">
        {segments.map((seg) => (
          <div key={seg.outcome} className="pb-legend-item">
            <span className="pb-legend-dot" style={{ background: seg.color }} />
            <span className="pb-legend-text">{seg.label} ({(seg.prob * 100).toFixed(0)}%)</span>
          </div>
        ))}
      </div>

      {/* The actual power bar */}
      <PowerBarVisual
        segments={segments}
        isRunning={isRunning}
        onShot={handleClick}
        sliderRef={sliderRef}
        gamePhase={gamePhase}
      />

      {/* Blinking hint shown only while slider is running */}
      {isRunning && (
        <div className="pb-click-hint">▼ CLICK THE BAR TO PLAY YOUR SHOT ▼</div>
      )}

      {/* Probability scale */}
      <div className="pb-scale">
        <span>0</span>
        {segments.map((seg) => (
          <span key={seg.end} style={{ left: `${seg.end * 100}%`, position: 'relative' }}>
            {seg.end.toFixed(2)}
          </span>
        ))}
      </div>
    </div>
  );
}

// Inner visual component with its own animation loop for rendering
function PowerBarVisual({ segments, isRunning, onShot, sliderRef, gamePhase }) {
  const canvasRef = useRef(null);
  const innerRaf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Draw segments
      segments.forEach((seg) => {
        const x = seg.start * W;
        const w = (seg.end - seg.start) * W;

        // Segment fill
        ctx.fillStyle = seg.color;
        ctx.fillRect(x, 10, w, H - 20);

        // Segment border
        ctx.strokeStyle = 'rgba(0,0,0,0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, 10, w, H - 20);

        // Label
        if (w > 24) {
          ctx.fillStyle = '#fff';
          ctx.font = `bold ${Math.min(18, w * 0.3)}px Orbitron, monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(seg.label, x + w / 2, H / 2);
        }
      });

      // Draw slider
      const sx = sliderRef.current * W;

      // Slider shadow
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(sx - 3, 4, 8, H - 8);

      // Slider body
      const grad = ctx.createLinearGradient(sx - 2, 0, sx + 4, 0);
      grad.addColorStop(0, '#fff');
      grad.addColorStop(0.5, '#ffffcc');
      grad.addColorStop(1, '#fff');
      ctx.fillStyle = grad;
      ctx.fillRect(sx - 2, 4, 6, H - 8);

      // Triangle indicator on top
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(sx - 7, 0);
      ctx.lineTo(sx + 7, 0);
      ctx.lineTo(sx, 12);
      ctx.closePath();
      ctx.fill();

      if (gamePhase === 'batting' && isRunning) {
        innerRaf.current = requestAnimationFrame(draw);
      }
    }

    draw();
    if (gamePhase === 'batting' && isRunning) {
      innerRaf.current = requestAnimationFrame(draw);
    }

    return () => { if (innerRaf.current) cancelAnimationFrame(innerRaf.current); };
  }, [segments, isRunning, sliderRef, gamePhase]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={70}
      className={`powerbar-canvas ${isRunning ? 'active' : ''}`}
      onClick={onShot}
    />
  );
}