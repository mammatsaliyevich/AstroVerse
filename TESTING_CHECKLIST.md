# AstroVerse — Manual Testing Checklist

First-round QA for the AstroVerse MVP. Check each box on a real device (Expo
Go) and/or simulator. File issues with the screen name + steps to reproduce.

## 0. Setup

- [ ] `npm install` completes with no errors
- [ ] `npm run type-check` passes (no TypeScript errors)
- [ ] `npm start` launches Metro; app opens in Expo Go / simulator
- [ ] App boots to the **Home** screen with no red error screen

## 1. Home screen

- [ ] Title "AstroVerse" and tagline render
- [ ] Stats show Planets Visited (n/8), Level, and Experience (XP)
- [ ] "Begin Journey" opens the Navigator (Explore)
- [ ] "Browse Catalog" opens the Universe catalog
- [ ] "Achievements" opens the Achievements screen
- [ ] "Ask the AI Guide" opens the AI Guide

## 2. Universe Navigation Engine (Explore)

- [ ] Opens focused on "Observable Universe" with a scale label
- [ ] Breadcrumb shows the current path; tapping an ancestor jumps to it
- [ ] Tapping a child body travels inward (shows "Traveling…" briefly)
- [ ] "Zoom Out" returns to the parent
- [ ] "Back" / "Forward" enable/disable correctly and move through history
- [ ] "Reset" returns to the Universe root
- [ ] Drilling Universe → Laniakea → Local Group → Milky Way → Solar System →
      Sun → Earth → Moon works end to end
- [ ] At a leaf body, "Open … details" opens the detail screen


## 3. Catalog browser (Universe)

- [ ] Grid shows objects with name + tagline
- [ ] Category chips (All, Stars, Planets, Moons, …) filter the grid
- [ ] Search box filters by name (try "mars", "andromeda")
- [ ] ★ filter shows only favorites (empty-state message when none)
- [ ] Star badge appears on favorited objects; "✓ Visited" on visited ones
- [ ] Tapping a card opens its detail screen

## 4. Object detail

- [ ] Header shows kind label, name, description
- [ ] Stat cards render kind-appropriate values
- [ ] "Did you know?" facts list renders
- [ ] Opening a body increments Visited / XP (check Home or Achievements)
- [ ] Favorite toggle flips ☆ ↔ ★ and persists
- [ ] "Ask AI about …" opens the AI Guide with that context
- [ ] "🛬 Land on …" appears ONLY for Mars, Earth, and the Moon

## 5. Surface Exploration

- [ ] Landing scene shows a per-world sky gradient + terrain band
- [ ] Header/landing text is legible on Mars, Earth, and the (black-sky) Moon
- [ ] Environment cards show atmosphere, gravity, temperature, day length
- [ ] Tapping a landmark expands its facts and marks it ✓ discovered
- [ ] Progress bar updates as landmarks are discovered (n/total)
- [ ] Mars: Olympus Mons, Valles Marineris, Polar Ice Caps present
- [ ] Moon: Tycho, Mare Tranquillitatis, Shackleton present
- [ ] Earth: Everest, Mariana Trench, Amazon present
- [ ] "Leave" returns to detail; "Return to Navigator" returns to Explore

## 6. AI Guide

- [ ] Beginner / Student / Expert modes are selectable
- [ ] Sending a question appends a user bubble + an AI answer
- [ ] Answer depth changes with the selected mode
- [ ] Opened from a planet, intro greets that planet by name
- [ ] Close (✕) returns to the previous screen


## 7. Achievements & progression

- [ ] Level card shows level, total XP, and progress to next level
- [ ] Unlocked badges appear in full color; locked ones are dimmed with 🔒
- [ ] Visiting objects / discovering landmarks raises XP and can unlock badges
- [ ] Badge count "n of N unlocked" is accurate

## 8. Persistence

- [ ] Visit objects, favorite some, discover landmarks
- [ ] Fully close and reopen the app
- [ ] Visited, favorites, discovered landmarks, XP, and level are retained
- [ ] Exploration starts again at the Universe root (expected)

## 9. Navigation hygiene & edge cases

- [ ] Hardware/gesture Back never lands on a blank screen
- [ ] Rapidly tapping travel controls does not freeze the UI
- [ ] Deeply nested navigation (Explore → detail → surface → return) is stable
- [ ] Search with no matches shows the empty-state message
- [ ] Re-opening an already-visited/favorited/discovered item is idempotent

## 10. Devices & performance

- [ ] iOS (simulator or device) renders correctly
- [ ] Android (emulator or device) renders correctly
- [ ] Safe-area insets respected on notched devices
- [ ] Scrolling is smooth on long lists (catalog, surface landmarks)
- [ ] Light text remains legible across all sky/background colors

---

### Sign-off

- [ ] All critical paths pass → MVP approved for wider testing
- Tester: ______________  Device/OS: ______________  Date: __________
