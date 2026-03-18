import React, { useRef, useEffect, useCallback } from 'react';

// Draw the entire 2D cricket field using Canvas
export default function CricketField({ gamePhase, onBowlingDone }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({ phase: gamePhase, ballX: 420, ballY: 80, batAngle: 0, batSwing: false, frame: 0 });

  const CANVAS_W = 700;
  const CANVAS_H = 340;

  // Batsman position
  const BAT_X = 200;
  const BAT_Y = 220;

  const drawScene = useCallback((ctx, st) => {
    const W = CANVAS_W;
    const H = CANVAS_H;

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.45);
    sky.addColorStop(0, '#1a1a2e');
    sky.addColorStop(1, '#16213e');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.45);

    // Floodlights
    [[60, 10], [W - 60, 10], [W / 2, 5]].forEach(([lx, ly]) => {
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(lx, ly, 5, 0, Math.PI * 2);
      ctx.fill();
      // Light cone
      ctx.fillStyle = 'rgba(255,215,0,0.04)';
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(lx - 60, H * 0.45);
      ctx.lineTo(lx + 60, H * 0.45);
      ctx.closePath();
      ctx.fill();
    });

    // Crowd silhouette — colorful spectators
    const crowdColors = ['#e63946','#457b9d','#f4a261','#2a9d8f','#e9c46a','#8ecae6','#06d6a0','#9b5de5'];
    for (let i = 0; i < W; i += 14) {
      const colorIdx = (Math.floor(i / 14) + 3) % crowdColors.length;
      ctx.fillStyle = crowdColors[colorIdx];
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(i + 7, H * 0.435, 6, Math.PI, 0);
      ctx.fill();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(i + 1, H * 0.435, 12, 10);
      ctx.globalAlpha = 1;
    }

    // Outfield grass
    const grass = ctx.createLinearGradient(0, H * 0.43, 0, H);
    grass.addColorStop(0, '#1a5c2a');
    grass.addColorStop(1, '#0d3b16');
    ctx.fillStyle = grass;
    ctx.fillRect(0, H * 0.43, W, H * 0.57);

    // Grass stripes
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
      ctx.fillRect(i * (W / 8), H * 0.43, W / 8, H * 0.57);
    }

    // Pitch (sandy strip)
    const pitchGrad = ctx.createLinearGradient(0, H * 0.5, 0, H);
    pitchGrad.addColorStop(0, '#c8a96e');
    pitchGrad.addColorStop(1, '#a07840');
    ctx.fillStyle = pitchGrad;
    ctx.beginPath();
    ctx.moveTo(W * 0.22, H * 0.5);
    ctx.lineTo(W * 0.78, H * 0.5);
    ctx.lineTo(W * 0.65, H);
    ctx.lineTo(W * 0.08, H);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#8b6914';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Crease lines
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    [[W * 0.27, H * 0.53, W * 0.33, H * 0.53],
     [W * 0.65, H * 0.82, W * 0.54, H * 0.82],
    ].forEach(([x1, y1, x2, y2]) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    });

    // Stumps (batsman end)
    const stumpX = BAT_X + 10;
    const stumpY = BAT_Y + 30;
    [0, 8, 16].forEach(offset => {
      ctx.strokeStyle = '#f5c542';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(stumpX + offset, stumpY);
      ctx.lineTo(stumpX + offset, stumpY - 35);
      ctx.stroke();
    });
    // Bails
    ctx.strokeStyle = '#f5c542';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(stumpX, stumpY - 35);
    ctx.lineTo(stumpX + 16, stumpY - 35);
    ctx.stroke();

    // Stumps (bowler end)
    const bStumpX = 450;
    const bStumpY = 100;
    [0, 5, 10].forEach(offset => {
      ctx.strokeStyle = '#f5c542';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bStumpX + offset, bStumpY);
      ctx.lineTo(bStumpX + offset, bStumpY - 22);
      ctx.stroke();
    });

    // ---- Batsman (DOM-style drawn with canvas) ----
    drawBatsman(ctx, BAT_X, BAT_Y, st.batAngle, st.batSwing, st.frame);

    // ---- Ball ----
    if (st.phase === 'bowling' || st.phase === 'batting' || st.phase === 'result') {
      drawBall(ctx, st.ballX, st.ballY);
    }

  }, []);

  function drawBatsman(ctx, x, y, batAngle, swinging, frame) {
    ctx.save();
    ctx.translate(x, y);

    // Body (green uniform)
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(-12, -40, 24, 38);

    // Helmet
    ctx.fillStyle = '#1b4332';
    ctx.beginPath();
    ctx.arc(0, -48, 14, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#52b788';
    ctx.fillRect(-14, -50, 28, 6);

    // Face
    ctx.fillStyle = '#f4a261';
    ctx.beginPath();
    ctx.arc(0, -42, 8, 0, Math.PI * 2);
    ctx.fill();

    // Pads
    ctx.fillStyle = '#f1faee';
    ctx.fillRect(-15, -5, 10, 28);
    ctx.fillRect(5, -5, 10, 28);

    // Bat
    ctx.save();
    ctx.translate(14, -10);
    ctx.rotate(swinging ? batAngle : -0.3);
    ctx.fillStyle = '#c9a94f';
    ctx.fillRect(-3, -50, 8, 50);
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(-4, -50, 10, 15); // handle
    ctx.restore();

    ctx.restore();
  }

  function drawBall(ctx, bx, by) {
    ctx.save();
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(bx, by + 8, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ball
    const ballGrad = ctx.createRadialGradient(bx - 3, by - 3, 1, bx, by, 10);
    ballGrad.addColorStop(0, '#ff6b6b');
    ballGrad.addColorStop(0.6, '#c0392b');
    ballGrad.addColorStop(1, '#7f0000');
    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(bx, by, 10, 0, Math.PI * 2);
    ctx.fill();

    // Seam
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(bx, by, 7, -0.5, 0.5);
    ctx.stroke();
    ctx.restore();
  }

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    stateRef.current.phase = gamePhase;

    let startTime = null;
    let bowlingDoneFired = false; // guard: fire callback exactly once

    function loop(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const st = stateRef.current;
      st.frame++;

      if (gamePhase === 'bowling') {
        // Ball travels from bowler end toward batsman
        const progress = Math.min(elapsed / 900, 1);
        st.ballX = 450 - progress * (450 - (BAT_X + 40));
        st.ballY = 90 + progress * (BAT_Y - 40 - 90);
        st.batAngle = -0.3;
        st.batSwing = false;

        if (progress >= 1 && !bowlingDoneFired) {
          bowlingDoneFired = true;
          stateRef.current.ballX = BAT_X + 40;
          stateRef.current.ballY = BAT_Y - 40;
          drawScene(ctx, stateRef.current);
          onBowlingDone && onBowlingDone();
          return;
        }
      } else if (gamePhase === 'batting') {
        // Idle ball position (arrived)
        st.ballX = BAT_X + 40;
        st.ballY = BAT_Y - 40;
        st.batAngle = -0.3;
        st.batSwing = false;
      } else if (gamePhase === 'result') {
        // Bat swings
        const swingProg = Math.min(elapsed / 300, 1);
        st.batAngle = -0.3 + swingProg * 2.0;
        st.batSwing = true;
        // Ball flies away
        st.ballX = (BAT_X + 40) + elapsed * 0.35;
        st.ballY = (BAT_Y - 40) - elapsed * 0.1;
      } else {
        // idle / gameover
        st.ballX = 450;
        st.ballY = 90;
        st.batAngle = -0.3;
        st.batSwing = false;
      }

      drawScene(ctx, st);
      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [gamePhase, drawScene, onBowlingDone]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      className="cricket-canvas"
    />
  );
}