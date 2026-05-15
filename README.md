# BANTAY-DENGUE ECOSYSTEM (FEASIBLE AI EDITION)

**Tagline:** Learn. Prevent. Protect.

Production-structured Turborepo monorepo for dengue awareness, risk monitoring, and early warning that is designed for **Vercel + Firebase free tier** and **no paid AI APIs**.

## Stack and constraints

- Monorepo: Turborepo + pnpm
- Web/Admin: Next.js App Router + TypeScript + Tailwind CSS + Framer Motion
- Mobile: Flutter + Riverpod scaffold
- Backend services: Firebase Auth, Firestore, Storage, FCM
- AI logic: Pure TypeScript rule-based + lightweight forecasting
- Optional weather data: Open-Meteo (no key)
- Charting library: **Recharts** (MIT, lightweight, easy to maintain in App Router dashboards)

## Repository structure

```text
/apps
  /web
  /admin
  /mobile
/packages
  /ui
  /firebase
  /shared
  /utils
  /hooks
  /constants
  /ai-engine
/firebase
  firestore.rules
```

## Key feature coverage

### AI engine (`packages/ai-engine`)

- `riskScoring.ts`
  - Weighted score (0-100)
  - Environment 40%, Behavior 30%, Symptoms 30%
  - Levels: GREEN, YELLOW, ORANGE, RED
- `trendForecast.ts`
  - 7-day moving average
  - Exponential smoothing
  - Trend slope detection
  - Functions:
    - `predictUserRiskTrend(history)`
    - `predictBarangayRiskTrend(data)`
    - `detectRisingRiskSignal(history)`
- `outbreakDetector.ts`
  - ALERT logic for:
    - >=3 RED cases in 7 days
    - >20% WoW risk average increase
    - cleanup <40% + rising symptoms
  - Output levels: LOW, WATCH, ALERT, OUTBREAK WARNING
- `communityAnalyzer.ts`
  - Barangay risk score
  - Infection clustering
  - Cleanup participation rate
  - Symptom density
  - Output heat score + risk label

### Weather risk (`packages/utils/weatherRisk.ts`)

- Open-Meteo integration (no API key)
- Rainfall/humidity/temperature-based risk boost
- Boost rule adds +10 to +20 for high rainfall + high humidity combinations
- Returns boost and explanation payload

### Firebase model and security

- Typed model definitions and sample documents in `packages/shared/src/index.ts`
- Collections modeled:
  - `users`, `assessments`, `symptoms`, `cleanup_tasks`, `leaderboard`, `trivia`, `badges`, `notifications`, `barangays`, `ai_scores`, `risk_trends`, `alerts`
- Security rules in `firebase/firestore.rules` implement:
  - Role validation (`user`, `admin`, `barangay_officer`)
  - User ownership for profile/data
  - Admin-only writes for alerts and overrides
  - Basic field validation and spam-resistant write limits

### App coverage

#### `apps/web`

Pages:
- Landing
- Dashboard
- Risk Checker
- Symptom Checker
- Cleanup Tracker
- Awareness Hub
- AI Risk Dashboard

AI dashboard includes:
- user risk score
- 7-day trend graph
- barangay risk level
- weather risk factor indicator
- alert banner

#### `apps/admin`

Includes:
- Barangay monitoring panel
- Outbreak alerts
- User risk analytics
- Cleanup participation tracking
- AI-generated dashboard
- Manual alert override UI

Charts:
- Risk trend line
- Barangay heat map placeholder grid
- Symptom reports over time
- Cleanup correlation panel

#### `apps/mobile`

Flutter + Riverpod scaffold includes screens for:
- Risk checker
- Symptom tracker
- Cleanup tasks
- Daily tips
- AI risk forecast
- Push notification integration hooks via Firebase Messaging dependency

## Notifications (FCM MVP design)

Client-driven trigger pathways are documented and scaffold-friendly for future Cloud Functions:
- rising risk detected
- barangay alert
- weather-based risk increase
- cleanup reminder

## Environment setup

Create local env files from:
- `apps/web/.env.example`
- `apps/admin/.env.example`

Open-Meteo requires no API key.

## Local development

```bash
corepack enable
corepack prepare pnpm@9.12.3 --activate
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm lint
pnpm check-types
pnpm test
pnpm build
```

## Deployment

### Vercel (web and admin)

Create two Vercel projects from the same repo:

- Project 1 root: `apps/web`
- Project 2 root: `apps/admin`

Set shared Firebase `NEXT_PUBLIC_*` vars for both projects.

### Firebase

1. Create Firebase project (free Spark tier)
2. Enable Auth (email/password or phone)
3. Enable Firestore + Storage + FCM
4. Apply rules from `firebase/firestore.rules`
5. Add web config keys to env files

## Optional seed payload

```bash
pnpm --filter @repo/shared exec tsx ../../scripts/seed-sample-data.ts
```

The script prints sample collection documents for quick local seeding.
