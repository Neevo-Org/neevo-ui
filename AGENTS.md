# AGENTS.md

This document defines how agents should work in this repository.

## Quick Start For Agents
1. Read this file before making any code or git changes.
2. Identify affected scope (`data-entry`, `surfaces`, `overlay`, `layout`, `typography`, `docs`, `ci`).
3. Implement changes in the smallest logical unit and keep exports/docs in sync.
4. Run `npm run lint` and `npm run build` when relevant.
5. Create commits using the required `Type / Scope / Summary` format.
6. Report blockers clearly (permissions, locks, missing secrets, sandbox limits) with next action.

## Purpose
Neevo UI is a modular React component library with a local showcase app used as documentation and usage validation.

Primary goals:
- Provide reusable, composable UI primitives and patterns.
- Keep API surfaces predictable and easy to consume from external projects.
- Keep styling consistent via shared theme tokens and CSS.
- Ensure packaging/publishing works reliably for npm consumers.

## Stack
- React 19
- Vite (library build)
- ESLint
- npm publishing

## Repository Structure
- `src/lib`: library source code.
- `src/lib/data-entry`: form/data input components.
- `src/lib/surfaces`: visual surface components (cards, tabs, tables, etc.).
- `src/lib/overlay`: layered UI (modal, drawer, tooltip, popover, toast, etc.).
- `src/lib/layout`: layout primitives and helpers.
- `src/lib/typography`: typography and icons (`Text`, `Heading`, `I`).
- `src/lib/codeblock`: optional CodeBlock entrypoint.
- `src/App`: showcase app used for examples and docs pages.
- `src/App/Pages`: one docs page per component/module.
- `vite.config.js`: library build config.

## Commit Style (Required)
Use this exact commit structure:

Title:
- `Type: short summary`
- Examples: `Feature: ...`, `Fix: ...`, `Refactor: ...`, `Docs: ...`, `CI: ...`

Body:
- `Scope: [area1, area2]`
- Blank line
- `Summary:`
- 2-4 short lines describing what changed and why.

Example:
```
Fix: resolve hook ordering in tooltip

Scope: [overlay, tooltip]

Summary:
This commit resolves hook ordering and event handling issues in Tooltip.
It prevents unstable behavior during conditional render paths.
This improves runtime stability and lint compliance.
```

## Branching and PR Hygiene
- Keep commits logically grouped.
- Do not mix unrelated refactors and feature changes in one commit.
- Prefer small, reviewable diffs.
- Preserve user changes; do not revert unrelated work.

## Coding Best Practices
- Prefer clear, composable component APIs.
- Keep components presentational unless state is required.
- Use controlled/uncontrolled patterns where applicable.
- Keep behavior accessible (roles, labels, keyboard interactions).
- Keep styles in component-local CSS files unless shared tokens are needed.
- Prefer ASCII-only edits unless file requires otherwise.

## Styling Guidelines
- Reuse theme tokens from `src/lib/theme.css`.
- Avoid one-off hardcoded colors when a token exists.
- Keep spacing and alignment consistent across docs and components.
- Avoid layout hacks that create unexpected overflow or excessive page height.

## Docs App Rules
- Add/update a page under `src/App/Pages` for new public components.
- Register pages in `src/App/Pages/index.jsx`.
- Use the shared docs helpers in `src/App/Pages/components/DocsBits.jsx`.

## Export Rules
- Public exports must be added to:
- component-level `index.js`
- `src/lib/index.js` barrel

Do not leave orphan components unexported if they are intended public API.

## Lint and Validation
Before finalizing work:
- Run `npm run lint`.
- Run `npm run build` when changing packaging/bundling logic.
- If build cannot run due environment restrictions, state that explicitly.

## Publishing and CI/CD
- npm release uses GitHub Actions and `NPM_TOKEN`.
- GitHub Pages and GitLab Pages concerns should remain separated unless explicitly requested.
- Keep workflow names/descriptions explicit and minimal.

## Safety Rules
- Never run destructive git commands unless explicitly requested.
- Do not delete/revert unrelated files.
- If filesystem locks or permissions block actions, report clearly and use safe fallback.

## Agent Behavior Expectations
- Be direct and pragmatic.
- Explain assumptions briefly.
- Prefer implementation over speculation.
- When blocked, provide next concrete action.
