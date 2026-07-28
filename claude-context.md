## Analysis

Curated — `ls ~/.dotfiles/bin/ctx-*` for the full set.

- `ctx-orient [path]` — landing on unfamiliar code: identity, runtime, architecture, churn, health in one pass
- `ctx-health [path]` — health dashboard: TypeScript errors, import cycles, complexity, and three more checks
- `ctx-where <symbol>` — where a symbol is defined; not usages
- `ctx-refs <symbol>` — every call site, raw list
- `ctx-impact <symbol>` — blast radius: direct usages plus what those callers export
- `ctx-api <module>` — public API surface: exported symbols with signatures
- `ctx-deps [file]` — prod / dev / peer dependencies from package.json
- `ctx-dead [path]` — exported symbols with no usages outside their own file
- `ctx-env-scan [path]` — every environment variable the codebase reads

## Code review

```
Agent(subagent_type="ctx-reviewer", prompt="review <scope>")
```

Three scopes: **Repo/folder** — orient + health + todo + hotspots. **File** — complexity + fix + stale-docs + test-gen. **MR/diff** — diff → semantic-diff → migration if a library swap is detected.

- `ctx-diff` — synthesized view of the current working changes
- `ctx-semantic-diff <file> <refA> <refB>` — how a file's AST structure changed between two git refs
- `ctx-hotspots [path]` — cyclomatic complexity × git churn
- `ctx-complexity <file>` — cyclomatic complexity per function
- `ctx-todo [path]` — TODO/FIXME/HACK/XXX/NOTE/REVIEW, grouped by type
- `ctx-duplicates [path]` — structurally similar files that may want a shared abstraction
- `ctx-migration` — behavioral equivalence across a library migration

## Testing

- `ctx-test` — run the project's tests, compressed to signal
- `ctx-test-gen <file>` — generate tests from the TypeScript AST, with dissonance detection

## Generating and fixing

- `ctx-fix <preset> <path>` — named presets for common TS/JS issues; no pattern knowledge needed
- `ctx-codemod <from> <to> <path>` — structural transformation via ast-grep
- `ctx-scaffold <file>` — new file skeleton, modelled on detected project conventions
- `ctx-stale-docs [path]` — detect and fix stale JSDoc `@param` / `@returns`
- `comby 'f(:[a], :[b])' 'g(:[a], :[b])' .ts -in-place` — structural replace for multi-line content; use when ctx-codemod's single-node patterns aren't enough; `-stdout` for dry-run

## Output and utilities

- `json-shape` — replace JSON values with types; arrays collapse to one element
- `yaml-shape` — same for YAML
- `fuzz <query> [path]` — fuzzy file find; handles typos and approximate names
- `ctx-trim` — trim command output by signal: errors and structure first, noise dropped
- `ctx-file <file> [range]` — structural view of a source file, or line-range extraction
- `ctx-stack` — parse a stack trace, drop library frames, show project code

## The shop

**Runtime:**
- Node — nvm loaded; `nvm use <version>` to switch
- Bun — preferred where `bunfig.toml` present
- Python — system `python3` only; no version manager here

**Git:**
- `push.default = current` / `pull.rebase = false`
- `git lg` / `git lb` / `git recent`

**Data tools:**
- `jq` / `yq` / `dasel` — JSON / YAML / any format
- `jo` — build JSON from args: `jo name=foo tags[]=a`
- `gron` — flatten JSON to greppable paths
- `mlr` — awk for CSV/TSV/JSON: `mlr --csv filter '$age > 26' file.csv`
- `htmlq` — CSS queries on HTML: `curl url | htmlq 'a' --attribute href`
- `jc` — any command → JSON: `ps aux | jc --ps | jq`

**Code analysis:**
- `sg` — AST pattern search: `sg -p 'function $F($$$)' --lang ts`
- `semgrep` — semantic cross-file analysis: `semgrep --config=auto .`
- `shellcheck` / `ruff` / `biome` — validate shell / Python / JS·TS

**Git and change:**
- `gh` / `glab` — GitHub / GitLab
- `git summary` / `git effort` / `git changelog` — repo stats, file churn, changelog
- `difftastic` — structural diff: `GIT_EXTERNAL_DIFF=difft git diff`
- `gitleaks` — scan for committed secrets: `gitleaks detect`

**Protocols:**
- `grpcurl` — gRPC: `grpcurl -plaintext host:port service/Method`
- `websocat` — WebSocket: `websocat ws://host/path`

**Workflow:**
- `just` — task runner: `just --list`
- `watchexec` — rerun on change: `watchexec -e ts bun test`
- `hyperfine` — benchmark: `hyperfine 'cmd1' 'cmd2'`
- `bats` — bash test framework
- `fd` / `rg` — file / content search (ignore configs active)
- `sd` — find-replace: `sd '$old' '$new' file`

**System:**
- `lnav` — log navigator: `lnav app.log` or `cmd 2>&1 | lnav`
- `chronic` — silence unless fails; `ts` — timestamp stdin; `sponge` — in-place pipe
- `tldr` — command reference without the man page

**Aliases:**
- `i` — `bun i` or `npm i` (detects `bunfig.toml`)
- `ci` — frozen install
- `jq` → `-M`, `curl` → `-sLf`, `bat` → `--style=plain --color=never`, `diff` → `-u`
- `port <n>` — what's listening on port n

**Auth:** GitLab, Anthropic — tokens in env. GitHub via `gh` (also answers git's credential helper).
