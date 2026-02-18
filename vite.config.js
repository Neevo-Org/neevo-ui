import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    lib: {
      entry: {
        index: resolve(rootDir, 'src/lib/index.js'),
        codeblock: resolve(rootDir, 'src/lib/codeblock/index.js'),
      },
      name: 'NeevoUi',
      fileName: (format, entryName) => {
        if (entryName === 'index') {
          return `neevo-ui.${format === 'es' ? 'js' : 'cjs'}`
        }
        return `${entryName}.${format === 'es' ? 'js' : 'cjs'}`
      },
    },
    rollupOptions: {
      external: (id) =>
        id === 'react'
        || id === 'react-dom'
        || id === 'react/jsx-runtime'
        || id.startsWith('react-syntax-highlighter'),
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react-syntax-highlighter': 'ReactSyntaxHighlighter',
        },
      },
    },
  },
})
