import { useEffect, useState } from 'react'
import './App.css'
import {
  Button,
  Content,
  Heading,
  I,
  Page,
  PageBody,
  PageHeader,
  Row,
  Sidebar,
  Text,
  ThemeProvider,
  Column,
} from '../lib'
import { PAGE_LIST, getPageFromHash, renderPage } from './Pages'

function getInitialMode() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const saved = window.localStorage.getItem('nv-docs-mode')
  if (saved === 'light' || saved === 'dark') {
    return saved
  }

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  return 'light'
}

function App() {
  const [page, setPage] = useState(getPageFromHash())
  const [mode, setMode] = useState(getInitialMode)

  useEffect(() => {
    function onHashChange() {
      setPage(getPageFromHash())
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('nv-docs-mode', mode)
  }, [mode])

  const current = PAGE_LIST.find((p) => p.id === page) ?? PAGE_LIST[0]

  return (
    <ThemeProvider mode={mode}>
      <Page className="docs-page">
        <PageHeader sticky className="docs-header">
          <Row justify="space-between" align="center">
            <Column gap={2}>
              <Text className="docs-eyebrow" as="span" size="xs" weight="semibold" tone="muted">Neevo UI</Text>
              <Heading as="h1" size="md">Component Showcase</Heading>
            </Column>
            <Row align="center">
              <Text size="sm" tone="muted">{current.label}</Text>
              <Button
                variant="secondary"
                className="docs-mode-toggle"
                onClick={() => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <I>{mode === 'dark' ? 'light_mode' : 'dark_mode'}</I>
                {mode === 'dark' ? 'Light' : 'Dark'}
              </Button>
            </Row>
          </Row>
        </PageHeader>

        <PageBody sidebarWidth={300}>
          <Sidebar className="docs-sidebar">
            <Text size="sm" tone="muted">Use the navigation to explore each component module.</Text>
            <nav className="docs-nav">
              {PAGE_LIST.map((item) => (
                <a key={item.id} href={`#/${item.id}`} className={item.id === page ? 'docs-nav-link docs-nav-link--active' : 'docs-nav-link'}>
                  {item.label}
                </a>
              ))}
            </nav>
          </Sidebar>

          <Content className="docs-main" padding={20}>
            <Column className="docs-main-header" gap={6}>
              <Heading as="h1" size="xl">{current.label}</Heading>
              <Text tone="muted">Production-ready usage guidelines, API details, and implementation examples.</Text>
            </Column>
            {renderPage(page)}
          </Content>
        </PageBody>
      </Page>
    </ThemeProvider>
  )
}

export default App
