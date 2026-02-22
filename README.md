# todov2

An Electron application with

- React
- TypeScript
- SQLite
- Node JS

## Recommended IDE Setup

- [Neovim](https://github.com/kevin-illu/dotfiles-public) + [ESLint] + [Prettier]

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```


## MVP Stability Baseline

To keep MVP quality gates green, run these checks locally before pushing:

```bash
$ npm run typecheck
$ npm test -- --run
```

### SQLite native bindings strategy (local + CI)

`sqlite3` is a native module and may need a rebuild for your current Node/Electron runtime.

```bash
$ npm run rebuild-sqlite3
```

Recommended sequence for fresh environments (including CI workers):

1. `npm install`
2. `npm run rebuild-sqlite3`
3. `npm run typecheck`
4. `npm test -- --run`

### Main-process repository tests

The legacy repository integration suites are currently quarantined until:

- the sqlite test runtime is deterministic in CI, and
- tests are aligned with the current repository contracts.

Renderer tests remain active and should stay green while repository suites are being modernized.

## Contributor release checklist

Before opening a release PR, run:

```bash
$ npm run typecheck
$ npm test -- --run
$ npm run lint
```

For release operations and rollback steps, follow `docs/RELEASE_RUNBOOK.md`.

For manual end-to-end verification, follow `docs/MVP_QA_CHECKLIST.md`.

## Updater strategy for MVP

Auto-update is disabled for MVP. Release artifacts are currently distributed manually.
