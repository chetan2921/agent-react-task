# SoleHead React Native

SoleHead is an Expo React Native app built with TypeScript. It is a React Native version of the SoleHead Flutter app, with mock data used first so the screens, navigation, and state flows can be tested before connecting the real backend.

The repository also keeps the original analysis files:

- `agent.md`: reusable repository analysis guide
- `solehead_agent.md`: analysis report for the original Flutter SoleHead app

## Demo Videos

- [SoleHead Flutter demo video](https://drive.google.com/file/d/15UijcH4PluGg1IgPyXJesrN8jz5l7_AK/view?usp=sharing)
- [SoleHead React demo video](https://drive.google.com/file/d/17mi44t5YLEMNiNyT9HFqvpGf3HaQlvCN/view?usp=sharing)

## Tech Stack

- Expo SDK 54
- React Native 0.81
- TypeScript
- Expo Router
- TanStack Query
- React Native Testing Library
- Jest
- `expo-image` for images
- `expo-image-picker` for image selection
- `expo-linear-gradient` for gradients
- `lucide-react-native` for icons

## Features

- Intro screen
- Login and register flow
- Auth gate with first-run state
- Bottom tabs for Home, Explore, Create, and Profile
- Home feed with post cards
- Explore screen with sneaker cards
- Search screen for sneakers and users
- Create post screen with image picker support
- Post detail screen
- Sneaker detail screen
- Current profile screen
- User profile screen
- Followers and following screens
- Mock likes, follows, post creation, and sneaker ratings

## Project Structure

```txt
app/
  _layout.tsx                 Root layout, providers, and auth routing
  index.tsx                   Initial redirect route
  intro.tsx                   Intro screen
  (auth)/
    login.tsx                 Login screen
    register.tsx              Register screen
  (tabs)/
    _layout.tsx               Bottom tab layout
    feed.tsx                  Home feed
    explore.tsx               Explore screen
    create.tsx                Create post screen
    search.tsx                Search screen
    profile.tsx               Current user profile
  post/[id]/index.tsx         Post detail route
  sneaker/[id]/index.tsx      Sneaker detail route
  user/[id]/index.tsx         User profile route
  profile/followers/index.tsx Followers route
  profile/following/index.tsx Following route

src/
  components/                 Shared UI components
  data/                       Mock seed data
  hooks/                      App data hooks
  providers/                  App providers and auth state
  repositories/               Mock repository implementations
  testing/                    Test helpers
  types/                      Domain and repository types
  theme.ts                    Shared colors, spacing, typography, and shadows

__tests__/                    Jest tests
assets/                       Icons, splash assets, animations, and source images
```

## Install

Install Node.js first. Then install the app dependencies:

```sh
npm install
```

## Run The App

Start the Expo dev server:

```sh
npm start
```

Then choose a target from the Expo terminal:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web
- Scan the QR code with Expo Go on a phone

You can also start a target directly:

```sh
npm run ios
npm run android
npm run web
```

## Mock Login

The app is currently in mock mode. On the login screen, enter any non-empty user ID and any non-empty password to continue.

Example:

```text
User ID: chetan123
Password: password
```

The mock repository falls back to a seeded user when the entered user ID does not match an existing mock account. This keeps the interview demo easy to open without backend credentials.

## Reload During Development

Expo Fast Refresh usually updates the app when you save a file.

If you need a full reload, press `r` in the Expo terminal.

If the cache gets stuck, restart with:

```sh
npx expo start -c
```

## Quality Checks

Run TypeScript checks:

```sh
npm run typecheck
```

Run tests:

```sh
npm test
```

Check the Expo project:

```sh
npx expo-doctor
```

## Current Data Mode

The app currently uses mock repositories from `src/repositories/mockRepositories.ts`. Screens call hooks and repositories instead of calling `fetch` directly. That keeps the UI independent from the backend and makes it easier to replace the mock layer later.

The backend API and Firebase Auth can be added after the mock UI flow is stable.

## Useful Notes For Flutter Developers

- Flutter widgets map closely to React components.
- `lib/main.dart` maps roughly to `app/_layout.tsx` and `app/index.tsx`.
- Flutter screens map to route files inside `app/`.
- `pubspec.yaml` maps mostly to `package.json` and `app.json`.
- `flutter pub get` maps to `npm install`.
- `flutter run` maps to `npm start`.
- `setState` maps to React's `useState`.
- `initState` maps to `useEffect`.
- `Navigator.push` maps to `router.push` from Expo Router.

## Next Steps

- Replace mock repositories with API repositories.
- Add Firebase Auth using environment-based config.
- Add production build configuration with EAS.
- Expand tests around create post, follow, like, and search flows.
