---
name: use-bun
description: Prefer bun and bunx over node/npm/npx/yarn/pnpm for package management and script execution.
---

# Use Bun and Bunx

Instructs the agent to prefer Bun and Bunx for all package management, script execution, and project running tasks.

## Rules

1. **Package Installation**:
   - Use `bun install` instead of `npm install`, `yarn install`, or `pnpm install`.
   - Use `bun add <package>` (or `bun add -d <package>` for devDependencies) instead of `npm install --save`, `yarn add`, or `pnpm add`.
   - Use `bun remove <package>` instead of `npm uninstall`, `yarn remove`, or `pnpm remove`.

2. **Package/Command Execution**:
   - Use `bunx <command>` instead of `npx <command>`, `yarn dlx <command>`, or `pnpm dlx <command>`.

3. **Script Running**:
   - Use `bun run <script>` instead of `npm run <script>`, `yarn run <script>`, or `pnpm run <script>`.

4. **Direct JS/TS File Execution**:
   - Use `bun run <file.ts/js>` or `bun <file.ts/js>` instead of `node <file.js>` or `ts-node <file.ts>`.

5. **Lockfile Management**:
   - Maintain `bun.lock` or `bun.lockb` for dependency resolution. Do not generate `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml` unless specifically requested.

## Exceptions
- If Bun/Bunx is not installed on the system, fall back to standard `node`, `npm`, or `npx`.
