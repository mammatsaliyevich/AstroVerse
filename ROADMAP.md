# 🗺️ AstroVerse Roadmap

AstroVerse's core value is **immersive universe exploration**. The roadmap is
ordered so the experience worth returning to is built before the loops that
drive retention.

Legend: ✅ done · 🚧 in progress · ⏳ planned

---

## Priority 1 — Core Exploration

- ✅ **Celestial Object System** — one generalized `CelestialObject` model
  (`src/types/celestial.ts`) rendered uniformly across the app.
- ✅ **Expanded Object Catalog (Cosmic Expansion Layer)** — the catalog now
  spans the full cosmic scale: superclusters, galaxy clusters, galaxies,
  nebulae, quasars, star systems, stars, neutron stars, pulsars, black holes,
  planets, dwarf planets, moons, comets, asteroids, spacecraft, and space
  stations (**17 kinds, 30+ real objects** incl. Andromeda, Triangulum, Orion/
  Eagle/Crab nebulae, Vela & PSR B1919+21 pulsars, TON 618, M87*). Data is split
  across `src/data/{cosmos,deepSky,solarBodies,planets}.ts` and aggregated in
  `src/data/catalog.ts`.
- ✅ **Scalable hierarchy** — `src/engine/hierarchy.ts` is an incremental
  registry with O(1) indexed parent→children lookups and a public
  `registerObjects()` for paging in millions of nodes at runtime.
- ✅ **Scale / category navigation** — browse by kind with search and filters
  (`src/screens/UniverseScreen.tsx`); category chips derive from the catalog.
- ⏳ **Universe Navigation Engine (3D)** — scale-based traversal
  (Universe → galaxy → system → object) using Three.js / `@react-three/fiber`,
  layered on top of the existing scale model.
  - ✅ **Foundation** — scale levels, hierarchy model, camera-state management,
    zoom transitions, object focus, breadcrumbs, and exploration history
    (`src/engine/*`, `src/store/navigationStore.ts`, `src/screens/ExploreScreen.tsx`).
  - ⏳ **Rendering** — swap the 2D viewport for a Three.js / Expo GL scene driven
    by `sampleTransition()`.

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
