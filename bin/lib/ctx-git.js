// Shared git access for ctx node tools. Every read is pinned to a ref and run from the repo root,
// and every skipped or capped step is recorded as a gap.
// Exit codes for tools built on this: 0 ran in full, 1 ran with gaps, 2 could not run.

const { execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const GIT_BASE_ARGS = ['-c', 'core.quotePath=false']
const CODE_EXTS = ['ts', 'tsx', 'mts', 'cts', 'js', 'jsx', 'mjs', 'cjs']

function fail(message) {
  console.error(message)
  process.exit(2)
}

let repoRoot
try {
  repoRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
} catch {
  fail('not a git repository')
}
const EXEC_OPTS = { cwd: repoRoot, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }

const gaps = []
const noted = new Set()

function gap(signal, note) {
  const key = `${signal} ${note}`
  if (noted.has(key)) return
  noted.add(key)
  gaps.push({ signal, note })
}

/** Prints recorded gaps as `⚠ gap[<signal>]: <note>` and sets exit code 1 when there are any. */
function finish() {
  for (const { signal, note } of gaps) console.log(`⚠ gap[${signal}]: ${note}`)
  if (gaps.length > 0) process.exitCode = 1
}

function gitTry(args) {
  try {
    return execFileSync('git', [...GIT_BASE_ARGS, ...args], EXEC_OPTS)
  } catch {
    return null
  }
}

function git(args, signal) {
  const out = gitTry(args)
  if (out === null) {
    gap(signal, `git ${args[0]} failed; results derived from it may be missing.`)
    return ''
  }
  return out
}

function requireRefs(...refs) {
  for (const ref of refs) {
    if (!ref || ref.startsWith('-')) fail(`not a ref: ${ref ?? '(missing)'}`)
    if (gitTry(['rev-parse', '--verify', '--quiet', `${ref}^{commit}`]) === null) fail(`ref not found: ${ref}`)
  }
}

function showAt(ref, file, signal) {
  const out = gitTry(['show', `${ref}:${file}`])
  if (out === null) gap(signal, `could not read ${file} at ${ref}; it was not scanned.`)
  return out
}

function grepAt(ref, flags, pattern, dir, signal) {
  const prefix = !dir || dir === '.' ? '' : `${dir.replace(/\/$/, '')}/`
  const pathspecs = CODE_EXTS.map((ext) => `:(top,glob)${prefix}**/*.${ext}`)
  try {
    return execFileSync('git', [...GIT_BASE_ARGS, 'grep', '-P', ...flags, '-e', pattern, ref, '--', ...pathspecs], EXEC_OPTS)
      .split('\n')
      .filter(Boolean)
      .map((l) => l.slice(ref.length + 1))
  } catch (e) {
    if (e.status !== 1) gap(signal, 'git grep failed; a repo-wide search may be missing.')
    return []
  }
}

function capped(items, cap, what, signal) {
  if (items.length > cap) gap(signal, `${what}: examined the first ${cap} of ${items.length}; the rest are unexamined.`)
  return items.slice(0, cap)
}

function diffRange(base, head, signal) {
  if (gitTry(['merge-base', base, head])?.trim()) return `${base}...${head}`
  gap(signal, `no merge-base for ${base} and ${head}; compared the two trees directly.`)
  return `${base}..${head}`
}

const isSource = (f) => !f.endsWith('.d.ts') && /\.(ts|tsx|js|jsx|mjs)$/.test(f)
const isTest = (f) => /\.(test|spec)\.[cm]?[jt]sx?$/.test(f)

/** Changed, non-deleted, non-test source files. NUL-separated, so no path is quoted or lost. */
function changedSource(range, signal) {
  const fields = git(['diff', '-z', '--name-status', '--no-renames', range], signal).split('\0')
  const files = []
  for (let i = 0; i + 1 < fields.length; i += 2) {
    if (fields[i] !== 'D' && isSource(fields[i + 1]) && !isTest(fields[i + 1])) files.push(fields[i + 1])
  }
  return files
}

/** Added lines with new-file line numbers. */
function addedLines(range, file, signal) {
  const out = []
  let newLine = 0
  for (const l of git(['diff', range, '--unified=0', '--', `:(top,literal)${file}`], signal).split('\n')) {
    const m = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(l)
    if (m) {
      newLine = Number(m[1])
    } else if (l.startsWith('+++')) {
      continue
    } else if (l.startsWith('+')) {
      out.push({ line: newLine, text: l.slice(1) })
      newLine += 1
    } else if (!l.startsWith('-') && !l.startsWith('\\')) {
      newLine += 1
    }
  }
  return out
}

/** The repo's ctx settings, or {} when it has none. A file that will not parse stops the run. */
function repoConfig() {
  const url = gitTry(['remote', 'get-url', 'origin'])?.trim() ?? ''
  const m = /[:/]([^/:]+)\/([^/]+?)(?:\.git)?$/.exec(url)
  if (!m) return {}
  const file = path.join(process.env.CTX_CONFIG_DIR || path.join(process.env.HOME, '.priv-config', 'ctx'), `${m[1]}-${m[2]}.json`)
  if (!fs.existsSync(file)) return {}
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (e) {
    fail(`repo config ${file} is not valid JSON: ${e.message}`)
  }
}

module.exports = { gap, finish, fail, git, gitTry, requireRefs, showAt, grepAt, capped, diffRange, changedSource, addedLines, repoConfig, isSource, isTest }
