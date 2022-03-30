#!/bin/zsh

for file in $HOME/.dotfiles/macos/.zshrc.d/*; source $file

source "$HOME/.dotfiles/.zshrc"
