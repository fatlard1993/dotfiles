#!/bin/zsh

for file in $HOME/.dotfiles/.zshrc.d/*(N.); source $file

for file in $HOME/.zshrc.d/*(N.); source $file
