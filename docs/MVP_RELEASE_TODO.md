# MVP Release TODO

This checklist captures the highest-impact work needed to ship a stable MVP of `todov2`.

## 1) Stabilize build and test quality gates (must-do before release)

- [x] Fix failing Node/`main` unit tests so `npm test -- --run` passes in CI.
  - `auth.test.ts` imports a missing repository module (`src/main/src/repositories/auth`), which currently does not exist.
  - `database.test.ts` and `todo.test.ts` fail because native `sqlite3` bindings are not present for the runtime.
- [x] Repair TypeScript errors so `npm run typecheck` passes.
  - Broken or stale test expectations against `TodoRepository` APIs (`createStep`, `getStepById`, `updateStep`, argument mismatch).
  - Invalid import path in `src/main/src/types/database.ts` (`@main/services/database/database` not found).
  - Duplicate export collisions in `src/types/index.ts`.
  - Unused parameter in `src/main/src/services/communication.ts`.
- [x] Decide and document a reliable local + CI strategy for native sqlite setup.
  - Add `npm run rebuild-sqlite3` to setup docs where required.
  - Ensure CI builds install/rebuild native modules before tests.

## 2) Close architecture gaps visible in current tests/code

- [x] Either implement `AuthRepository` (with tests) or remove/replace outdated auth tests.
- [x] Align repository contracts and tests for todo-related step operations.
  - If step-level methods are part of MVP, implement them consistently in repository + service + tests.
  - If not part of MVP, remove test coverage that targets non-MVP API.
- [x] Normalize and strengthen typing in communication and repository layers.
  - Replace broad/loosely typed return values with concrete domain types.
  - Resolve existing TODO notes around return types and argument typing.

## 3) Hardening and release readiness

- [ ] Replace placeholder metadata with production values.
  - `author` and `homepage` in `package.json` still use template values.
  - Auto-update URLs in `electron-builder.yml` and `dev-app-update.yml` still point to `https://example.com/auto-updates`.
  - Linux maintainer field in `electron-builder.yml` still uses `electronjs.org` placeholder.
- [ ] Confirm updater strategy for MVP.
  - Decide whether auto-update should be enabled for MVP; if not, disable publish settings for first release.
- [ ] Run full platform packaging smoke checks (`build:win`, `build:mac`, `build:linux`) on target environments.
- [ ] Add a short release runbook with:
  - Build/versioning steps.
  - Signing/notarization decisions (especially macOS).
  - Rollback plan for failed release.

## 4) Product polish (recommended before broad MVP rollout)

- [ ] Improve and standardize public/shared types (`src/types/*`) to reduce cross-layer drift.
- [ ] Expand README with practical contributor setup:
  - Native sqlite notes.
  - How to run unit tests reliably.
  - How to package per platform.
- [ ] Add a minimum QA checklist (manual) for core flows:
  - Create todo.
  - List/reload todo list.
  - Archive/complete flows.
  - App restart persistence check.

## Suggested execution order

1. **Typecheck + test green baseline** (`npm run typecheck`, `npm test -- --run`).
2. **Repository/API alignment** (auth + todo step contract decisions).
3. **Release config cleanup** (metadata, updater config).
4. **Packaging and smoke validation** (target platforms).
5. **Docs + QA checklist finalization**.
