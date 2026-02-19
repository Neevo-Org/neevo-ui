/* eslint-disable react-refresh/only-export-components */
import { mdxComponents } from './mdx-components'

const docModules = import.meta.glob('./pages/**/*.md', { eager: true })
const docRawModules = import.meta.glob('./pages/**/*.md', { query: '?raw', import: 'default', eager: true })

const ROOT_ORDER = {
  'getting-started': 10,
  extras: 20,
  components: 30,
}

const COMPONENT_GROUP_ORDER = {
  codeblock: 10,
  'data-entry': 20,
  layout: 30,
  overlay: 40,
  surfaces: 50,
  typography: 60,
}

const PAGE_ORDER = {
  button: 10,
  input: 20,
  textarea: 30,
  checkbox: 40,
  switch: 50,
  'radio-group': 60,
  select: 70,
  calendar: 80,
  slider: 90,
  'tag-input': 100,
  'layout-system': 10,
  breadcrumbs: 20,
  stepper: 30,
  divider: 40,
  'theme-provider': 50,
  tooltip: 10,
  popover: 20,
  modal: 30,
  drawer: 40,
  toast: 50,
  menu: 60,
  'command-palette': 70,
  card: 10,
  table: 20,
  tabs: 30,
  accordion: 40,
  'empty-state': 50,
  skeleton: 60,
  pagination: 70,
  timeline: 80,
  progress: 90,
  avatar: 100,
  badge: 110,
  text: 10,
  icons: 20,
  'docs-authoring': 10,
  row: 15,
}

function toTitle(value) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getPathParts(modulePath) {
  return modulePath.replace('./pages/', '').split('/')
}

function getFileStem(filename) {
  return filename.replace(/\.md$/i, '')
}

function extractHeading(raw, fallback) {
  const heading = raw.match(/^#\s+(.+)$/m)?.[1]?.trim()
  return heading || fallback
}

function extractDescription(raw) {
  const lines = raw.split(/\r?\n/)
  let inCode = false
  for (const line of lines) {
    const value = line.trim()
    if (value.startsWith('```')) {
      inCode = !inCode
      continue
    }
    if (inCode || !value) continue
    if (value.startsWith('#')) continue
    if (value.startsWith('|')) continue
    return value
  }
  return ''
}

function getOrder({ folderParts, isSelf, stem }) {
  if (isSelf) {
    const folder = folderParts[folderParts.length - 1] ?? stem
    if (ROOT_ORDER[folder] !== undefined) return ROOT_ORDER[folder]
    if (COMPONENT_GROUP_ORDER[folder] !== undefined) return COMPONENT_GROUP_ORDER[folder]
    return PAGE_ORDER[folder] ?? 999
  }

  if (folderParts[0] === 'components' && folderParts.length === 1) {
    return COMPONENT_GROUP_ORDER[stem] ?? PAGE_ORDER[stem] ?? 999
  }

  return PAGE_ORDER[stem] ?? 999
}

function buildPageEntries() {
  return Object.entries(docModules)
    .map(([modulePath, module]) => {
      const Content = module.default
      if (typeof Content !== 'function') return null

      const pathParts = getPathParts(modulePath)
      const filename = pathParts[pathParts.length - 1]
      const stem = getFileStem(filename)
      const isSelf = stem === '_self'
      const folderParts = pathParts.slice(0, -1)
      const id = (isSelf ? folderParts[folderParts.length - 1] : stem).toLowerCase()
      const raw = typeof docRawModules[modulePath] === 'string' ? docRawModules[modulePath] : ''
      const label = extractHeading(raw, toTitle(id))
      const description = extractDescription(raw)

      return {
        id,
        label,
        description,
        order: getOrder({ folderParts, isSelf, stem }),
        Content,
        isSelf,
        folderParts,
        modulePath,
      }
    })
    .filter(Boolean)
}

const docEntries = buildPageEntries()
const DOC_PAGE_MAP = Object.fromEntries(docEntries.map((entry) => [entry.id, entry]))

function createFolderNode(key, segment) {
  return {
    type: 'folder',
    key,
    label: toTitle(segment),
    order: 999,
    pageId: null,
    description: '',
    children: [],
  }
}

function buildNavTree(entries) {
  const root = { children: [] }
  const folderMap = new Map([['', root]])
  const pageAncestors = {}

  function getFolder(pathParts) {
    let key = ''
    let parent = root

    pathParts.forEach((segment) => {
      key = key ? `${key}/${segment}` : segment
      if (!folderMap.has(key)) {
        const folder = createFolderNode(key, segment)
        parent.children.push(folder)
        folderMap.set(key, folder)
      }
      parent = folderMap.get(key)
    })

    return parent
  }

  entries.forEach((entry) => {
    const folder = getFolder(entry.folderParts)
    const ancestors = []
    let pathAccumulator = ''
    entry.folderParts.forEach((segment) => {
      pathAccumulator = pathAccumulator ? `${pathAccumulator}/${segment}` : segment
      ancestors.push(pathAccumulator)
    })

    if (entry.isSelf) {
      folder.pageId = entry.id
      folder.label = entry.label
      folder.description = entry.description
      folder.order = entry.order
      pageAncestors[entry.id] = ancestors
      return
    }

    folder.children.push({
      type: 'page',
      key: entry.modulePath,
      id: entry.id,
      label: entry.label,
      order: entry.order,
      description: entry.description,
    })
    pageAncestors[entry.id] = ancestors
  })

  function sortNodes(nodes) {
    nodes.sort((a, b) => {
      const aOrder = typeof a.order === 'number' ? a.order : 999
      const bOrder = typeof b.order === 'number' ? b.order : 999
      if (aOrder !== bOrder) return aOrder - bOrder
      return a.label.localeCompare(b.label)
    })

    nodes.forEach((node) => {
      if (node.type === 'folder') {
        sortNodes(node.children)
      }
    })
  }

  sortNodes(root.children)

  return { tree: root.children, pageAncestors }
}

const { tree: MDX_NAV_TREE, pageAncestors: MDX_PAGE_ANCESTORS } = buildNavTree(docEntries)

export { MDX_NAV_TREE }

export const MDX_PAGE_LIST = docEntries.map(({ id, label, description, order }) => ({
  id,
  label,
  description,
  order,
}))

export function getMdxPageEntry(pageId) {
  return DOC_PAGE_MAP[pageId] ?? null
}

export function getMdxAncestors(pageId) {
  return MDX_PAGE_ANCESTORS[pageId] ?? []
}

export function renderMdxPage(pageId) {
  const entry = getMdxPageEntry(pageId)
  if (!entry) return null
  const Content = entry.Content

  return (
    <article className="docs-mdx">
      <Content components={mdxComponents} />
    </article>
  )
}
