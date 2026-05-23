[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![React][react-src]][react-href]
[![Vite][vite-src]][vite-href]
<img src="https://raw.githubusercontent.com/Neevo-Org/neevo-ui/v0.1.0/public/neevo_ui_dark.svg#gh-dark-mode-only" alt="Neevo UI" width="420" />
<img src="https://raw.githubusercontent.com/Neevo-Org/neevo-ui/v0.1.0/public/neevo_ui_light.svg#gh-light-mode-only" alt="Neevo UI" width="420" />

# Neevo UI

Neevo UI is a modular React component library built with Vite. It ships reusable primitives for forms, layout, overlays, surfaces, typography, and a separate `codeblock` entrypoint.

## Installation

```bash
npm install neevo-ui react react-dom
```

## Usage

```jsx
import 'neevo-ui/style.css'
import { Button, Card, CardBody, CardHeader, Text } from 'neevo-ui'

export function Example() {
  return (
    <Card>
      <CardHeader>
        <Text as="h2" weight="semibold">Neevo UI</Text>
      </CardHeader>
      <CardBody>
        <Button>Action</Button>
      </CardBody>
    </Card>
  )
}
```

## Package Surface

- `data-entry`: Button, Calendar, Checkbox, Input, RadioGroup, Select, Slider, Switch, TagInput, TextArea
- `layout`: AppShell, Breadcrumbs, Column, Container, Content, Divider, Grid, Page, PageBody, PageHeader, Row, Sidebar, Stepper, ThemeProvider
- `overlay`: CommandPalette, Drawer, Menu, Modal, Popover, Toast, Tooltip
- `surfaces`: Accordion, Avatar, Badge, Card, EmptyState, Pagination, Progress, Skeleton, Table, Tabs, Timeline
- `typography`: Text, Heading, I
- `codeblock`: `import { CodeBlock } from 'neevo-ui/codeblock'`

## Development

```bash
npm run lint
npm run build
npm run build:docs
```

## Publishing Notes

- The npm package publishes only the `dist/` output.
- The release workflow publishes with npm provenance.
- Type declarations are included for the root package and the `codeblock` subpath.

## License

Licensed under the GNU General Public License v3.0 (GPL-3.0).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/neevo-ui.svg?style=flat
[npm-version-href]: https://www.npmjs.com/package/neevo-ui

[npm-downloads-src]: https://img.shields.io/npm/dm/neevo-ui.svg?style=flat
[npm-downloads-href]: https://www.npmjs.com/package/neevo-ui

[license-src]: https://img.shields.io/badge/license-GPL--3.0-blue.svg?style=flat
[license-href]: https://opensource.org/licenses/GPL-3.0

[react-src]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000
[react-href]: https://react.dev

[vite-src]: https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff
[vite-href]: https://vite.dev
