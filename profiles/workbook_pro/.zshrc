## $HOME/.zshrc

. "$HOME/.dotfiles/macos/.zshrc"


autoload -Uz compinit && compinit

# bun completions
[ -s "/Users/chase.whitfield/.bun/_bun" ] && source "/Users/chase.whitfield/.bun/_bun"
