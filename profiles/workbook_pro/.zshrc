## $HOME/.zshrc

. "$HOME/.dotfiles/macos/.zshrc"

fpath=($ITENTIAL_FOLDER/itential-env/completion $fpath)

autoload -Uz compinit && compinit

# bun completions
[ -s "/Users/chase.whitfield/.bun/_bun" ] && source "/Users/chase.whitfield/.bun/_bun"
