# 🏏 Cricket Blitz — 2D Cricket Web Application

**CS-4032: Web Programming — Assignment #02**

A probability-based 2D cricket batting game built with **React**, **Canvas**, HTML, CSS, and JavaScript.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended — tested on v24)
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
The browser will open automatically.

### Build for Production

```bash
npm run build
```

---

## ⚙️ Tech Stack & Tooling

This project uses **Vite** as the development server and bundler (instead of Create React App / react-scripts), which provides significantly faster startup times and full compatibility with Node.js v18+.

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.2.0 | UI framework |
| Vite | 8.x | Dev server & bundler |
| @vitejs/plugin-react | latest | JSX + Fast Refresh |
| HTML5 Canvas API | — | 2D rendering & animations |
| CSS3 | — | Styling & keyframe animations |

---

## 🎮 How to Play

1. **Select Batting Style** — Choose between Aggressive (⚡ high risk, high reward) or Defensive (🛡 lower risk, safer scoring).
2. **Click BOWL!** — Watch the ball travel toward the batsman.
3. **Click the Power Bar** — Stop the moving slider to play your shot. The segment the slider lands in determines your outcome.
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
- A slider bounces back and forth across the bar at varying speeds per ball.
- When the user clicks, the slider's position determines the outcome — **no random selection**.
- Example: If slider is at 0.15, it lies in the Wicket region (0.00–0.30) → OUT!

### Animations
- **Bowling animation**: Ball travels from the bowler's end to the batsman using `requestAnimationFrame` on Canvas.
- **Batting animation**: Bat swings and ball flies away when the shot is played.
- **Power bar slider**: Smooth continuous animation using a dual `requestAnimationFrame` loop on a `<canvas>`.

---

## 🗂 Project Structure

```
cricket-game/
├── index.html                   # Root HTML entry point (Vite requires this at project root)
├── vite.config.js               # Vite configuration
├── package.json
├── public/
│   └── manifest.json
└── src/
    ├── index.jsx                # React entry point
    ├── App.jsx                  # Main application, game flow controller
    ├── App.css                  # All styles (dark stadium theme)
    ├── gameConfig.js            # Probabilities, constants, commentary helpers
    ├── hooks/
    │   └── useGameState.js      # Custom React hook — all game state & logic
    └── components/
        ├── CricketField.jsx     # Canvas-based 2D field & animations
        ├── Scoreboard.jsx       # Live scoreboard display
        ├── PowerBar.jsx         # Probability bar with moving slider
        ├── BattingStyleSelector.jsx  # Style selection UI
        ├── ResultDisplay.jsx    # Shot outcome + commentary
        └── GameOverScreen.jsx   # End-of-innings summary
```

---

## ✨ Features

- ✅ 2D cricket ground drawn entirely on HTML5 Canvas
- ✅ Batsman, bat, and ball sprites drawn with Canvas API
- ✅ Bowling animation (ball travels toward batsman over 900ms)
- ✅ Batting animation (bat swing + ball flies on shot)
- ✅ Probability-based power bar (no random outcomes — position-only)
- ✅ Animated slider with varying speed per ball for challenge
- ✅ Aggressive and Defensive batting styles with different probability distributions
- ✅ Live scoreboard (Runs, Wickets, Overs, Strike Rate)
- ✅ Ball tracker showing each ball in the innings
- ✅ Dynamic commentary system (4–5 unique lines per outcome type)
- ✅ Game over screen with full innings summary and rating
- ✅ Restart game option (resets all state)
- ✅ Mobile responsive layout

---

## 🛠 Technologies

- React 18 (hooks: `useState`, `useEffect`, `useCallback`, `useRef`)
- Vite 8 (dev server & build tool)
- HTML5 Canvas API (2D rendering, sprites, animations)
- CSS3 (keyframe animations, CSS variables, gradients, flexbox/grid)
- Google Fonts: Orbitron, Rajdhani, Teko

---

## 👨‍💻 Author

**Name:** Fatima Farrukh Rana 
**Roll No:** 23i-0773  
**Section:** C