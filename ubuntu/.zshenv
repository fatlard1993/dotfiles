#!/bin/zsh

source "$HOME/.dotfiles/.zshenv"

for file in $HOME/.dotfiles/ubuntu/.zshenv.d/*; source $file
