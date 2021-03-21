
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Alt+Delete
forward-kill-dir () {
	local WORDCHARS=${WORDCHARS/\/}
	zle kill-word
}
zle -N forward-kill-dir
bindkey '^[[3;5~' forward-kill-dir

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