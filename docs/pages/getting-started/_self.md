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

## Fonts and Icons

Neevo UI does not bundle Google fonts/icons by default. Add the fonts/icons you want in your app.

### Option A: in `index.html`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined&display=swap"
/>
```

### Option B: in your app CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap');
```

## Why MDX Here

- Docs are stored as local files in the repo.
- Agents can parse and update them without reverse-engineering JSX pages.
- You can still embed live React examples when needed.
