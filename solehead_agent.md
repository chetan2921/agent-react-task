# Agent Notes For Solehead

## Repo Context

Repo location:

```text
https://github.com/chetan2921/solehead
```

Inspected local clone or path:

```text
/private/tmp/solehead-inspect
```

Current branch:

```text
main
```

Current commit inspected:

```text
67ca3e12daa0fd7d5285d4aa62b64f0084624bac
```

Remote state checked:

```text
git fetch origin main
git rev-parse HEAD origin/main FETCH_HEAD
```

All three refs resolved to the same commit during inspection.

Main stack:

- Flutter and Dart
- Material 3 UI
- Provider for app state
- Firebase Core and Firebase Auth
- `http` for JSON REST calls
- `dio` for file uploads
- SharedPreferences for small local auth and first-run state
- Lottie, cached network images, Google Fonts, image picker, and URL launcher
- Flutter platform targets for Android, iOS, web, macOS, Linux, and Windows

Repo type:

```text
mobile app with desktop and web Flutter targets
```

Short context:

Solehead is a Flutter app for sneaker discovery, rating, posting, and social profiles. The README describes a curated sneaker catalog backed by Firebase Auth and a Render-hosted API. The product code is in `lib/`, with generated Flutter platform folders checked in for the supported targets.

Files inspected:

- `README.md`
- `pubspec.yaml`
- `pubspec.lock`
- `analysis_options.yaml`
- `firebase.json`
- `lib/main.dart`
- `lib/models/`
- `lib/providers/`
- `lib/screens/`
- `lib/services/`
- `lib/utils/`
- `lib/widgets/`
- `test/`
- `android/app/build.gradle.kts`
- `android/app/google-services.json`
- `ios/Podfile`
- `ios/Runner/GoogleService-Info.plist`
- `macos/Runner/GoogleService-Info.plist`
- `web/manifest.json`
- `linux/`
- `windows/`

Not found:

- `.github/workflows/`
- `Dockerfile`
- `docker-compose.yml`
- `Makefile`
- `render.yaml`
- `CONTRIBUTING.md`
- `CHANGELOG.md`
- `lib/firebase_options.dart`

The missing `lib/firebase_options.dart` matters because `lib/main.dart`, `README.md`, and `firebase.json` all expect it.

## What This Repo Provides

Solehead provides a sneaker-focused social app.

From the README and source files, the app supports or is intended to support:

- A main home shell with feed, explore, create post, and profile tabs.
- A sneaker explore surface with top sneakers, brand browsing, search, and a Pinterest-style grid.
- Sneaker detail pages with images, metadata, price fields, rating state, and product links.
- Firebase-backed registration and login, with direct backend fallback when Firebase is unavailable.
- User profiles with profile photos, follower and following counts, user posts, and account stats.
- Following and follower screens.
- User search.
- Feed posts with sneaker images, descriptions, purchase details, likes, and user ownership.
- Create, update, delete, and like flows for posts.
- Flutter builds for Android, iOS, web, macOS, Linux, and Windows.

Main capabilities:

- Authentication: `AuthProvider`, `AuthService`, and `FirebaseService` manage Firebase login, registration, direct backend fallback, mock login, profile loading, profile updates, profile photo upload, logout, and local login state.
- Catalog browsing: `SneakerProvider` and `SneakerService` load paginated sneakers, top sneakers, popular brands, brand filters, search results, sneaker details, and ratings.
- Social feed: `PostProvider` and `PostService` load feed posts, following posts, user posts, create posts with media upload, update posts, delete posts, and toggle likes.
- User graph: `UserProvider` and `UserService` load users, search users, load selected profiles, follow and unfollow, and fetch followers or following lists.
- UI: `screens/` contains the app surfaces, and `widgets/` contains reusable UI pieces like cached images, loaders, responsive containers, and sneaker cards.

Main runtime flow:

1. `lib/main.dart` calls `WidgetsFlutterBinding.ensureInitialized()`.
2. Firebase initialization is attempted with `DefaultFirebaseOptions.currentPlatform`.
3. The app starts `MyApp`, which registers `AuthProvider`, `PostProvider`, `UserProvider`, and `SneakerProvider` in a `MultiProvider`.
4. `MaterialApp` uses `AuthWrapper` as the home widget.
5. `AuthWrapper` reads `SharedPreferences` for the first-run flag.
6. First-time users see `IntroScreen`.
7. Returning users are routed to `HomeScreen` or `LoginScreen` based on `AuthProvider.isLoggedIn`.
8. `HomeScreen` loads feed posts after the first frame and exposes the main tabs.
9. Screens call providers. Providers call services. Services call the Render-hosted backend or Firebase.
10. Models parse backend responses into `SneakerModel`, `PostModel`, and `UserModel`.

