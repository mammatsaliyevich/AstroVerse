# 🗺️ AstroVerse Roadmap

AstroVerse's core value is **immersive universe exploration**. The roadmap is
ordered so the experience worth returning to is built before the loops that
drive retention.

Legend: ✅ done · 🚧 in progress · ⏳ planned

---

## Priority 1 — Core Exploration

- ✅ **Celestial Object System** — one generalized `CelestialObject` model
  (`src/types/celestial.ts`) rendered uniformly across the app.
- ✅ **Expanded Object Catalog** — stars, planets, moons, and a supermassive
  black hole, aggregated in `src/data/catalog.ts`.
- ✅ **Scale / category navigation** — browse by kind with search and filters
  (`src/screens/UniverseScreen.tsx`).
- ⏳ **Universe Navigation Engine (3D)** — scale-based traversal
  (Universe → galaxy → system → object) using Three.js / `@react-three/fiber`,
  layered on top of the existing scale model.

## Priority 2 — Surface Exploration

- ⏳ Planet/moon landing experience for bodies flagged `hasSurface`.
- ⏳ Surface landmarks (e.g. Olympus Mons, Valles Marineris).
- ⏳ Atmospheric and lighting effects per body.

## Priority 3 — AI Astronomy Guide

- ✅ Offline layered guide (Beginner / Student / Expert) — `src/services/aiGuide.ts`.
- ⏳ Real LLM integration (OpenAI / Anthropic) behind the same interface.
- ⏳ Context-aware answers for every object kind, not just planets.

## Priority 4 — Engagement Layer

- ✅ On-device **persistence** (Zustand + AsyncStorage).
- ✅ **Leveling + achievements** (`src/services/progression.ts`, `src/data/achievements.ts`).
- ✅ **Favorites** and **search**.
- ⏳ **Settings** (reset progress, default difficulty, about).

## Priority 5 — Cloud (deferred)

- ⏳ Backend API + PostgreSQL.
- ⏳ Authentication and cross-device sync.
- ⏳ Subscriptions.

> Cloud features are deliberately deferred so the app installs and runs fully
> offline out of the box.

---

## Known follow-ups

- `grand_tour` achievement counts any 8 visited objects; refine to require all
  eight planets specifically.
- `ObjectDetail` route param is still named `planetId`; rename to `objectId`
  once the surface-exploration screen lands.
