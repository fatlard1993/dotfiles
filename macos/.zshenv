#!/bin/zsh

for file in $HOME/.dotfiles/macos/.zshenv.d/*; source $file

source "$HOME/.dotfiles/.zshenv"
