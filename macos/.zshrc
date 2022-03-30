#!/bin/zsh

for file in $HOME/.dotfiles/macos/.zshrc.d/*(N.); source $file

source "$HOME/.dotfiles/.zshrc"
