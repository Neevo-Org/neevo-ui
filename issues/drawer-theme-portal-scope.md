# Drawer portal ignores ThemeProvider scope

## Summary
`Drawer` renders via `createPortal(..., document.body)`, so it mounts outside the nearest `ThemeProvider` wrapper. In apps that theme via scoped wrappers, drawer surfaces keep light tokens unless the app also themes `body`.

## Current behavior
- `ThemeProvider` wraps app content (`.nv-theme[data-nv-mode=...]`).
- `Drawer` is portaled to `document.body`.
- Drawer background/colors do not follow active scoped theme mode.

## Expected behavior
`Drawer` should be able to inherit theme tokens from the same tree scope as the triggering component.

## Reproduction
1. Wrap app in `<ThemeProvider mode="dark">` (not on `body`).
2. Open `Drawer`.
3. Observe drawer still uses light theme colors.

## Proposed fix
Add a configurable portal mount target for overlay components (at minimum `Drawer`):
- `portalContainer?: HTMLElement | (() => HTMLElement | null)`
- Default remains `document.body` for backwards compatibility.
- Consumers can pass nearest `.nv-theme` container.

## Notes
Workaround in consumer apps is to mirror theme attributes onto `document.body`, but that breaks encapsulation and should not be required.
