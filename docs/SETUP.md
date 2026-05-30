# 🛠️ AstroVerse — Developer Setup Guide

This guide gets a fresh machine from zero to a running AstroVerse app.

---

## 1. Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | **18 LTS or newer** (20 recommended) | `node --version` |
| npm | 9+ | ships with Node |
| Git | any recent | to clone the repo |
| Expo Go | latest | iOS App Store / Google Play, for device testing |
| Watchman | optional (macOS) | `brew install watchman` |

> Expo SDK 52 / React Native 0.76 require Node 18+. Older Node versions will fail.

---

## 2. Clone & Install

```bash
git clone https://github.com/mammatsaliyevich/AstroVerse.git
cd AstroVerse
npm install
```

---

## 3. Environment Variables

The app runs fully in local mode without any keys. To customize, create `.env`:

```bash
cp .env.example .env
```

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `EXPO_PUBLIC_API_URL` | No | Future backend base URL |
| `EXPO_PUBLIC_APP_ENV` | No | `development` / `staging` / `production` |
| `EXPO_PUBLIC_OPENAI_API_KEY` | No (roadmap) | Real LLM-powered AI guide |
| `EXPO_PUBLIC_FIREBASE_*` | No (roadmap) | Auth + cloud sync |

> All client-readable variables **must** start with `EXPO_PUBLIC_`. Restart the dev server after editing `.env`.

---

## 4. Run Locally

```bash
npm start          # start Metro / Expo dev server
# then press:
#   i  -> iOS simulator (macOS + Xcode)
#   a  -> Android emulator/device
#   w  -> web browser
```

Or scan the QR code with **Expo Go** on a physical device (same Wi-Fi network).

Type safety check:

```bash
npm run type-check
```

---

## 5. Building Releases (EAS)

Production builds use [EAS Build](https://docs.expo.dev/build/introduction/).

```bash
npm install -g eas-cli
eas login
eas build:configure
```

Add an APK profile to `eas.json`:

```json
{
  "build": {
    "preview":    { "android": { "buildType": "apk" } },
    "production": { "android": { "buildType": "app-bundle" } }
  }
}
```

```bash
eas build -p android --profile preview      # shareable .apk
eas build -p android --profile production    # Play Store .aab
eas build -p ios --profile production        # App Store .ipa (macOS + Apple account)
```

---

## 6. Troubleshooting

| Problem | Fix |
|---------|-----|
| Metro cache issues | `npx expo start -c` |
| Module not found | `rm -rf node_modules && npm install` |
| Env vars not updating | Restart dev server after editing `.env` |
| Wrong Node version | `nvm install 20 && nvm use 20` |

---

## 7. Project Conventions

- **TypeScript strict mode** — keep types accurate; run `npm run type-check` before committing.
- **Path alias** — `@/*` maps to `src/*` (configured in `tsconfig.json`).
- **Theming** — never hardcode colors; use `useTheme()` from `src/theme/ThemeProvider`.
- **Data** — planetary data lives in `src/data/planets.ts`.
