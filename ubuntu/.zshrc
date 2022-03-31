#!/bin/zsh

source "$HOME/.dotfiles/.zshrc"

# fpath=($ubuntuPath/bin/completion $fpath)

for file in $HOME/.dotfiles/ubuntu/.zshrc.d/*; source $file
