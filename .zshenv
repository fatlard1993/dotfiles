#!/bin/zsh

for file in $HOME/{.dotfiles/,}.zshenv.d/*; . "$file"