External systems:

- Firebase Auth via `firebase_core`, `firebase_auth`, `FirebaseService`, `firebase.json`, `android/app/google-services.json`, `ios/Runner/GoogleService-Info.plist`, and `macos/Runner/GoogleService-Info.plist`.
- Render-hosted REST API at `https://soulheads-backend.onrender.com/api`, defined in `lib/utils/constants.dart`.
- Backend endpoints under `/auth`, `/users`, `/posts`, `/sneakers`, and `/dev`, defined in `lib/utils/api_endpoints.dart`.
- Local SharedPreferences for `isFirstTime` and `isLoggedIn`.
- Device files through `image_picker`, `dart:io`, and `ApiService.uploadFile`.
- External product links through `url_launcher`.

No local database schema, migrations, server code, or backend implementation were found in this repo.

## Code Structure

Top-level structure:

```text
.
|-- README.md
|-- analysis_options.yaml
|-- firebase.json
|-- pubspec.lock
|-- pubspec.yaml
|-- android/
|-- assets/
|-- ios/
|-- lib/
|-- linux/
|-- macos/
|-- test/
|-- web/
`-- windows/
```

Important source folders:

```text
lib/
|-- main.dart
|-- models/
|   |-- post_model.dart
|   |-- sneaker_model.dart
|   `-- user_model.dart
|-- providers/
|   |-- auth_provider.dart
|   |-- post_provider.dart
|   |-- sneaker_provider.dart
|   `-- user_provider.dart
|-- screens/
|   |-- brand_sneakers_screen.dart
|   |-- create_post_screen.dart
|   |-- explore_screen.dart
|   |-- feed_screen.dart
|   |-- followers_screen.dart
|   |-- following_screen.dart
|   |-- home_screen.dart
|   |-- intro_screen.dart
|   |-- login_screen.dart
|   |-- post_detail_screen.dart
|   |-- profile_screen.dart
|   |-- profile_screen.dart.backup
|   |-- profile_screen_new.dart
|   |-- search_screen.dart
|   |-- sneaker_detail_screen.dart
|   |-- user_profile_screen.dart
|   `-- walking_sneaker.dart
|-- services/
|   |-- api_service.dart
|   |-- auth_service.dart
|   |-- firebase_service.dart
|   |-- post_service.dart
|   |-- sneaker_service.dart
|   `-- user_service.dart
|-- utils/
|   |-- api_endpoints.dart
|   |-- constants.dart
|   |-- preferences_manager.dart
|   |-- server_status.dart
|   `-- test_navigation_helper.dart
`-- widgets/
    |-- common_widgets.dart
    |-- ink_drop_loader.dart
    |-- responsive_widgets.dart
    `-- sneaker_card.dart
```

Important config and tooling:

```text
pubspec.yaml                 # Flutter dependencies, assets, SDK constraint
pubspec.lock                 # Locked package versions
analysis_options.yaml        # Includes package:flutter_lints/flutter.yaml
firebase.json                # FlutterFire project and platform output mapping
android/app/build.gradle.kts # Android app id, FlutterFire plugin, release signing placeholder
ios/Podfile                  # CocoaPods setup
macos/Podfile                # macOS CocoaPods setup
web/manifest.json            # Web app metadata
```

Tests:

```text
test/
|-- auth_provider_test.dart
`-- widget_test.dart
```

`test/widget_test.dart` is still the default Flutter counter test. It imports `MyApp`, but the app is not a counter app.

`test/auth_provider_test.dart` constructs `AuthProvider` directly, waits 100 ms, and calls `mockLogin('testuser')`. That path reaches real provider and service code instead of a mocked auth service.

Assets, schemas, migrations, or generated files:

```text
assets/
|-- animations/
|   |-- collection_animation.json
|   |-- rating_animation.json
|   |-- sneaker_animation3.json
|   `-- trophy_animation.json
`-- images/
    |-- Adidas/
    |-- Converse/
    |-- New Balance/
    |-- Nike/
    |-- PUMA/
    `-- icon_sent3.png
```

