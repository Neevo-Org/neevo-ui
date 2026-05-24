# Changelog

All notable changes to this project will be documented in this file.

## Neevo UI v1.1.0 - Shell And Mobile Navigation Upgrade

### Added
- Added built-in mobile sidebar overlay behavior in `AppSidebar`, including backdrop dismissal and `Escape` to close.
- Added an `actions` slot to `AppSidebarBrand` so apps can place mobile controls in the brand row without custom wrapper hacks.
- Added library-level WebKit scrollbar styling driven by theme tokens.
- Added dark-mode app background gradients for the `mint`, `ocean`, and `sunset` themes.
- Added library-owned shell background rendering in `AppShell` so consumers do not need page-level background workarounds.
- Added mobile-friendly shell layout handling that keeps the sidebar trigger visible while the navigation itself opens as a full-screen layer.

### Fixed
- Fixed dark mode so shell-level backgrounds follow the active theme instead of staying on a light app gradient.
- Fixed mobile navigation so the brand row stays visible when closed and expands into a full-screen menu when opened.
- Fixed tall mobile sidebar content so the navigation area scrolls while the footer stays anchored at the bottom of the overlay.
- Fixed `AppShell` stage overflow so heavy content scrolls naturally instead of compressing the main content region.

## Neevo UI v1.0.1 - Initial Release

### What's Included

- Ready-to-use components for common product needs
- Clear component groups by purpose: Data Entry, Layout, Overlay, Surfaces, Typography
- Shared theming foundation for visual consistency
- Docs showcase to explore components quickly

### Component Overview

- Data Entry: `Buttons`, `inputs`, `selectors`, `date picker`, `sliders`, `tag input`
- Layout: `Page structure`, `grids`, `rows/columns`, `navigation helpers`
- Overlay: `Modals`, `drawers`, `tooltips`, `popovers`, `menus`, `command palette`, `toasts`
- Surfaces: `Cards`, `tables`, `tabs`, `accordions`, `skeletons`, `empty states`, `pagination`, `timelines`, `progress`, `avatars`, `badges`
- Typography: `Text`, `headings`, `icons`
