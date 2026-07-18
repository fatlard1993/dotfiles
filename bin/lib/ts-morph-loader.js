// Shared ts-morph loader — resolves the package from local node_modules or
// global npm root, with a clear error if neither is found.

const path = require('path')
const fs = require('fs')
const { logError } = require('./ctx-log.js')

function requireTsMorph() {
  const local = path.join(__dirname, '..', '..', 'node_modules', 'ts-morph')
  if (fs.existsSync(local)) return require(local)
  try {
    const { execSync } = require('child_process')
    const root = execSync('npm root -g 2>/dev/null', { encoding: 'utf8' }).trim()
    if (fs.existsSync(path.join(root, 'ts-morph'))) return require(path.join(root, 'ts-morph'))
  } catch {}
  logError('ts-morph not found — run: bun install in ~/.dotfiles/bin/')
  process.exit(1)
}

module.exports = { requireTsMorph }
