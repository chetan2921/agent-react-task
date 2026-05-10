# Repository Analysis Agent Guide

This repo contains a reusable guide for analyzing software repositories.

## What `agent.md` Does

`agent.md` is a standard workflow an agent can follow when you give it a GitHub repo or a local repo path.

It tells the agent to:

- inspect the repo before making claims
- identify the stack from real project files
- explain what the repo provides
- map the code structure
- review code quality, tests, tooling, and risks
- explain how third-party APIs should be added
- write a repo-specific report named `<repo_name>_agent.md`

## Files In This Repo

```text
agent.md
solehead_agent.md
```

`agent.md` is the reusable guide.

`solehead_agent.md` is an example report generated for the Solehead Flutter app.

## How To Use It

Give an agent a repo link and ask it to use `agent.md`.

Example:

```text
Use agent.md for https://github.com/chetan2921/solehead
```

The agent should inspect the repo and create or update:

```text
solehead_agent.md
```

For another repo, the output name changes to match the repo name. For example, `my-web-app` becomes:

```text
my_web_app_agent.md
```

## Report Scope

Each repo-specific report should cover:

1. Repo context
2. What the repo does
3. Code structure
4. Coding standards and improvement areas
5. Third-party API integration steps

The guide is stack-neutral. It can be used for frontend apps, backend services, mobile apps, libraries, CLIs, infrastructure repos, monorepos, and mixed codebases.
