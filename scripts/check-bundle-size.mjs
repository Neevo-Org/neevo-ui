import { statSync } from 'node:fs'

const KB = 1024

const budgets = [
  { path: 'dist/neevo-ui.js', maxBytes: 80 * KB },
  { path: 'dist/neevo-ui.cjs', maxBytes: 60 * KB },
  { path: 'dist/neevo-ui.css', maxBytes: 45 * KB },
  { path: 'dist/codeblock.js', maxBytes: 10 * KB },
  { path: 'dist/codeblock.cjs', maxBytes: 10 * KB },
]

const results = budgets.map((budget) => {
  let size = 0
  try {
    size = statSync(budget.path).size
  } catch (error) {
    throw new Error(`Missing build artifact: ${budget.path}`)
  }

  return { ...budget, size, ok: size <= budget.maxBytes }
})

let hasError = false
for (const result of results) {
  const status = result.ok ? 'OK' : 'FAIL'
  const sizeKb = (result.size / KB).toFixed(2)
  const maxKb = (result.maxBytes / KB).toFixed(2)
  console.log(`[size-check] ${status} ${result.path} (${sizeKb} KB / ${maxKb} KB)`)
  if (!result.ok) hasError = true
}

if (hasError) {
  console.error('[size-check] Bundle size budgets exceeded.')
  process.exit(1)
}

console.log('[size-check] All bundle size budgets are within limits.')
