#!/bin/zsh

source "$HOME/.dotfiles/.zshrc"

for file in $HOME/.dotfiles/macos/.zshrc.d/*; source $file
