/**
 * Minimal static server that mimics GitHub Pages: serves dist/ under the
 * repository base path, redirects /dir → /dir/, resolves index.html files and
 * falls back to 404.html with a 404 status. Usage: node scripts/serve-dist.mjs [port]
 */
import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'

const port = Number(process.argv[2] || 4331)
const base = (process.env.VITE_BASE_PATH || '/wp-putki-demo/').replace(/\/$/, '')
const root = path.resolve('dist')
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
}

async function tryFile(p) {
  try {
    const st = await fs.stat(p)
    if (st.isDirectory()) return tryFile(path.join(p, 'index.html'))
    return p
  } catch {
    return null
  }
}

http
  .createServer(async (req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (url === '/') {
      res.writeHead(302, { Location: base + '/' })
      return res.end()
    }
    if (!url.startsWith(base)) {
      res.writeHead(404)
      return res.end('Not found')
    }
    const rel = url.slice(base.length) || '/'
    const full = path.join(root, rel)
    if (!full.startsWith(root)) {
      res.writeHead(403)
      return res.end()
    }
    const file = await tryFile(full)
    if (file && !rel.endsWith('/') && file.endsWith('index.html') && !full.endsWith('.html')) {
      res.writeHead(301, { Location: url + '/' })
      return res.end()
    }
    if (file) {
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
      return res.end(await fs.readFile(file))
    }
    res.writeHead(404, { 'Content-Type': types['.html'] })
    res.end(await fs.readFile(path.join(root, '404.html')))
  })
  .listen(port, '127.0.0.1', () => console.log(`dist served at http://127.0.0.1:${port}${base}/`))
