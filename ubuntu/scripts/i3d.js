#!/usr/bin/env node

const path = require('path');

function rootPath(){ return path.join(__dirname, '..', ...arguments); }

process.chdir(rootPath());

const argi = require('argi');

argi.parse({
	verbosity: {
		type: 'int',
		alias: 'v',
		defaultValue: 1
	}
});

const options = argi.options.named;

const i3 = require('i3').createClient();
const log = new (require('log'))({ tag: 'i3d', defaults: { verbosity: options.verbosity, color: true } });

log(1)('options', argi.options);

const i3d = {
	rootPath,
	exit: function(){
		process.kill(process.pid, 'SIGTERM');
	},
	error: function(message, err){
		log.error(message);

		throw new Error(err);
	},
	sendCommand: (command, done = log) => {
		i3.command(command, (err, result) => {
			if(err){
				i3d.error(`Error running command "${command}"`, err);

				return done([]);
			}

			done(result);
		});
	},
	getWorkspaces: (done = log) => {
		i3.workspaces((err, workspaces) => {
			if(err){
				i3d.error('Cant get workspaces', err);

				return done([]);
			}

			i3d.workspaceCount = workspaces.length;

			done(workspaces);
		});
	},
	getFocusedWorkspace: (done = log) => {
		i3d.getWorkspaces((workspaces) => {
			let focused;

			for(let x = 0; x < i3d.workspaceCount; ++x){
				if(!workspaces[x].focused) continue;

				focused = workspaces[x];

				break;
			}

			done(focused, workspaces);
		});
	},
	workspace: {
		rename: (number, name, color, done = log) => {
			i3d.getFocusedWorkspace((workspace) => {
				i3d.sendCommand(`rename workspace number ${workspace.num} to "${number}<span foreground='${color}' weight='heavy'>${number} ${name}</span>"`, done);
			});
		}
	},
	scratchpad: {
		show: (name, done) => {
			i3d.sendCommand(`[con_mark="sp*"] move scratchpad, [con_mark="sp_${name}"] scratchpad show`, done);
		},
		hide: (done) => {
			i3d.sendCommand(`[con_mark="sp*"] move scratchpad`, done)
		},
		dump: (done) => {
			i3d.sendCommand(`[con_mark="sp*"] move to workspace "scratchpad dump", [con_mark="sp*"] floating disable, [con_mark="sp*"] unmark, workspace "scratchpad dump"`, done);
		}
	},
	container: {
		strafe: (direction = 'right', done) => {
			i3d.getFocusedWorkspace((workspace, workspaces) => {
				let index = workspaces.indexOf(workspace);

				if(direction === 'right'){
					++index;

					if(index > i3d.workspaceCount - 1) index = 0;
				}

				else{
					--index;

					if(index < 0) index = i3d.workspaceCount - 1;
				}

				const number = workspaces[index].num;

				i3d.sendCommand(`move container to workspace number ${number}, workspace number ${number}`, done);
			});
		},
		addToScratchpad: (name, done) => {
			i3d.sendCommand(`[con_mark="sp_${name}"] mark "!sp", [con_mark="sp_${name}"] unmark`, () => {
				i3d.sendCommand(`mark "sp_${name}", [con_mark="sp*"] move scratchpad, [con_mark="sp_${name}"] scratchpad show`, () => {
					i3d.sendCommand(`[con_mark="!sp"] move to workspace "scratchpad dump", [con_mark="!sp"] floating disable, [con_mark="!sp"] unmark`, done);
				});
			});
		},
	}
};

if(argi.options.subCommands){
	const cmd = argi.options.subCommands;

	if(i3d[cmd[0]] && i3d[cmd[0]][cmd[1]]) i3d[cmd[0]][cmd[1]](cmd[2] ? cmd[2] : i3d.exit, cmd[2] ? i3d.exit : null);

	else i3d.error('Unknown command', cmd);
}

else{
	process.openStdin().addListener('data', function(data){
		data = data.toString().replace(/\n+$/, '');

		log.info(`STDIN: ${data}`);

		if({ stop: 1, close: 1, exit: 1, kill: 1 }[data]) process.kill(process.pid, 'SIGTERM');

		else if(data === 'csr') i3d.container.strafe('right');

		else if(data === 'csl') i3d.container.strafe('left');

		else if(data.startsWith('cs ')) i3d.scratchpad.show(data.replace('cs ', ''));

		else if(data.startsWith('ss ')) i3d.scratchpad.show(data.replace('ss ', ''));
	});
}