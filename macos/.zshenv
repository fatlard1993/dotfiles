#!/bin/zsh

source "$HOME/.dotfiles/.zshenv"

for file in $HOME/.dotfiles/macos/.zshenv.d/*; source $file
