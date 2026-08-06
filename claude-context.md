## The reach map

These ARE the dedicated tools; where they overlap a built-in, they outrank it. Route by question:

- Where is X defined / who calls X / what breaks if X changes: `ctx-where` / `ctx-refs` / `ctx-impact` (`ctx-symbol` bundles definition + usages + history in one shot)
- What does this module expose: `ctx-api`. What's dead: `ctx-dead`
- Show me part of a file with structure: `ctx-file <file> [range]` before `sed -n`
- This output is a wall: pipe it through `ctx-trim` before eyeballing
- Landing in an unfamiliar repo: `ctx-orient`. How sick is it: `ctx-health`
- What changed / does this branch have bugs: `ctx-diff` / `ctx-mr-review`
- Parse this stack trace: `ctx-stack`. Run the tests readably: `ctx-test`

## Analysis

The tools below are the whole working surface; anything in `bin/` not listed here is their internal library, reached through them, not directly.

- `ctx-orient [path]`: landing on unfamiliar code: identity, runtime, architecture, churn, health in one pass
- `ctx-health [path]`: health dashboard: tsc errors, import cycles, complexity, more
- `ctx-where <symbol>`: where a symbol is defined; not usages
- `ctx-refs <symbol>`: every call site, raw list
- `ctx-impact <symbol>`: blast radius: direct usages plus what those callers export
- `ctx-api <module>`: public API surface: exported symbols with signatures
- `ctx-deps [file]`: prod / dev / peer dependencies from package.json
- `ctx-dead [path]`: exported symbols with no usages outside their own file
- `ctx-env-scan [path]`: every environment variable the codebase reads

## Code review

```
Agent(subagent_type="ctx-reviewer", prompt="review <scope>")
```

Scopes: repo / file / diff; picks its own toolset per scope.

- `ctx-diff`: synthesized view of the current working changes
- `ctx-semantic-diff <file> <refA> <refB>`: how a file's AST structure changed between two git refs
- `ctx-hotspots [path]`: cyclomatic complexity × git churn
- `ctx-complexity <file>`: cyclomatic complexity per function
- `ctx-todo [path]`: TODO/FIXME/etc, grouped by type
- `ctx-duplicates [path]`: structurally similar files
- `ctx-migration`: behavioral equivalence across a library migration

## Testing

- `ctx-test`: run the project's tests, compressed to signal
- `ctx-test-gen <file>`: generate tests from the TypeScript AST, with dissonance detection

## Generating and fixing

- `ctx-fix <preset> <path>`: named presets for common TS/JS issues
- `ctx-codemod <from> <to> <path>`: structural transformation via ast-grep
- `ctx-scaffold <file>`: new file skeleton, modelled on detected project conventions
- `ctx-stale-docs [path]`: detect and fix stale JSDoc `@param` / `@returns`
- `comby 'f(:[a], :[b])' 'g(:[a], :[b])' .ts -in-place`: structural replace for multi-line content; use when ctx-codemod's single-node patterns aren't enough; `-stdout` for dry-run

## Output and utilities

- `json-shape`: replace JSON values with types; arrays collapse to one element
- `yaml-shape`: same for YAML
- `fuzz <query> [path]`: fuzzy file find
- `ctx-trim`: trim command output to signal
- `ctx-file <file> [range]`: structural view of a source file, or line-range extraction
- `ctx-stack`: parse a stack trace, drop library frames, show project code

## The shop

**Runtime:**
- Node: nvm loaded; `nvm use <version>` to switch
- Bun: preferred where `bunfig.toml` present
- Python: system `python3` only; no version manager here

**Git:**
- `push.default = current` / `pull.rebase = false`
- `git lg` / `git lb` / `git recent`; `git summary` / `git effort` / `git changelog`
- `difft` (difftastic): structural diff: `GIT_EXTERNAL_DIFF=difft git diff`

**Data tools:**
- `jq` / `yq` / `dasel`: JSON / YAML / any format
- `jo`: build JSON from args: `jo name=foo tags[]=a`
- `gron`: flatten JSON to greppable paths
- `mlr`: awk for CSV/TSV/JSON: `mlr --csv filter '$age > 26' file.csv`
- `htmlq`: CSS queries on HTML: `curl url | htmlq 'a' --attribute href`
- `jc`: any command → JSON: `ps aux | jc --ps | jq`
- `freq <pattern> [paths]`: frequency count of matches, prefix-safe (replaces the rg -oIN | sort | uniq -c dance)

**Code analysis:**
- `sg`: AST pattern search: `sg -p 'function $F($$$)' --lang ts`
- `semgrep`: semantic cross-file analysis: `semgrep --config=auto .`

**System:**
- `chronic`: silence unless fails; `ts`: timestamp stdin; `sponge`: in-place pipe

**Standard kit** (installed, no notes needed): `gh`, `shellcheck` / `ruff` / `biome`, `gitleaks`, `grpcurl` / `websocat`, `just`, `watchexec`, `hyperfine`, `bats`, `sd`, `lnav`, `tldr`; `fd` / `rg` (ignore configs active)

**rg traps** (earned scars):
- Extraction pipelines: add `-IN` before `-o | sort | uniq -c`, or filename:line prefixes pollute the counts
- Exits 1 on no-match (breaks `&&` chains) and 2 on error; a downstream `| head` swallows both. Verify rg alone, then pipe

**Aliases:**
- `i`: `bun i` or `npm i` (detects `bunfig.toml`)
- `ci`: frozen install
- `jq` → `-M`, `curl` → `-sLf`, `bat` → `--style=plain --color=never`, `diff` → `-u`
- `port <n>`: what's listening on port n

**Auth:** Anthropic: token in env. GitHub via `gh` (also answers git's credential helper).

## The back shelf

Heavier instruments for bigger jobs.

- `ctx-symbol <name> [path]`: definition + usages + history in one call (subsumes where / refs / history)
- `ctx-arch [path] [--cycles-only]`: module dependency graph: coupling table (in/out), cycle detection; ⚠ marks when dynamic loaders make the graph partial
- `ctx-unused-deps [path]`: packages declared but never imported; Node/Bun and Python
- `ctx-mr-review [branch] [--base main]`: 🔴 critical (guard removal, try/catch dropped, signature drift, tsc errors) + 🟡 warnings; exits 2/1/0
- `ctx-rhythm <file|dir>`: flags when functions in the same module throw vs return null, or names promise a value but return void
- `ctx-audit [path]`: security and quality scan via `semgrep --config=auto`
- `ctx-mutate <file> [test-file]`: surviving mutations are uncovered behaviour
- `ctx-types <file|stdin>`: TypeScript types from a JSON sample or JSON schema
- `ctx-fragment list|show|expand`: composable TS fragments; `ctx-fragment expand repository ENTITY=User`