No database schemas or migrations were found.

Entry points:

- `lib/main.dart`: Flutter app startup, Firebase initialization, provider registration, routes, and `AuthWrapper`.
- `android/app/src/main/kotlin/com/example/solehead/MainActivity.kt`: Android Flutter activity.
- `ios/Runner/AppDelegate.swift`: iOS Flutter app delegate.
- `macos/Runner/AppDelegate.swift`: macOS Flutter app delegate.
- `linux/runner/main.cc`: Linux runner entry.
- `windows/runner/main.cpp`: Windows runner entry.
- `web/index.html`: Web host page.

Key modules:

- `lib/models/sneaker_model.dart`: Parses sneaker catalog fields, metadata, source file markers, image fallbacks, prices, ratings, and post counts.
- `lib/models/post_model.dart`: Parses post IDs, user IDs, optional sneaker IDs, images, purchase fields, likes, timestamps, and embedded user or sneaker objects.
- `lib/models/user_model.dart`: Parses users, profile photos, sneaker count, follower counts, following counts, post count, and timestamps.
- `lib/services/api_service.dart`: Central HTTP client for JSON calls and uploads. It adds Firebase bearer tokens when requested and maps HTTP errors to `ApiException`.
- `lib/services/firebase_service.dart`: Wraps Firebase Auth, user access, ID token retrieval, sign in, registration, reset email, profile updates, email verification, and sign out.
- `lib/services/auth_service.dart`: Coordinates Firebase auth plus backend registration or login. It also contains direct backend fallback, mock auth, profile calls, and test user creation.
- `lib/services/sneaker_service.dart`: Maps sneaker endpoints to `SneakerModel` lists or individual models.
- `lib/services/post_service.dart`: Maps post endpoints to `PostModel`, including file upload and like toggling.
- `lib/services/user_service.dart`: Maps user, search, follow, and profile endpoints to `UserModel`.
- `lib/providers/auth_provider.dart`: Holds current user, loading state, errors, and local logged-in state.
- `lib/providers/sneaker_provider.dart`: Holds catalog, top sneakers, search results, selected sneaker, brand list, pagination, loading state, and rating updates.
- `lib/providers/post_provider.dart`: Holds feed, following posts, user posts, pagination, loading state, create/update/delete flows, and local like updates.
- `lib/providers/user_provider.dart`: Holds selected user, user lists, followers, following, loading state, and follow actions.

## Coding Standards Assessment

Overall assessment:

```text
The repo has a reasonable Flutter layer split, but it is not clean enough for production handoff yet.
```

What is working well:

- The app follows a recognizable Flutter layout: `models`, `providers`, `screens`, `services`, `utils`, and `widgets`.
- Most network access goes through `ApiService`, which gives the app a clear HTTP boundary.
- Provider classes keep much of the screen state out of UI files.
- Models include defensive parsing helpers for backend fields that may arrive as strings, numbers, maps, or missing values.
- `analysis_options.yaml` includes `flutter_lints`.
- `pubspec.yaml` declares the asset folders used by the app.
- Platform folders are standard Flutter project folders.
- The README explains setup, architecture, run commands, test commands, and common troubleshooting.

What needs improvement:

