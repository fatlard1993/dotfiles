#!/bin/zsh

. "$HOME/.dotfiles/.zshenv"

for file in $HOME/.dotfiles/macos/.zshenv.d/*; . "$file"
