import { useEffect, useState } from 'react'
import './App.css'
import {
  AppShell,
  AppSidebar,
  AppSidebarBrand,
  AppSidebarNav,
  AppStage,
  AppStageHeader,
  Button,
  I,
  Row,
  Text,
  ThemeProvider,
} from '../lib'
import { PAGE_LIST, getPageFromHash, renderPage } from './Pages'
import { MDX_NAV_TREE, getMdxAncestors } from '../../docs/registry'

const DOCS_THEMES = ['mint', 'ocean', 'sunset']

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

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'mint'
  }

  const saved = window.localStorage.getItem('nv-docs-theme')
  return DOCS_THEMES.includes(saved) ? saved : 'mint'
}

function App() {
  const [page, setPage] = useState(getPageFromHash())
  const [mode, setMode] = useState(getInitialMode)
  const [theme, setTheme] = useState(getInitialTheme)
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
    window.localStorage.setItem('nv-docs-theme', theme)
    document.body.setAttribute('data-nv-mode', mode)
    document.body.setAttribute('data-nv-theme', theme)

    return () => {
      document.body.removeAttribute('data-nv-mode')
      document.body.removeAttribute('data-nv-theme')
    }
  }, [mode, theme])

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
    <ThemeProvider mode={mode} theme={theme}>
      <AppShell className="docs-page">
        <AppSidebar
          className="docs-sidebar"
          mobileCollapsible
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
          header={(
            <AppSidebarBrand
              className="docs-brand"
              title="Neevo UI"
              subtitle="Component Showcase"
              icon={<I>widgets</I>}
              actions={(
                <Button
                  variant="secondary"
                  size="sm"
                  className="docs-brand-toggle"
                  aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={mobileNavOpen}
                  onClick={() => setMobileNavOpen((prev) => !prev)}
                >
                  <I>{mobileNavOpen ? 'close' : 'menu'}</I>
                </Button>
              )}
            />
          )}
          footer={(
            <Row align="center" className="docs-sidebar-footer" gap={8}>
              <Row align="center" className="docs-theme-toggle" gap={6}>
                {DOCS_THEMES.map((option) => (
                  <button
                    key={option}
                    className={`docs-theme-dot docs-theme-dot--${option} ${theme === option ? 'is-active' : ''}`}
                    onClick={() => setTheme(option)}
                    aria-label={`Use ${option} theme`}
                    title={option}
                    type="button"
                  >
                    <span className="docs-theme-dot__swatch" aria-hidden="true" />
                  </button>
                ))}
              </Row>
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
          )}
        >
          <AppSidebarNav>
            <Text size="sm" tone="muted">Use the navigation to explore each component module.</Text>
            <nav className="docs-nav">
              {MDX_NAV_TREE.map((node) => renderNavNode(node))}
            </nav>
          </AppSidebarNav>
        </AppSidebar>

        <AppStage
          className="docs-main"
          header={(
            <AppStageHeader
              className="docs-header"
              eyebrow="Docs"
              title={current.label}
              description="Live component previews, tokens, and API guidance."
              actions={<Row align="center" className="docs-header-actions" />}
            />
          )}
        >
          <div className="docs-content-main">
            {renderPage(page)}
          </div>
        </AppStage>
      </AppShell>
    </ThemeProvider>
  )
}

export default App
