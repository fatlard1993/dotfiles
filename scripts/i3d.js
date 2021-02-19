#!/usr/bin/env node

const argi = require('argi');

argi.parse({
	verbosity: {
		type: 'int',
		alias: 'v',
		defaultValue: 1
	},
	command: {
		alias: 'c'
	},
	argument: {
		alias: 'a'
	}
});

const options = argi.options.named;

const i3 = require('i3').createClient();
const log = new (require('log'))({ tag: 'i3d', defaults: { verbosity: options.verbosity, color: true } });

// i3.command('focus left');

// i3.tree(console.log);

// i3.on('workspace', (evt) => {
//   console.log('workspace event: ', evt);
// });

const i3d = {
	exit: function(){
		process.kill(process.pid, 'SIGTERM');
	},
	sendCommand: (command, done = log) => {
		i3.command(command, (err, result) => {
			if(err){
				log.error(`Error running command "${command}"`, err);

				return done([]);
			}

			done(result);
		});
	},
	getWorkspaces: (done = log) => {
		i3.workspaces((err, workspaces) => {
			if(err){
				log.error('Cant get workspaces', err);

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
	container: {
		strafe: (direction = 'next', done) => {
			i3d.getFocusedWorkspace((workspace, workspaces) => {
				let index = workspaces.indexOf(workspace);

				if(direction === 'next'){
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
		scratchpad: () => {
			// exec(`i3-msg '[con_mark="sp_${scratchpadName}"] mark "!sp", [con_mark="sp_${scratchpadName}"] unmark'`, function(){
			// 	console.log('sp move step 1 ', arguments);

			// 	exec(`sleep .1s && i3-msg 'mark "sp_${scratchpadName}", [con_mark="sp*"] move scratchpad, [con_mark="sp_${scratchpadName}"] scratchpad show'`, function(){
			// 		console.log('sp move step 2 ', arguments);

			// 		exec(`sleep .1s && i3-msg '[con_mark="!sp"] move to workspace "scratchpad dump", [con_mark="!sp"] floating disable, [con_mark="!sp"] unmark'`, function(){
			// 			console.log('sp move step 3 ', arguments);
			// 		});
			// 	});
			// });
		}
	},
	showScratchpad: () => {
		//[con_mark="sp*"] move scratchpad, [con_mark="sp_7"] scratchpad show
	}
};

if(options.command){
	if(options.command === 'move-prev') i3d.container.strafe('prev', i3d.exit);
	else if(options.command === 'move-next') i3d.container.strafe('next', i3d.exit);
}

else{
	process.openStdin().addListener('data', function(data){
		data = data.toString().replace(/\n+$/, '');

		log.info(`STDIN: ${data}`);

		if({ stop: 1, close: 1, exit: 1, kill: 1 }[data]){
			process.kill(process.pid, 'SIGTERM');
		}

		else if(data === 'p'){
			i3d.container.strafe('prev');
		}

		else if(data === 'n'){
			i3d.container.strafe();
		}
	});
}