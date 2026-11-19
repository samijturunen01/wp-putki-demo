import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Windows: a lower-case drive letter in the cwd ("c:\…") can make Vite resolve two copies of
// React. Normalise it before anything is resolved.
if (/^[a-z]:/.test(process.cwd())) process.chdir(process.cwd()[0].toUpperCase() + process.cwd().slice(1))

// GitHub Pages project site lives under /<repo>/. Override with VITE_BASE_PATH
// (e.g. "/" when the site moves to the customer's own domain).
const base = process.env.VITE_BASE_PATH || '/wp-putki-demo/'

export default defineConfig({
  root: process.cwd(),
  plugins: [react(), tailwindcss()],
  base,
  build: {
    target: 'es2022',
  },
})
