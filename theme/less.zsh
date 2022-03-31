#!/bin/zsh

# https://unix.stackexchange.com/questions/108699/documentation-on-less-termcap-variables
# https://unix.stackexchange.com/questions/119/colors-in-man-pages/147#147

# Get color support for 'less'
export LESS="--RAW-CONTROL-CHARS"

red=1
green=2
yellow=3
blue=4
magenta=5
cyan=6
white=7
grey=8
redBright=9
greenBright=10
yellowBright=11
blueBright=12
magentaBright=13
cyanBright=14
whiteBright=15

export LESS_TERMCAP_mb=$(tput bold; tput setaf $green)
export LESS_TERMCAP_md=$(tput bold; tput setaf $blueBright)
export LESS_TERMCAP_me=$(tput sgr0)
export LESS_TERMCAP_so=$(tput bold; tput setaf $yellow; tput setab $blue)
export LESS_TERMCAP_se=$(tput rmso; tput sgr0)
export LESS_TERMCAP_us=$(tput smul; tput bold; tput setaf $white7)
export LESS_TERMCAP_ue=$(tput rmul; tput sgr0)
export LESS_TERMCAP_mr=$(tput rev)
export LESS_TERMCAP_mh=$(tput dim)
export LESS_TERMCAP_ZN=$(tput ssubm)
export LESS_TERMCAP_ZV=$(tput rsubm)
export LESS_TERMCAP_ZO=$(tput ssupm)
export LESS_TERMCAP_ZW=$(tput rsupm)
export GROFF_NO_SGR=1         # For Konsole and Gnome-terminal
