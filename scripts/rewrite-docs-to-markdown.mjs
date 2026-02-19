import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const pagesRoot = path.join(root, 'docs', 'pages')
const reactPagesRoot = path.join(root, 'docs', 'react-pages')

function normalizeId(name) {
  return name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}

function toTitle(value) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return /\.(md|mdx)$/i.test(entry.name) ? [full] : []
  }))
  return files.flat()
}

async function buildReactPageMap() {
  const map = new Map()
  try {
    const files = await fs.readdir(reactPagesRoot)
    for (const file of files) {
      if (!file.endsWith('DocPage.jsx')) continue
      const base = file.replace(/DocPage\.jsx$/, '')
      map.set(normalizeId(base), path.join(reactPagesRoot, file))
    }
  } catch {}
  return map
}

function parseMeta(content) {
  const id = content.match(/id\s*:\s*'([^']+)'/)?.[1]?.trim() ?? null
  const label = content.match(/label\s*:\s*'([^']+)'/)?.[1]?.trim() ?? null
  const description = content.match(/description\s*:\s*'([^']+)'/)?.[1]?.trim() ?? null
  return { id, label, description }
}

function stripMetaBlock(content) {
  return content
    .replace(/export\s+const\s+meta\s*=\s*\{[\s\S]*?\}\s*\n*/m, '')
    .trim()
}

function parseReactDocToMarkdown(source, label, description) {
  const lines = []
  lines.push(`# ${label}`)
  lines.push('')

  const descMatch = source.match(/<Text[^>]*tone=["']muted["'][^>]*>([\s\S]*?)<\/Text>/)
  const intro = descMatch?.[1]?.replace(/\s+/g, ' ').trim() || description || ''
  if (intro) {
    lines.push(intro)
    lines.push('')
  }

  const sectionRegex = /<Section\s+title="([^"]+)"\s*>([\s\S]*?)<\/Section>/g
  let sectionMatch
  while ((sectionMatch = sectionRegex.exec(source)) !== null) {
    const sectionTitle = sectionMatch[1]
    const sectionBody = sectionMatch[2]

    lines.push(`## ${sectionTitle}`)
    lines.push('')

    const exampleRegex = /<Example[\s\S]*?title="([^"]+)"[\s\S]*?code=\{`([\s\S]*?)`\}[\s\S]*?<\/Example>/g
    let exampleMatch
    let hasExamples = false
    while ((exampleMatch = exampleRegex.exec(sectionBody)) !== null) {
      hasExamples = true
      const exTitle = exampleMatch[1]
      const code = exampleMatch[2].replace(/\\n/g, '\n').trim()
      lines.push(`### ${exTitle}`)
      lines.push('')
      lines.push('```tsx')
      lines.push(code)
      lines.push('```')
      lines.push('')
    }

    const rowsMatch = sectionBody.match(/rows=\{\[([\s\S]*?)\]\}/m)
    if (rowsMatch) {
      const rowsBlock = rowsMatch[1]
      const rowRegex = /\{\s*prop:\s*'([^']*)',\s*type:\s*'([^']*)',\s*defaultValue:\s*'([^']*)',\s*description:\s*'([^']*)'\s*\}/g
      const rows = []
      let rowMatch
      while ((rowMatch = rowRegex.exec(rowsBlock)) !== null) {
        rows.push({
          prop: rowMatch[1],
          type: rowMatch[2],
          defaultValue: rowMatch[3],
          description: rowMatch[4],
        })
      }

      if (rows.length > 0) {
        lines.push('| Prop | Type | Default | Description |')
        lines.push('| --- | --- | --- | --- |')
        rows.forEach((row) => {
          const safe = (value) => value.replace(/\|/g, '\\|')
          lines.push(`| ${safe(row.prop)} | ${safe(row.type)} | ${safe(row.defaultValue)} | ${safe(row.description)} |`)
        })
        lines.push('')
      }
    }

    if (!hasExamples && !rowsMatch) {
      lines.push('Content migration in progress.')
      lines.push('')
    }
  }

  return lines.join('\n').trim() + '\n'
}

async function main() {
  const reactMap = await buildReactPageMap()
  const files = await walk(pagesRoot)

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    const meta = parseMeta(content)
    const stem = path.basename(file).replace(/\.(md|mdx)$/i, '')
    const extOutPath = file.replace(/\.(md|mdx)$/i, '.md')

    let output

    const wrappedImportMatch = content.match(/import\s+\{\s*([A-Za-z0-9_]+)\s*\}\s+from\s+['"][^'"]*react-pages\/([A-Za-z0-9_]+DocPage)['"]/)

    if (wrappedImportMatch && meta.id) {
      const componentBase = wrappedImportMatch[2].replace(/DocPage$/, '')
      const sourcePath = reactMap.get(normalizeId(componentBase))
      if (sourcePath) {
        const source = await fs.readFile(sourcePath, 'utf8')
        output = parseReactDocToMarkdown(source, meta.label ?? toTitle(meta.id), meta.description ?? '')
      }
    }

    if (!output && meta.id) {
      const sourcePath = reactMap.get(normalizeId(meta.id))
      if (sourcePath) {
        const source = await fs.readFile(sourcePath, 'utf8')
        output = parseReactDocToMarkdown(source, meta.label ?? toTitle(meta.id), meta.description ?? '')
      }
    }

    if (!output) {
      output = stripMetaBlock(content)
      if (stem === '_self' && !output.startsWith('# ')) {
        const folderName = path.basename(path.dirname(file))
        output = `# ${toTitle(folderName)}\n\n${output}`.trim() + '\n'
      } else {
        output = output + '\n'
      }
    }

    await fs.writeFile(extOutPath, output, 'utf8')
    if (file !== extOutPath) {
      await fs.rm(file, { force: true })
    }
  }

  console.log('Converted docs pages to markdown-only .md files.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
