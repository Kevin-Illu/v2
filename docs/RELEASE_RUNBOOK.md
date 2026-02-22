# MVP Release Runbook

## Scope
This runbook covers the `todov2` MVP release process for local packaging and manual distribution.

## 1) Pre-release checks

1. Ensure dependencies are installed:
   - `npm install`
2. Rebuild native sqlite bindings for the current runtime:
   - `npm run rebuild-sqlite3`
3. Run quality gates:
   - `npm run typecheck`
   - `npm test -- --run`
   - `npm run lint`

## 2) Versioning

1. Bump `package.json` version using semantic versioning.
2. Commit version changes.
3. Tag release commit (`vX.Y.Z`).

## 3) Build artifacts

- Linux: `npm run build:linux`
- Windows: `npm run build:win` (must be executed on a compatible Windows build host)
- macOS: `npm run build:mac` (must be executed on a macOS build host)

Artifacts are generated in `dist/`.

## 4) Signing / notarization decisions

- **Windows**: if code-signing is available, sign installer and binaries.
- **macOS**: notarization is currently disabled in `electron-builder.yml`; enable notarization before public macOS rollout.
- **Linux**: signing usually not required for MVP internal distribution.

## 5) Distribution strategy for MVP

Auto-update is disabled for MVP.

- Publish artifacts manually (release page, shared storage, or direct distribution).
- Include checksums per artifact.
- Provide installation notes by platform.

## 6) Rollback plan

1. Keep the previous stable artifacts available.
2. If release regression is reported:
   - stop distribution of latest artifacts,
   - communicate known issue and rollback recommendation,
   - re-publish previous stable artifact set.
3. Patch forward with a hotfix release (`x.y.z+1`) once validated.
