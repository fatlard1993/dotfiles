## Analysis

- `ctx-symbol <name> [path]` — definition + usages + history in one call; one shot beats running three separate tools
- `ctx-arch [path] [--cycles-only]` — module dependency graph: coupling table (in/out), cycle detection; ⚠ marks when dynamic loaders make the graph partial
- `ctx-unused-deps [path]` — packages declared but never imported; Node/Bun and Python
- `ctx-deps [file]` — prod / dev / peer dependencies from package.json

## Code review

```
Agent(subagent_type="ctx-reviewer", prompt="review <scope>")
```

Three scopes: **Repo/folder** — orient + health + todo + hotspots + rhythm + arch. **File** — complexity + fix + stale-docs + test-gen. **MR/diff** — mr-review → semantic-diff → migration if library swap detected.

- `ctx-mr-review [branch] [--base main]` — 🔴 critical (guard removal, try/catch dropped, signature drift, tsc errors) + 🟡 warnings; exits 2/1/0
- `ctx-rhythm <file|dir>` — flags when functions in the same module throw vs return null, or names promise a value but return void
- `ctx-audit [path]` — security and quality scan via `semgrep --config=auto`

## Testing

- `ctx-mutate <file> [test-file]` — surviving mutations are uncovered behaviour

## Generating

- `ctx-types <file|stdin>` — TypeScript types from a JSON sample or JSON schema
- `ctx-fragment list|show|expand` — composable TS fragments; `ctx-fragment expand repository ENTITY=User`
- `comby 'f(:[a], :[b])' 'g(:[a], :[b])' .ts -in-place` — structural replace for multi-line content; use when ctx-codemod's single-node patterns aren't enough; `-stdout` for dry-run

## Output and utilities

- `json-shape` — replace JSON values with types; arrays collapse to one element
- `yaml-shape` — same for YAML
- `fuzz <query> [path]` — fuzzy file find; handles typos and approximate names

## The shop

**Runtime:**
- Node — nvm loaded; `nvm use <version>` to switch
- Bun — preferred where `bunfig.toml` present
- Java — temurin-21 default; also 8, 25. Switch: `export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-X.jdk/Contents/Home`
- Python — call explicitly: `python3.9` through `python3.13`

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
- `vacuum` — OpenAPI validation: `vacuum lint spec.yaml`

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
- `mongosh` — MongoDB shell (4.2, 5.0, 7.0 installed)

**Aliases:**
- `i` — `bun i` or `npm i` (detects `bunfig.toml`)
- `ci` — frozen install
- `jq` → `-M`, `curl` → `-sLf`, `bat` → `--style=plain --color=never`, `diff` → `-u`
- `port <n>` — what's listening on port n

**Auth:** GitLab, Snyk, Anthropic — tokens in env. GitHub via `gh`.
