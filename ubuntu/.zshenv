#!/bin/zsh

for file in $HOME/.dotfiles/ubuntu/.zshenv.d/*(.); source $file

source "$HOME/.dotfiles/.zshenv"
