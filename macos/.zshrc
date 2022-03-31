#!/bin/zsh

. "$HOME/.dotfiles/macos/.zshrc.d/polyfill"

. "$HOME/.dotfiles/.zshrc"

for file in $HOME/.dotfiles/macos/.zshrc.d/*; . "$file"
