# AstroVerse — MVP Readiness Report

**Branch:** `init/astroverse-mvp` · **Audited at commit:** `4f89430`
**Mode:** MVP Audit & Stabilization (no new features)

---

## Verdict

✅ **READY for first real-world testing**, pending one external gate (below).

The codebase is internally consistent: dependencies, imports, routes, stores
and hooks all line up, and no runtime-crash risks were found. No critical fixes
were required, so no behavioral code was changed during this pass.

### Required external gate (cannot run in this sandbox)
This audit sandbox has no package-registry access, so `npm install` and
`tsc --noEmit` could not be executed here. Before device testing, run:

```bash
npm install
npm run type-check   # tsc --noEmit
npm start            # then press i / a, or scan with Expo Go
```

All checks below were performed by static analysis and full source review.

---

## Audit results

| # | Area | Result |
|---|------|--------|
| 1 | Codebase audit (34 files, ~3.7k LOC) | consistent |
| 2 | Missing dependencies | none |
| 3 | Broken imports | none |
| 4 | Navigation issues | none |
| 5 | Runtime risks | none critical (see notes) |
| 6 | Screen reachability | all 7 reachable |
| 7 | Route connectivity | declared = registered = navigated |
| 8 | Stores & hooks | verified |


---

## Dependencies (task 2)

All imported packages are declared in `package.json`, and peer requirements are
satisfied:

- `@react-navigation/native` + `@react-navigation/native-stack` — native stack
  only needs `react-native-screens` and `react-native-safe-area-context` (both
  present). No `react-native-gesture-handler`, `reanimated`, or `masked-view`
  are imported, so none are required.
- `zustand`, `@react-native-async-storage/async-storage`, `expo-linear-gradient`,
  `expo-status-bar` — all present and version-aligned to Expo SDK 52.

## Imports (task 3)

- Every relative import resolves to an existing file.
- Spot-checked named exports (`getObjectById`, `getSurface`, `hasSurfaceData`,
  `LANDMARK_ICON`, `getPlanetById`, `generateAnswer`, `levelForXp`,
  `getAncestors`, `registerObjects`, `SCALES`, `KIND_LABELS`, …) all exist.
- No unused imports (the lone `React` in `App.tsx` is required by the classic
  JSX runtime). No `console.*`, no `any`, no `TODO/FIXME`.

## Navigation & reachability (tasks 4, 6, 7)

7 routes — declared in `RootStackParamList`, registered in `AppNavigator`, and
reachable:

| Route | Reached from |
|-------|--------------|
| Home | initial route |
| Explore | Home |
| Universe | Home |
| Achievements | Home |
| AIGuide | Home, ObjectDetail |
| ObjectDetail | Explore, Universe |
| Surface | ObjectDetail |

Core loop verified: **Home → Explore (navigate cosmos) → ObjectDetail → Surface
(land) → Return to Navigator**. `Surface` and `ObjectDetail` slide up; `AIGuide`
is a modal. "Return to Navigator" uses `navigate('Explore')`, which returns to an
existing Explore instance rather than stacking a duplicate.

## Stores & hooks (task 8)

- `universeStore` (persisted: visited, favorites, unlockedAchievements,
  discoveredLandmarks, xp) — every action/selector used by screens exists;
  achievement unlocks resolve to a fixpoint without infinite loops.
- `navigationStore` (persists only `history`) — `focusNode` guards invalid ids;
  `back`/`forward`/`zoomOut` only travel to known node ids; root camera resolves
  at module load. `useExplorer` auto-ends transitions via a cleaned-up timer.
- Adding `discoveredLandmarks` is backward-compatible: zustand's shallow merge
  keeps the default `[]` for older persisted state, so no migration is needed.


## Runtime risks (task 5)

No crash-level risks found. Low-severity notes:

- **`expo-linear-gradient` colors typing** — both call sites pass valid color
  tuples (`HomeScreen` an inline 3-stop literal; `SurfaceScreen` a `[string,
  string]`). Confirm with `tsc` on the build machine.
- **Async rehydration window** — on cold start, persisted stores hydrate
  asynchronously; selectors return safe defaults (empty arrays) until then.

## Known limitations (non-blocking, by design for MVP)

- **AI Guide context** — `AIGuideScreen` resolves context via `getPlanetById`,
  so it gives planet-specific answers for planets and a generic (still correct)
  answer for non-planet objects. Upgrading to full `CelestialObject` context is
  Priority 3 on the roadmap.
- **`grand_tour` achievement** — currently checks `visited.length >= 8`, which
  counts any 8 objects, not specifically the 8 planets. Cosmetic; tracked in
  `ROADMAP.md` follow-ups.
- **Route param name** — `ObjectDetail`/`AIGuide` still use `planetId` as the
  param key for historical reasons; it carries any object id correctly.
- **3D rendering** — the navigation viewport and surface scene are 2D
  placeholders; the engine is structured for a future Three.js / Expo GL layer.

## Recommendation

Ship to first-round testers after running the external gate. Use
`TESTING_CHECKLIST.md` to drive manual QA.
