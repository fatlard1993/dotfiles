#!/bin/zsh

# fpath=($ubuntuPath/bin/completion $fpath)

for file in $HOME/.dotfiles/ubuntu/.zshrc.d/*(.); source $file

source "$HOME/.dotfiles/.zshrc"
