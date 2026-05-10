# Repository Analysis Agent Guide

Use this file as the standard operating procedure for analyzing any software repository.

This guide is stack-neutral. It must work for frontend apps, backend services, mobile apps, desktop apps, libraries, CLIs, data projects, ML projects, infrastructure repos, monorepos, and mixed codebases.

When a user provides a repo link or repo path and asks to use `agent.md`, do not overwrite this guide. Analyze the requested repo and create a separate repo-specific report:

```text
<repo_name>_agent.md
```

Examples:

```text
solehead -> solehead_agent.md
Elder_Care -> elder_care_agent.md
business_pilot -> business_pilot_agent.md
my-web-app -> my_web_app_agent.md
```

Normalize `<repo_name>` to lowercase snake case:

- Convert spaces and hyphens to underscores.
- Keep letters, numbers, and underscores.
- Remove other punctuation.
- Add `_agent.md`.

If `<repo_name>_agent.md` already exists, update it instead of creating a duplicate, unless the user asks for a separate version.

## Required Outcome

Every repo-specific report must answer these five tasks:

1. Get the complete context of the repo.
2. Analyze and explain what the repo provides and what it does.
3. Explain the complete structure of the code.
4. Assess how much the repo follows coding standards and how much it can improve.
5. Explain what steps to follow to integrate any third-party API for the product if required.

Do not skip any of these five tasks.

## Operating Workflow

Follow this workflow for every repo.

1. Prepare the repo.

   If the user gives a GitHub URL, clone it into a temporary inspection directory. If the repo already exists locally, inspect the local path.

   Capture:

   ```bash
   pwd
   git status --short
   git remote -v
   git branch --show-current
   rg --files
   ```

2. Identify the repo type.

   Look for stack indicators:

   ```text
   package.json
   pnpm-lock.yaml
   yarn.lock
   package-lock.json
   pyproject.toml
   requirements.txt
   Pipfile
   poetry.lock
   go.mod
   Cargo.toml
   pom.xml
   build.gradle
   settings.gradle
   pubspec.yaml
   composer.json
   Gemfile
   mix.exs
   deno.json
   Dockerfile
   docker-compose.yml
   terraform.tf
   Chart.yaml
   Makefile
   README.md
   ```

   Do not assume the stack from folder names alone. Confirm it from dependency files, entry points, scripts, and config.

3. Read intent and setup files.

   Read the closest available files:

   ```text
   README.md
   docs/
   CONTRIBUTING.md
   CHANGELOG.md
   package or project metadata
   main entry points
   routing files
   service or API files
   model or schema files
   database migrations
   test files
   deployment files
   configuration files
   ```

4. Inspect architecture.

   Identify:

   - Entry points.
   - Main runtime flow.
   - UI, API, service, domain, data, and infrastructure boundaries.
   - External systems.
   - Data models and persistence.
   - Test strategy.
   - Build, lint, format, and deploy tooling.

5. Scan coding standards and risks.

   Check for:

   - Hardcoded secrets or keys.
   - `.env` handling.
   - Debug logs and `print` calls.
   - TODOs in active product paths.
   - Stale tests.
   - Missing tests.
   - Missing lint or formatter setup.
   - Generated files policy.
   - Build artifacts committed to source.
   - Unsafe SQL, shell, HTML, URL, or file path handling.
   - Inconsistent error handling.
   - Incomplete release configuration.

6. Write the report.

   Save the completed report as:

   ```text
   <repo_name>_agent.md
   ```

7. Verify the result.

   Before finishing, confirm:

   - The generic `agent.md` guide was not overwritten.
   - The repo-specific `<repo_name>_agent.md` exists.
   - The report answers all five required tasks.
   - The report names the files and folders inspected.
   - Missing or unclear information is stated directly.

## Evidence Rules

Make factual claims only when they are supported by repo evidence.

Use evidence from:

- README and docs.
- Dependency files.
- Entry points.
- Routes.
- Services.
- Models.
- Database schemas and migrations.
- Tests.
- CI and deployment files.
- Config files.

If something is not visible in the repo, write "not found" or "unclear" instead of guessing.

Examples:

- Write: "No CI workflow was found in `.github/workflows/`."
- Write: "`test/widget_test.dart` is a placeholder test."
- Do not write: "The app is production-ready" unless the repo proves it.

## Quick Mode And Deep Mode

Default to deep mode unless the user asks for a quick summary.

Quick mode:

- Repo context.
- What the repo provides.
- Top-level structure.
- Biggest standards issues.
- Third-party API integration summary.

Deep mode:

- Full repo context.
- Product behavior.
- Runtime flow.
- Complete code structure.
- External systems.
- Models and data flow.
- Tests and tooling.
- Coding standards assessment.
- Security and release risks.
- Improvement plan.
- Third-party API integration guide.
- Onboarding notes for future agents.

## Report Template

Use this template for `<repo_name>_agent.md`.

# Agent Notes For <Repo Name>

## Repo Context

Repo location:

```text
<repo URL or local path>
```

Inspected local clone or path:

```text
<local path>
```

