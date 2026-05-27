# tmdb-sdk Agent Guide

## Use Bun

- `bun install` / `bun add <pkg>` / `bun remove <pkg>` — package management
- `bun test` — run tests
- `bunx <cmd>` — execute packages (not npx)
- `bun run <script>` — run package scripts
- `bun <file.ts>` — execute TS/JS directly

Fall back to `node`/`npm`/`npx` if bun unavailable.

## Publishing Release

Package: `@carlosnc/tmdb-sdk`

1. **Determine bump**: `patch` (bug fixes), `minor` (new features), `major` (breaking). Check `git log --oneline v$(node -p "require('./package.json').version")..HEAD`.
2. **Update CHANGELOG.md**: Insert entry at top following existing format (`## [X.Y.Z] - YYYY-MM-DD` with Added/Changed/Fixed sections).
3. **Update version** in `package.json`.
4. **Verify**: `bun run typecheck && bun run build && bun test`.
5. **Commit & tag**: `git add package.json CHANGELOG.md && git commit -m "chore(release): vX.Y.Z" && git tag vX.Y.Z`.

## Project Skills

- `.agents/skills/project-architecture/` — module layout, conventions, testing patterns
- `.agents/skills/tmdb-api/` — TMDB API endpoints, auth, image URLs
