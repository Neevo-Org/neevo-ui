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
import { MDX_NAV_TREE, getMdxAncestors } from '../../docs/registry'

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

function collectFolderKeys(nodes, output = []) {
  nodes.forEach((node) => {
    if (node.type === 'folder') {
      output.push(node.key)
      collectFolderKeys(node.children, output)
    }
  })
  return output
}

const ALL_FOLDER_KEYS = collectFolderKeys(MDX_NAV_TREE)

function App() {
  const [page, setPage] = useState(getPageFromHash())
  const [mode, setMode] = useState(getInitialMode)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [openFolders, setOpenFolders] = useState(
    Object.fromEntries(ALL_FOLDER_KEYS.map((key) => [key, true])),
  )

  useEffect(() => {
    function onHashChange() {
      const nextPage = getPageFromHash()
      setPage(nextPage)
      setMobileNavOpen(false)
      const ancestors = getMdxAncestors(nextPage)
      if (!ancestors.length) return

      setOpenFolders((prev) => {
        const next = { ...prev }
        ancestors.forEach((key) => {
          next[key] = true
        })
        return next
      })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('nv-docs-mode', mode)
    const docsPage = document.querySelector('.docs-page')
    const themedBackground = docsPage
      ? getComputedStyle(docsPage).getPropertyValue('--nv-color-bg').trim()
      : ''
    document.body.style.background = themedBackground || (mode === 'dark' ? '#111827' : '#f9fafb')

    return () => {
      document.body.style.background = ''
    }
  }, [mode])

  const current = PAGE_LIST.find((p) => p.id === page) ?? PAGE_LIST[0]

  function toggleFolder(key) {
    setOpenFolders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  function renderNavNode(node, depth = 0) {
    if (node.type === 'page') {
      return (
        <a
          key={node.id}
          href={`#/${node.id}`}
          className={node.id === page ? 'docs-nav-link docs-nav-link--active docs-nav-link--nested' : 'docs-nav-link docs-nav-link--nested'}
          style={{ '--docs-nav-depth': depth }}
        >
          {node.label}
        </a>
      )
    }

    const hasChildren = node.children.length > 0
    const isOpen = openFolders[node.key] ?? true
    const folderLinkClasses = node.pageId === page
      ? 'docs-nav-link docs-nav-link--active docs-nav-link--folder'
      : 'docs-nav-link docs-nav-link--folder'

    return (
      <section key={node.key} className="docs-nav-folder" style={{ '--docs-nav-depth': depth }}>
        <div className="docs-nav-folder-row">
          {node.pageId ? (
            <a href={`#/${node.pageId}`} className={folderLinkClasses}>{node.label}</a>
          ) : (
            <Text as="span" size="sm" weight="semibold" tone="muted" className="docs-nav-folder-label">{node.label}</Text>
          )}
          {hasChildren ? (
            <button
              type="button"
              className={isOpen ? 'docs-nav-chevron docs-nav-chevron--open' : 'docs-nav-chevron'}
              aria-label={isOpen ? `Collapse ${node.label}` : `Expand ${node.label}`}
              onClick={() => toggleFolder(node.key)}
            >
              <I>expand_more</I>
            </button>
          ) : null}
        </div>
        {hasChildren && isOpen ? (
          <div className="docs-nav-children">
            {node.children.map((child) => renderNavNode(child, depth + 1))}
          </div>
        ) : null}
      </section>
    )
  }

  return (
    <ThemeProvider mode={mode}>
      <Page className="docs-page">
        <PageHeader className="docs-header">
          <Row justify="space-between" align="center" className="docs-header-row">
            <Column gap={2}>
              <Text className="docs-eyebrow" as="span" size="xs" weight="semibold" tone="muted">Neevo UI</Text>
              <Heading as="h1" size="md">Component Showcase</Heading>
            </Column>
            <Row align="center" className="docs-header-actions">
              <button
                type="button"
                className="docs-mobile-nav-toggle"
                aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen((prev) => !prev)}
              >
                <I>{mobileNavOpen ? 'close' : 'menu'}</I>
              </button>
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
          <Sidebar className={mobileNavOpen ? 'docs-sidebar' : 'docs-sidebar docs-sidebar--mobile-closed'}>
            <Text size="sm" tone="muted">Use the navigation to explore each component module.</Text>
            <nav className="docs-nav">
              {MDX_NAV_TREE.map((node) => renderNavNode(node))}
            </nav>
          </Sidebar>

          <Content className="docs-main" padding={20}>
            <div className="docs-content-main">
              {renderPage(page)}
            </div>
          </Content>
        </PageBody>
      </Page>
    </ThemeProvider>
  )
}

export default App
