#!/bin/zsh

source "$HOME/.dotfiles/bin/lib/dot-util" "$0" "$@"

unsetopt nomatch

fpath=($dotfilesPath/zshcompletion $fpath)

# fpath=($binPath/completion $fpath)

# Enable completions
autoload -Uz compinit && compinit

# Support urls without quotes
autoload -Uz url-quote-magic
zle -N self-insert url-quote-magic

for file in $dotfilesPath/.zshrc.d/*(.); source $file

for file in $HOME/.zshrc.d/*(.); source $file
