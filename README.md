# 🌌 AstroVerse

An interactive universe exploration app built with **Expo**, **React Native**, and **TypeScript**. Browse the Solar System, dive into each planet's real scientific data, and ask an in-app guide questions at three levels of depth.

![platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![expo](https://img.shields.io/badge/Expo-SDK%2052-000020)
![typescript](https://img.shields.io/badge/TypeScript-strict-3178c6)
![license](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- **Solar System browser** — all eight planets in a responsive grid.
- **Planet detail pages** — radius, gravity, day/year length, temperature, moons, and fun facts pulled from NASA-based data.
- **AI Guide** — an offline guide that answers questions in **Beginner**, **Student**, or **Expert** mode, tailored to the planet you're viewing.
- **Progress tracking** — visited planets and experience points (XP) persisted in app state via Zustand.
- **Premium dark UI** — deep-space gradients, glassmorphism cards, and a NASA-inspired palette.

---

## 🧱 Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Expo SDK 52 / React Native 0.76 |
| Language | TypeScript (strict) |
| Navigation | React Navigation (native stack) |
| State | Zustand |
| UI | Custom theme + `expo-linear-gradient` |

---

## 📂 Project Structure

```
AstroVerse/
├── App.tsx                  # Entry point: providers + navigation
├── app.json                 # Expo configuration
├── src/
│   ├── components/ui/        # Reusable UI (Button, Card)
│   ├── data/                 # planets.ts (scientific data)
│   ├── navigation/           # AppNavigator (native stack)
│   ├── screens/              # Home, Universe, ObjectDetail, AIGuide
│   ├── services/             # aiGuide.ts (local answer engine)
│   ├── store/                # universeStore.ts (Zustand)
│   ├── theme/                # colors, typography, ThemeProvider
│   └── types/                # celestial.ts, navigation.ts
└── docs/SETUP.md             # Detailed setup guide
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) create your env file
cp .env.example .env

# 3. Start the dev server
npm start
```

Then press `i` (iOS), `a` (Android), or `w` (web) — or scan the QR code with the **Expo Go** app.

> **Requirements:** Node.js 18+ and npm 9+. See [`docs/SETUP.md`](docs/SETUP.md) for full details.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo dev server |
| `npm run android` | Open on Android device/emulator |
| `npm run ios` | Open on iOS simulator (macOS) |
| `npm run web` | Run in the browser |
| `npm run type-check` | Run TypeScript with no emit |

---

## 🗺️ Roadmap

These are intentionally **not** bundled yet so the project installs and runs cleanly out of the box:

- [ ] 3D universe rendering (Three.js / `@react-three/fiber`)
- [ ] Firebase authentication + cloud sync
- [ ] Real LLM-powered AI guide (OpenAI/Anthropic)
- [ ] Backend API + PostgreSQL persistence
- [ ] Surface exploration, quizzes, and achievements

---

## 📄 License

Released under the [MIT License](#-license). Planetary data is based on public NASA fact sheets.
