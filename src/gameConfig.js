// Game Constants
export const TOTAL_BALLS = 12;
export const TOTAL_WICKETS = 2;
export const BALLS_PER_OVER = 6;

// Probability distributions for each batting style
export const PROBABILITIES = {
  aggressive: [
    { outcome: 'Wicket', runs: null, prob: 0.30, color: '#e63946', label: 'W' },
    { outcome: '0 Runs', runs: 0,    prob: 0.08, color: '#457b9d', label: '0' },
    { outcome: '1 Run',  runs: 1,    prob: 0.10, color: '#2a9d8f', label: '1' },
    { outcome: '2 Runs', runs: 2,    prob: 0.12, color: '#8ecae6', label: '2' },
    { outcome: '3 Runs', runs: 3,    prob: 0.05, color: '#f4a261', label: '3' },
    { outcome: '4 Runs', runs: 4,    prob: 0.15, color: '#e9c46a', label: '4' },
    { outcome: '6 Runs', runs: 6,    prob: 0.20, color: '#06d6a0', label: '6' },
  ],
  defensive: [
    { outcome: 'Wicket', runs: null, prob: 0.12, color: '#e63946', label: 'W' },
    { outcome: '0 Runs', runs: 0,    prob: 0.25, color: '#457b9d', label: '0' },
    { outcome: '1 Run',  runs: 1,    prob: 0.30, color: '#2a9d8f', label: '1' },
    { outcome: '2 Runs', runs: 2,    prob: 0.18, color: '#8ecae6', label: '2' },
    { outcome: '3 Runs', runs: 3,    prob: 0.08, color: '#f4a261', label: '3' },
    { outcome: '4 Runs', runs: 4,    prob: 0.05, color: '#e9c46a', label: '4' },
    { outcome: '6 Runs', runs: 6,    prob: 0.02, color: '#06d6a0', label: '6' },
  ],
};

// Commentary lines per outcome
export const COMMENTARY = {
  Wicket: [
    "Bowled 'em! The stumps are shattered! 🏏",
    "OUT! The fielder takes a blinder! What a catch!",
    "That's plumb LBW! Walk back to the pavilion!",
    "Caught behind! The keeper doesn't miss a thing!",
    "Clean bowled! The bails go flying!",
  ],
  '0 Runs': [
    "Dot ball! Pressure builds on the batsman.",
    "Beaten! The ball just misses the outside edge.",
    "Defended solidly back down the pitch.",
    "No run. The fielder swoops in quickly.",
  ],
  '1 Run': [
    "Nudged away for a single, good running!",
    "One run, keeps the scoreboard ticking.",
    "Pushed into the gap, they scamper through for one.",
  ],
  '2 Runs': [
    "Driven beautifully! They'll run two on this!",
    "Into the outfield, good running — two runs!",
    "Nicely timed for a couple!",
  ],
  '3 Runs': [
    "Three runs! Excellent placement!",
    "Brilliant running between the wickets — three!",
    "Pushed into the deep, three all the way!",
  ],
  '4 Runs': [
    "FOUR! Cracked through the covers!",
    "BOUNDARY! Racing to the rope!",
    "Four runs! What a crisp drive!",
    "Slapped through mid-wicket for FOUR!",
  ],
  '6 Runs': [
    "SIX! Launched into the stands! MASSIVE!",
    "MAXIMUM! That's gone miles over mid-on!",
    "SIX! The crowd goes absolutely wild!",
    "Hit out of the ground! Six of the best!",
  ],
};

// Build cumulative probability segments from raw probabilities
export function buildSegments(style) {
  const probs = PROBABILITIES[style];
  let cumulative = 0;
  return probs.map((item) => {
    const start = cumulative;
    cumulative += item.prob;
    return { ...item, start, end: parseFloat(cumulative.toFixed(10)) };
  });
}

// Determine outcome from slider position (0..1)
export function getOutcome(sliderPos, style) {
  const segments = buildSegments(style);
  for (const seg of segments) {
    if (sliderPos >= seg.start && sliderPos < seg.end) return seg;
  }
  // Edge case: exactly 1.0
  return segments[segments.length - 1];
}

export function getRandomCommentary(outcome) {
  const lines = COMMENTARY[outcome] || ["Well played!"];
  return lines[Math.floor(Math.random() * lines.length)];
}

export function formatOvers(ballsBowled) {
  const overs = Math.floor(ballsBowled / BALLS_PER_OVER);
  const balls = ballsBowled % BALLS_PER_OVER;
  return `${overs}.${balls}`;
}
