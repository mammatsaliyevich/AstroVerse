# 🌌 AstroVerse

An interactive universe exploration app built with **Expo**, **React Native**, and **TypeScript**. Browse the Solar System, dive into each planet's real scientific data, and ask an in-app guide questions at three levels of depth.

![platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![expo](https://img.shields.io/badge/Expo-SDK%2052-000020)
![typescript](https://img.shields.io/badge/TypeScript-strict-3178c6)
![license](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- **Universe browser** — explore a unified catalog of **stars, planets, moons, and black holes**, filterable by category and searchable by name.
- **Celestial Object System** — every object shares one generalized model, so detail pages render kind-specific stats and facts uniformly.
- **Object detail pages** — formatted scientific stats, descriptions, and fun facts for any object kind.
- **AI Guide** — an offline guide that answers in **Beginner**, **Student**, or **Expert** mode, tailored to the object you're viewing.
- **Progression** — XP, levels, and unlockable **achievements**, with **favorites** and visited-tracking **persisted** on-device (Zustand + AsyncStorage).
- **Premium dark UI** — deep-space gradients, glassmorphism cards, emissive star glow, and a NASA-inspired palette.

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

See [`ROADMAP.md`](ROADMAP.md) for the full prioritized plan. Headline order:

1. **Core exploration** — Celestial Object System ✅, expanded catalog ✅, scale/category navigation ✅
2. **Surface exploration** — landing experience, landmarks, atmospheric effects *(in progress)*
3. **AI Astronomy Guide** — upgrade the offline guide to a real LLM
4. **Engagement layer** — persistence ✅, achievements ✅, favorites ✅, search ✅, settings *(next)*
5. **Cloud** — backend API, auth, cross-device sync (deferred so the app runs offline out of the box)

Real-time 3D rendering (Three.js / `@react-three/fiber`) is a later layer on top of the scale model.

---

## 📄 License

Released under the [MIT License](#-license). Planetary data is based on public NASA fact sheets.
