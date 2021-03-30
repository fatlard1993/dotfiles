## $HOME/.zshrc


## NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


## PROMPT
function git_branch_name()
{
  branch=$(git symbolic-ref HEAD 2> /dev/null | awk 'BEGIN{FS="/"} {print $NF}')
  if [[ $branch == "" ]]; then
    :
  else
    echo "%F{cyan}[$(git name-rev --name-only @)]%f"
  fi
}
newline=$'\n'
user="%F{green}[%n]%f"
host="%F{magenta}[%m]%f"
directory="%F{blue}[%~]%f"
time="[%*]"

setopt prompt_subst

prompt='${newline}┏${time}${tty}${user}${host}${directory}$(git_branch_name)${newline}┗ %% '


## PATH
export PATH="/usr/local/opt/mongodb-community@3.6/bin:/usr/local/opt/rabbitmq/sbin:$PATH"


## MISC
setopt HIST_IGNORE_ALL_DUPS


## ALIAS
alias l='ls -G'
alias ls='ls -G'


## KEYBINDS
# https://web.cs.elte.hu/local/texinfo/zsh/zsh_10.html
bindkey "^[[H"     beginning-of-line
bindkey "^[[F"     end-of-line
bindkey "^[[3~"    delete-char
bindkey "^[[3;3~"  kill-word
bindkey "^[[3;5C"  kill-word
bindkey "^[[1;3D"  backward-word
bindkey "^[[1;5D"  backward-word
bindkey "^[[1;3C"  forward-word
bindkey "^[[1;5C"  forward-word
bindkey "≥"        insert-last-word