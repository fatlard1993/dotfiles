#!/bin/zsh

for file in $HOME/.dotfiles/.zshenv.d/*(N.); source $file

for file in $HOME/.zshenv.d/*(N.); source $file
