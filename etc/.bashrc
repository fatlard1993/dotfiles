for file in $HOME/.bashrc.d/*; do
	if [ -f $file ]; then source $file; fi
done

source $HOME/.bash_profile