Current branch:

```text
<branch name, if available>
```

Main stack:

- <language or runtime>
- <framework>
- <state management, database, queue, cloud, build tool, or test tool>

Repo type:

```text
<frontend app | backend service | mobile app | desktop app | library | CLI | data pipeline | ML project | infrastructure | monorepo | mixed>
```

Short context:

<Explain the repo in a few direct sentences. Mention whether it is production code, a prototype, a package, a service, a generated app, or a mixed workspace.>

Files inspected:

- <file or folder>
- <file or folder>
- <file or folder>

## What This Repo Provides

<Explain what the repo does from the user or product point of view.>

Main capabilities:

- <capability 1>
- <capability 2>
- <capability 3>

Main runtime flow:

1. <entry point or startup step>
2. <main initialization step>
3. <main user, request, command, job, or deploy flow>
4. <data persistence or external service flow>
5. <output or response flow>

External systems:

- <database, API, auth provider, storage, payment provider, cloud service, message queue, or none found>

If the repo is a library, describe public APIs, package exports, and supported use cases.

If the repo is infrastructure, describe provisioned resources, environments, and deployment flow.

If the repo is a monorepo, describe each app/package and shared modules.

## Code Structure

Top-level structure:

```text
<tree of important top-level files and folders>
```

Important source folders:

```text
<tree of source folders and what each one does>
```

Important config and tooling:

```text
<config files, build files, lint files, format files, CI files, Docker files, deployment files>
```

Tests:

```text
<test folders, test types, and test command if found>
```

Assets, schemas, migrations, or generated files:

```text
<static assets, migrations, generated clients, compiled files, model files, schemas>
```

Entry points:

- <file>: <what starts here>
- <file>: <what starts here>

Key modules:

- <module or folder>: <responsibility>
- <module or folder>: <responsibility>

## Coding Standards Assessment

Overall assessment:

```text
<short rating or summary>
```

What is working well:

- <specific standard followed by the repo>
- <specific standard followed by the repo>
- <specific standard followed by the repo>

What needs improvement:

- <specific issue with file or pattern if possible>
- <specific issue with file or pattern if possible>
- <specific issue with file or pattern if possible>

Suggested score:

```text
Structure and organization: <0-10>/10
Naming and readability:     <0-10>/10
Error handling:             <0-10>/10
Testing:                    <0-10>/10
Security hygiene:           <0-10>/10
Build and tooling:          <0-10>/10
Documentation:              <0-10>/10
```

Improvement plan:

1. <highest-impact fix>
2. <next fix>
3. <next fix>
4. <next fix>
5. <checks to run before merge>

## Third-Party API Integration Guide

Use these steps when this repo needs a third-party API.

1. Define the product need.

   Write the exact behavior the API must support. Example: "send an email after signup" is clearer than "add email API."

2. Find the existing integration boundary.

   Look for folders or modules named:

   ```text
   services
   clients
   api
   integrations
   adapters
   gateways
   providers
   repositories
   lib
   src
   internal
   app
   server
   functions
   workers
   ```

   Follow the repo pattern. Do not create a new architecture if a clear one already exists.

3. Decide whether the integration belongs in the client, backend, worker, serverless function, or infrastructure layer.

   Put the integration server-side if it needs private keys, admin tokens, payment secrets, webhook secrets, service-role credentials, or privileged account access.

   Client-side code should only use public keys, OAuth flows, or short-lived tokens issued by the backend.

4. Add configuration safely.

   Use environment variables, secret managers, deployment config, local ignored files, or platform-specific secret systems. Do not commit real secrets.

   Example variable names:

   ```text
   THIRD_PARTY_BASE_URL=
   THIRD_PARTY_API_KEY=
   THIRD_PARTY_CLIENT_ID=
   THIRD_PARTY_WEBHOOK_SECRET=
   ```

5. Add a focused client or service module.

   Keep provider-specific request logic in one place. Handle:

   - Base URL
   - Authentication headers
   - Request body shape
   - Response parsing
   - Timeouts
   - Retries, if the repo already has a retry pattern
   - Error mapping

6. Validate inputs at the boundary.

   Validate user input before calling the third-party API. Encode path and query values with structured URL helpers instead of string concatenation.

7. Handle failures clearly.

   Plan for:

   - Network failure
   - Timeout
   - Invalid credentials
   - Rate limit
   - Provider downtime
   - Bad response shape
   - Partial success
   - Duplicate requests

8. Add tests.

   Mock the third-party API. Cover success, validation errors, provider errors, timeouts, rate limits, duplicate handling, and bad response bodies.

9. Add docs or setup notes where the repo already keeps them.

   Document variable names, local setup, test commands, provider dashboard steps, webhook setup, and verification steps. Do not include real credentials.

10. Review release safety.

    Confirm that secrets are not logged, user input is validated, webhook signatures are verified, provider permissions are scoped, and failures do not expose provider internals to users.

## Quick Onboarding Notes For Future Agents

Start here when working in this repo:

1. <first file to read>
2. <second file to read>
3. <third file to read>
4. <main setup command>
5. <main test command>
6. <main lint or format command>

