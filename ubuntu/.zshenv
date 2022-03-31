#!/bin/zsh

. "$HOME/.dotfiles/.zshenv"

for file in $HOME/.dotfiles/ubuntu/.zshenv.d/*; . "$file"
