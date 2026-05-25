---
name: publish-release
description: Step-by-step workflow for version bumps, changelog updates, tagging, and publishing to npm.
---

# Publish & Release

Use this skill when preparing a new release of `@carlosnc/tmdb-sdk`.

## Workflow Steps

### 1. Determine Version Bump

Read the current version from `package.json` (semver). Bump:

- **patch** (`0.5.0` → `0.5.1`) — bug fixes, minor refactors, no new features
- **minor** (`0.5.0` → `0.6.0`) — new features, backwards-compatible additions
- **major** (`1.0.0` → `2.0.0`) — breaking changes

Check `git log --oneline <last-tag>..HEAD` for context. Last tag is `v$(node -p "require('./package.json').version")`.

### 2. Update CHANGELOG.md

Insert a new entry at the top under the `# Changelog` heading, following the existing format:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Fixed
- ...
```

Group under these sections: `Added`, `Changed`, `Fixed`, `Removed`. Omit empty sections.

Use today's date (`Get-Date -Format "yyyy-MM-dd"` in PowerShell).

### 3. Update package.json Version

```powershell
bunx semver -i <patch|minor|major> (node -p "require('./package.json').version")
```

Then set the new version in `package.json` manually with `bun run version` or edit directly.

Alternatively:
```powershell
$ver = node -p "require('./package.json').version"
$parts = $ver.Split('.')
$parts[2] = [int]$parts[2] + 1  # patch bump
$newVer = $parts -join '.'
```
(Adjust index for minor/major.)

### 4. Verify

```powershell
bun run typecheck
bun run build
bun test
```

Fix any failures before proceeding.

### 5. Commit & Tag

```powershell
git add package.json CHANGELOG.md
git commit -m "chore(release): vX.Y.Z"
git tag vX.Y.Z
```

## Related

- `project-architecture` — module layout and conventions
- `use-bun` — prefer bun/bunx for commands
