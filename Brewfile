# Cross-platform CLI tools, installed the same way on macOS and Ubuntu.
# OS-specific/GUI stuff stays in macos/Brewfile or the ubuntu aptfiles.

brew "fzf"
brew "ripgrep"
brew "fd"
brew "bat"
brew "jq"
brew "yq"
brew "gh"
brew "git-lfs"
brew "zoxide"
brew "tree"
brew "just"
brew "shellcheck"
brew "sd"
brew "semgrep"

# Not a CLI tool: a library for the python3 on PATH. Homebrew's python shadows
# the system one on both platforms and cannot see apt's /usr/lib/python3/
# dist-packages, so `apt install python3-pil` leaves `import PIL` still failing.
# Installed here it lands in brew's own site-packages, where python3 looks.
brew "pillow"

# The shelf claude-context.md advertises. Four have a formula name that is not
# the command they install: ast-grep is `sg`, miller is `mlr`, bats-core is
# `bats`, and tlrc is `tldr` (the tldr-pages project's own client, of several
# that provide that command).
brew "ast-grep"
brew "biome"
brew "comby"
brew "gitleaks"
brew "ruff"

brew "gron"
brew "htmlq"
brew "jc"
brew "jo"
brew "miller"

brew "grpcurl"
brew "websocat"

brew "bats-core"
brew "hyperfine"
brew "lnav"
brew "tlrc"
brew "watchexec"

# Also advertised on the shelf. moreutils is the three of them: `chronic`,
# `sponge`, `ts`. difftastic's command is `difft`.
brew "dasel"
brew "difftastic"
brew "moreutils"
