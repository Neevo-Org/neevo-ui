import fs from 'node:fs/promises'
import path from 'node:path'

const rootDir = process.cwd()
const docsRoot = path.join(rootDir, 'docs', 'pages')
const rawRoot = path.join(rootDir, 'public', 'raw')

function toIdFromPath(relativeFilePath) {
  const withoutExt = relativeFilePath.replace(/\.(md|mdx)$/i, '')
  const segments = withoutExt.split(path.sep)
  const stem = segments[segments.length - 1]
  if (stem === '_self') {
    return (segments[segments.length - 2] || 'index').toLowerCase()
  }
  return stem.toLowerCase()
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(full)
      return entry.isFile() && (entry.name.toLowerCase().endsWith('.md') || entry.name.toLowerCase().endsWith('.mdx')) ? [full] : []
    }),
  )
  return files.flat()
}

function extractMetaId(source) {
  const match = source.match(/id\s*:\s*['\"]([^'\"]+)['\"]/)
  return match ? match[1].trim().toLowerCase() : null
}

async function main() {
  const mdxFiles = await walk(docsRoot)
  await fs.mkdir(rawRoot, { recursive: true })

  await Promise.all(
    mdxFiles.map(async (filePath) => {
      const source = await fs.readFile(filePath, 'utf8')
      const relativePath = path.relative(docsRoot, filePath)
      const fallbackId = toIdFromPath(relativePath)
      const id = extractMetaId(source) || fallbackId
      const outPath = path.join(rawRoot, `${id}.md`)
      await fs.writeFile(outPath, source, 'utf8')
    }),
  )

  console.log(`Generated ${mdxFiles.length} raw docs in ${path.relative(rootDir, rawRoot)}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