- `lib/firebase_options.dart` is missing, while `lib/main.dart` imports it and `firebase.json` maps FlutterFire output to it. Fresh checkouts cannot analyze or compile cleanly until it is generated.
- `flutter analyze` reports 382 issues after dependency resolution. The first blocking errors are the missing Firebase options import and missing `DefaultFirebaseOptions`.
- Many production source files call `print`, including `lib/main.dart`, providers, services, and utility files. The linter flags these through `avoid_print`.
- Some logs include auth-sensitive context, including email addresses, Firebase user IDs, token presence, and token length. Those logs should not remain in production paths.
- `lib/utils/constants.dart` hardcodes `ApiConstants.baseUrl` to the Render production URL. Local, staging, and production environments should not require source edits.
- Dev endpoints and mock auth flows live in normal app paths: `/dev` endpoints in `lib/utils/api_endpoints.dart`, `mockLogin`, `mockRegister`, and a quick dev login in `lib/screens/login_screen.dart`.
- URL construction interpolates path and query values directly in places like `searchUsers`, `searchSneakers`, `getSneakersByBrand`, and user/post ID endpoint helpers. Use `Uri` helpers so spaces, slashes, and special characters are encoded consistently.
- `UserService.searchUsers` calls `${ApiEndpoints.listUsers}?search=$query`, which points at a `/dev/users` endpoint instead of the `ApiEndpoints.searchUsers` helper.
- `lib/screens/profile_screen.dart.backup` is checked into `lib/screens/`. Backup files should not live in active source folders.
- `lib/screens/profile_screen_new.dart` appears to be a commented alternate profile implementation, with commented TODOs throughout.
- TODOs remain in product paths, including `create_post_screen.dart`, `profile_screen.dart`, `user_profile_screen.dart`, and the Android release config.
- `android/app/build.gradle.kts` still uses `applicationId = "com.example.solehead"` and debug signing for release builds.
- Many service methods catch errors only to `rethrow`. That adds noise without changing behavior.
- Error handling is inconsistent: `ApiException`, generic `Exception`, raw `toString()` cleanup, boolean fallbacks, and silent `false` returns are all used.
- Provider methods often call `notifyListeners()` from nested helper methods. This can create extra rebuilds and makes state transitions harder to test.
- `PostService.toggleLike` is marked as legacy but remains in the service.
- `additionalImageFiles` is accepted by `PostService.createPost` but is not sent to the backend upload payload.
- `test/widget_test.dart` is a stale counter test and does not match this app.
- `test/auth_provider_test.dart` can hang because it uses `AuthProvider.mockLogin()` without mocking the service or backend.
- No CI workflow was found in `.github/workflows/`.

Suggested score:

```text
Structure and organization: 7/10
Naming and readability:     6/10
Error handling:             5/10
Testing:                    2/10
Security hygiene:           5/10
Build and tooling:          5/10
Documentation:              6/10
```

Improvement plan:

1. Regenerate or add `lib/firebase_options.dart` using the repo's FlutterFire config.

   ```bash
   flutterfire configure
   ```

2. Re-run dependency setup and checks.

   ```bash
   flutter pub get
   dart format .
   flutter analyze
   flutter test
   ```

3. Replace production `print` calls with a logging approach that can be disabled or filtered by build mode. Remove auth token, user ID, and email logging.

4. Move backend URL configuration out of source constants.

   ```bash
   flutter run --dart-define=API_BASE_URL=https://soulheads-backend.onrender.com/api
   ```

   Then read it from Dart with `String.fromEnvironment`.

5. Guard or remove dev-only auth flows and `/dev` endpoints from release builds.

6. Replace direct URL interpolation with `Uri` construction for query values and path segments.

7. Remove stale source files, especially `lib/screens/profile_screen.dart.backup` and unfinished alternate screens.

8. Replace the stale counter test with an app-specific smoke test.

9. Refactor auth and API services behind injectable boundaries so provider tests can mock network and Firebase behavior.

10. Add focused tests for model parsing, endpoint construction, provider state transitions, and API error mapping.

11. Set a real Android application ID and release signing setup before release builds.

12. Add CI for `dart format --set-exit-if-changed .`, `flutter analyze`, and `flutter test`.

## Verification Results

Commands run during inspection:

```bash
pwd
git status --short --branch
git remote -v
git branch --show-current
rg --files
git fetch origin main
git rev-parse HEAD origin/main FETCH_HEAD
flutter pub get
dart format --output=none --set-exit-if-changed .
flutter analyze
flutter test
```

Results:

- `pwd` returned `/private/tmp/solehead-inspect`.
- `git status --short --branch` was clean before dependency setup.
- `git remote -v` showed `origin` as `https://github.com/chetan2921/solehead`.
- `git branch --show-current` returned `main`.
- `rg --files` found the Flutter app files listed in this report.
- `git fetch origin main` succeeded after network approval.
- `git rev-parse HEAD origin/main FETCH_HEAD` returned the same commit for all three refs.
- `flutter pub get` succeeded after approval because Flutter needed to write to its SDK cache.
- `flutter pub get` changed `pubspec.lock` in the temporary clone because package resolution updated a few transitive packages. This was not copied into the workspace report folder.
- `dart format --output=none --set-exit-if-changed .` completed with `0 changed`.
- `flutter analyze` failed with 382 issues. The blocking errors are the missing `lib/firebase_options.dart` import and missing `DefaultFirebaseOptions`; most of the rest are lint findings such as `avoid_print` and deprecated `withOpacity`.
- `flutter test` failed. `test/widget_test.dart` cannot compile because `lib/firebase_options.dart` is missing. `test/auth_provider_test.dart` timed out after calling the mock login path.