## Coding Standards Checklist

Use this checklist while scoring the repo.

Structure:

- Source files are grouped by feature, layer, package, or domain.
- Entry points are easy to find.
- Generated files are separated or clearly marked.
- Dead files, backup files, and unused experiments are absent from active source folders.

Readability:

- Naming is consistent within each language and framework.
- Functions and classes have focused responsibilities.
- Comments explain non-obvious logic instead of repeating the code.
- Formatting is consistent.

Tooling:

- The repo has a formatter.
- The repo has a linter or static analyzer.
- The repo has a test command.
- The repo has dependency lock files where the ecosystem expects them.
- CI runs format, lint, tests, and build checks.

Testing:

- Tests match the current product behavior.
- Tests do not depend on live third-party services unless clearly marked as integration tests.
- Unit tests cover parsing, validation, and core logic.
- Integration tests cover API boundaries or persistence when relevant.
- UI or end-to-end tests cover main user flows when relevant.

Security:

- No committed secrets.
- Sensitive config comes from environment or secret management.
- User input is validated at system boundaries.
- SQL, shell, HTML, URL, and file path values are handled with safe APIs.
- Auth and permission checks are tested where possible.
- Logs do not expose tokens, passwords, payment data, or personal data.

Error handling:

- Errors are handled near the right boundary.
- User-facing errors are understandable.
- Internal errors keep enough context for debugging.
- The code does not silently swallow failures.
- Retry behavior is limited and intentional.

Dependencies:

- Dependencies are still needed.
- Versions are pinned or locked according to the ecosystem.
- New dependencies are not added for small one-off tasks.
- Security advisories are checked before release.

Documentation:

- Setup steps are accurate.
- Run, test, build, and deploy commands are present.
- Environment variables are documented without real values.
- Architecture notes match the code.

## Stack-Specific Commands And Clues

Use the relevant section for the repo being analyzed.

JavaScript or TypeScript:

- Inspect `package.json`, scripts, `src/`, `app/`, `pages/`, `vite.config.*`, `next.config.*`, `tsconfig.json`, ESLint, Prettier, Vitest, Jest, Playwright, Cypress.
- Common checks:

  ```bash
  npm test
  npm run lint
  npm run build
  ```

Python:

- Inspect `pyproject.toml`, `requirements.txt`, `src/`, package folders, FastAPI, Django, Flask, pytest, Ruff, Black, mypy, Alembic.
- Common checks:

  ```bash
  pytest
  ruff check .
  python -m build
  ```

Go:

- Inspect `go.mod`, `cmd/`, `internal/`, `pkg/`, migrations, generated code, `gofmt`, `golangci-lint`.
- Common checks:

  ```bash
  go test ./...
  gofmt -w .
  golangci-lint run
  ```

Rust:

- Inspect `Cargo.toml`, `src/main.rs`, `src/lib.rs`, crates, `cargo test`, `cargo fmt`, `cargo clippy`.
- Common checks:

  ```bash
  cargo test
  cargo fmt --check
  cargo clippy
  ```

Java or Kotlin:

- Inspect `pom.xml`, `build.gradle`, `settings.gradle`, `src/main`, `src/test`, Spring, Android, JUnit.
- Common checks:

  ```bash
  ./gradlew test
  ./gradlew build
  mvn test
  ```

Flutter or Dart:

- Inspect `pubspec.yaml`, `lib/main.dart`, `lib/`, `test/`, `analysis_options.yaml`, generated files, platform folders.
- Common checks:

  ```bash
  dart format .
  flutter analyze
  flutter test
  ```

Mobile native:

- Inspect Android Gradle files, Xcode project files, app manifests, platform permissions, signing config, tests, assets.

Infrastructure:

- Inspect Terraform, Helm, Kubernetes manifests, Dockerfiles, Compose files, CI workflows, environment folders, state handling, secret handling.
- Common checks:

  ```bash
  terraform fmt -check
  terraform validate
  helm lint
  docker compose config
  ```

Data or ML:

- Inspect notebooks, pipelines, model files, data loaders, training scripts, evaluation scripts, feature schemas, reproducibility, data paths, artifact handling.

Monorepo:

- Identify each package or app.
- Map shared packages.
- Record workspace tooling.
- Score standards at both root and package level when needed.

## Scoring Rubric

Use scores consistently.

```text
0-2: Missing or mostly broken.
3-4: Present but weak, stale, or risky.
5-6: Usable but incomplete or inconsistent.
7-8: Good, with clear patterns and manageable gaps.
9-10: Strong, consistent, tested, documented, and production-aware.
```

## Final Verification Checklist

Before finishing any repo analysis, confirm:

- `agent.md` was not overwritten.
- `<repo_name>_agent.md` was created or updated.
- The report answers all five required tasks.
- The report includes repo context and files inspected.
- The report includes code structure.
- The report includes coding standards assessment and improvement plan.
- The report includes third-party API integration steps.
- The report names missing or unclear information directly.
- The final response gives the path to `<repo_name>_agent.md`.
