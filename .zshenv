#!/bin/zsh

export EDITOR='/usr/local/bin/code'
export VISUAL='/usr/local/bin/code'
export PAGER='less'

for file in $HOME/.dotfiles/.zshenv.d/*(.); source $file

for file in $HOME/.zshenv.d/*(.); source $file
