#!/bin/zsh

for file in $HOME/{.dotfiles/,}.zshrc.d/*; . "$file"