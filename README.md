# 🏏 Cricket Blitz — 2D Cricket Web Application

**CS-4032: Web Programming — Assignment #02**

A probability-based 2D cricket batting game built with **React**, **Canvas**, HTML, CSS, and JavaScript.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cricket-game

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to play the game.

### Build for Production

```bash
npm run build
```

---

## 🎮 How to Play

1. **Select Batting Style** — Choose between Aggressive (⚡ high risk, high reward) or Defensive (🛡 lower risk, safer scoring).
2. **Click BOWL!** — Watch the ball travel toward the batsman.
3. **Click the Power Bar** — Stop the moving slider to play your shot. The segment the slider is in determines your outcome.
4. **Score as many runs as possible** in 2 overs (12 balls) with only 2 wickets.

---

## 📐 Game Logic

### Probability Distributions

| Outcome | Aggressive | Defensive |
|---------|-----------|-----------|
| Wicket  | 30%       | 12%       |
| 0 Runs  | 8%        | 25%       |
| 1 Run   | 10%       | 30%       |
| 2 Runs  | 12%       | 18%       |
| 3 Runs  | 5%        | 8%        |
| 4 Runs  | 15%       | 5%        |
| 6 Runs  | 20%       | 2%        |
| **Total** | **100%** | **100%** |

### Power Bar Mechanics
- Each segment occupies the exact proportion of the bar equal to its probability.
- A slider bounces back and forth across the bar at varying speeds.
- When the user clicks, the slider's position determines the outcome — **no random selection**.
- Example: If slider is at 0.15, it lies in the Wicket region (0–0.30) → OUT!

### Animations
- **Bowling animation**: Ball travels from the bowler's end to the batsman using `requestAnimationFrame`.
- **Batting animation**: Bat swings and ball flies away when the shot is played.
- **Power bar slider**: Smooth continuous animation using `requestAnimationFrame` on a `<canvas>`.

---

## 🗂 Project Structure

```
src/
├── App.js                  # Main application, game flow controller
├── App.css                 # All styles (dark stadium theme)
├── gameConfig.js           # Probabilities, constants, commentary
├── index.js                # React entry point
├── hooks/
│   └── useGameState.js     # Custom React hook for all game state
└── components/
    ├── CricketField.js     # Canvas-based 2D field & animations
    ├── Scoreboard.js       # Live scoreboard display
    ├── PowerBar.js         # Probability bar with moving slider
    ├── BattingStyleSelector.js  # Style selection UI
    ├── ResultDisplay.js    # Shot outcome + commentary
    └── GameOverScreen.js   # End-of-innings summary
```

---

## ✨ Features

- ✅ 2D cricket ground drawn entirely on Canvas
- ✅ Batsman, bat, and ball sprites drawn with Canvas API
- ✅ Bowling animation (ball travels toward batsman)
- ✅ Batting animation (bat swing on shot)
- ✅ Probability-based power bar (no random outcomes)
- ✅ Animated slider with varying speeds per ball
- ✅ Aggressive and Defensive batting styles
- ✅ Live scoreboard (Runs, Wickets, Overs, Strike Rate)
- ✅ Ball tracker showing each ball in the innings
- ✅ Dynamic commentary system (5 lines per outcome type)
- ✅ Game over screen with full innings summary and rating
- ✅ Restart game option
- ✅ Mobile responsive layout

---

## 🛠 Technologies

- React 18 (hooks: useState, useEffect, useCallback, useRef)
- HTML5 Canvas API
- CSS3 (animations, gradients, CSS variables)
- Google Fonts: Orbitron, Rajdhani, Teko

---

## 👨‍💻 Author

**Name:** [Your Name]  
**Roll No:** [Your Roll Number]  
**Section:** [Your Section]
