import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(fileURLToPath(new URL('..', import.meta.url)))
const distDir = resolve(rootDir, 'dist')
const typesDir = resolve(rootDir, 'types')

await mkdir(distDir, { recursive: true })
await copyFile(resolve(typesDir, 'index.d.ts'), resolve(distDir, 'index.d.ts'))
await copyFile(resolve(typesDir, 'codeblock.d.ts'), resolve(distDir, 'codeblock.d.ts'))
