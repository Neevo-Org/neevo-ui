# Getting Started

Neevo UI is a modular React component library. This page is authored in **MDX**, so it lives as source-controlled documentation that both humans and agents can read directly.

## Install

```bash
npm i neevo-ui
```

## Use Components

```tsx
import { Button, ThemeProvider } from 'neevo-ui'
import 'neevo-ui/style.css'

export function Example() {
  return (
    <ThemeProvider mode="light">
      <Button>Click me</Button>
    </ThemeProvider>
  )
}
```

## Why MDX Here

- Docs are stored as local files in the repo.
- Agents can parse and update them without reverse-engineering JSX pages.
- You can still embed live React examples when needed.
