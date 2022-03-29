#!/bin/zsh

for file in $HOME/.dotfiles/macos/.zshenv.d/*(N.); source $file

source "$HOME/.dotfiles/.zshenv"
