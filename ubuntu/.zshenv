#!/bin/zsh

for file in $HOME/.dotfiles/ubuntu/.zshenv.d/*(N.); source $file

source "$HOME/.dotfiles/.zshenv"
