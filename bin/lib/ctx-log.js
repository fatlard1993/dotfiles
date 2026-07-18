// Shared logging for ctx node tools — mirrors the zsh logging conventions.
// Use for process messages only; content output stays on stdout via console.log.

const path = require('path')

const noColor       = !!process.env.NO_COLOR
const nonInteractive = !!process.env.NON_INTERACTIVE
const name = path.basename(process.argv[1] || 'ctx').replace(/\.js$/, '')

const c = (code, s) => noColor ? s : `\x1b[${code}m${s}\x1b[0m`

const logInfo    = (s) => process.stderr.write(c(34,  `[${name}] ${s}`) + '\n')
const logWarning = (s) => process.stderr.write(c(33,  `[WARNING][${name}] ${s}`) + '\n')
const logError   = (s) => process.stderr.write(c(31,  `[ERROR][${name}] ${s}`) + '\n')
const logDebug   = (s) => { if (process.env.DEBUG) process.stderr.write(c(117, `[DEBUG][${name}] ${s}`) + '\n') }
const logHuman   = (s) => { if (!nonInteractive) process.stderr.write(c(34,  `[${name}] ${s}`) + '\n') }

// simulate — use before any file write; returns true if in simulate mode (write should be skipped)
const simulate = (description) => {
  if (!process.env.SIMULATE) return false
  process.stderr.write(c(36, `[SIMULATE] ${description}`) + '\n')
  return true
}

module.exports = { logInfo, logWarning, logError, logDebug, logHuman, simulate }
