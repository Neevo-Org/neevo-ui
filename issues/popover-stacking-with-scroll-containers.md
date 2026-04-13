# Inline overlay stacking with scroll containers

## Problem

Several `neevo-ui` overlay primitives render inline inside the local component tree using `position: absolute`.

This currently affects at least:
- `Popover`
- `Select`
- `Menu`

In app screens with layered cards, sticky sections, or scrollable table containers, these overlays can render behind neighboring UI even when the overlay panel itself has a reasonable `z-index`.

We hit this in the Finti transactions page:
- a date-picker popover in the filter card rendered behind the transactions table
- select menus have the same underlying issue
- local page-level z-index coordination was required as a workaround

## Why this is a library issue

The current implementation makes consumers solve stacking-context conflicts page by page.

That does not scale well because:
- any parent stacking context can break the overlay
- scroll containers and sticky surfaces become fragile
- consumers need to understand surrounding layout layers just to show calendars, menus, and selects correctly
- multiple components share the same limitation, so the workaround repeats across apps

## Suggested direction

Add a portal-based overlay mode, or make portal rendering the default for floating surfaces that should escape local stacking contexts.

Possible options:
- add `portal` support to `PopoverContent`
- add portal support to `Select` menus and `MenuContent`
- add a shared overlay root for inline overlay primitives
- keep inline rendering as an opt-in mode for simple cases

## Expected outcome

Consumers should be able to place date pickers, select menus, and dropdown menus inside cards, tables, drawers, and forms without manually managing z-index relationships between sibling layout regions.