## Third-Party API Integration Guide

Use these steps when Solehead needs a third-party API.

1. Define the product need.

   Write the exact behavior first. For example, "send a push notification when someone likes a post" is clearer than "add notification API."

2. Decide where the integration belongs.

   In this repo, Flutter calls should usually go through `lib/services/`, with app state changes in `lib/providers/`. Screens should call providers, not raw HTTP clients.

3. Keep private API work on the backend.

   Put the integration in the backend if it needs private API keys, admin tokens, payment secrets, webhook secrets, service-role credentials, or privileged account access. A Flutter app cannot fully hide embedded secrets.

4. Add configuration safely.

   Do not put real secrets in Dart files, README examples, platform files, or tests.

   For public or non-secret config, prefer Dart defines:

   ```bash
   flutter run \
     --dart-define=API_BASE_URL=https://soulheads-backend.onrender.com/api \
     --dart-define=THIRD_PARTY_BASE_URL=https://api.example.com
   ```

   For secrets, add backend environment variables instead:

   ```text
   THIRD_PARTY_BASE_URL=
   THIRD_PARTY_API_KEY=
   THIRD_PARTY_CLIENT_ID=
   THIRD_PARTY_WEBHOOK_SECRET=
   ```

5. Add endpoint helpers in the existing style, then improve encoding.

   Current endpoint definitions live in `lib/utils/api_endpoints.dart`. Follow that location, but prefer `Uri` helpers for new query and path values.

6. Add a focused service class.

   Put provider-specific request details in one service file, for example:

   ```text
   lib/services/notification_service.dart
   ```

   Keep it responsible for base URLs, headers, request bodies, response parsing, and provider-specific error mapping.

7. Reuse `ApiService` when calling the Solehead backend.

   If the Flutter app calls a new Solehead backend endpoint, add the URL helper and call it through `ApiService`. If the Flutter app must call a public third-party API directly, keep that client separate so third-party headers and errors do not leak into the app backend client.

8. Add provider methods around product behavior.

   Provider methods should describe the app action, not the HTTP operation. Names like `sendLikeNotification`, `syncSneakerPrice`, or `verifyPurchaseLink` are easier to test than names that expose REST details.

9. Validate inputs before the request.

   Validate required fields in UI or provider code. Validate trust boundaries again in the backend. Encode path and query values with `Uri`, not string interpolation.

10. Handle failure states.

    Plan for network failure, timeout, invalid credentials, 401, 403, 404, 429, 500, bad response bodies, partial success, and duplicate requests. Map service errors to user-facing provider errors consistently.

11. Add tests before depending on the live provider.

    Mock service responses in provider tests. Cover success, validation errors, provider errors, rate limits, timeouts, duplicate handling, and bad response bodies.

12. Document setup where the repo already documents setup.

    The README is the current setup document. Add variable names, local commands, provider dashboard steps, webhook setup, and verification steps there if the integration affects developers.

13. Review release safety.

    Check that no secret is committed, no token is logged, user input is encoded, webhook signatures are verified server-side, provider permissions are scoped, and third-party outages do not break unrelated app flows.

## Quick Onboarding Notes For Future Agents

Start here when working in this repo:

1. Read `README.md`.
2. Run `flutter pub get`.
3. Confirm `lib/firebase_options.dart` exists, or run `flutterfire configure`.
4. Read `lib/main.dart` for startup, providers, routes, and auth routing.
5. Read `lib/utils/constants.dart` and `lib/utils/api_endpoints.dart` before touching networking.
6. For auth work, read `lib/providers/auth_provider.dart`, `lib/services/auth_service.dart`, and `lib/services/firebase_service.dart`.
7. For catalog work, read `lib/providers/sneaker_provider.dart`, `lib/services/sneaker_service.dart`, and `lib/models/sneaker_model.dart`.
8. For feed work, read `lib/providers/post_provider.dart`, `lib/services/post_service.dart`, and `lib/models/post_model.dart`.
9. For profile and follow work, read `lib/providers/user_provider.dart`, `lib/services/user_service.dart`, and `lib/models/user_model.dart`.
10. Run `dart format .`, `flutter analyze`, and `flutter test` before handing off changes.
