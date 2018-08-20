const fs = require('fs');
const exec = require('child_process').exec;

const CMD = process.env.CMD.split(' ');

var Info;

function updateInfo(cb){
	exec('i3-msg -t get_tree', function(err, stdout, stderr){
		if(err) return cb(err);

		try{
			Info = JSON.parse(stdout);
		}
		catch(e){
			return cb(e);
		}

		// console.log(JSON.stringify(Info, null, '  '));

		cb();
	});
}

function getWorkspaces(cb){
	exec('i3-msg -t get_workspaces', function(err, stdout, stderr){
		if(err) return cb(err);

		try{
			var workspaces = JSON.parse(stdout);
		}
		catch(e){
			return cb(e);
		}

		console.log(JSON.stringify(workspaces, null, '  '));

		cb(null, workspaces);
	});
}

function getFocusedWorkspace(cb){
	getWorkspaces(function(err, workspaces){
		if(err) return cb(err);

		var focused, x = 0, count = workspaces.length;

		for(; x < count; ++x){
			if(!workspaces[x].focused) continue;

			focused = workspaces[x];
		}

		cb(null, focused);
	});
}

function filterWindows(nodes, scratchpad_state){
	var windows = [], x = 0, count = nodes.length;

	for(; x < count; ++x){
		if(nodes[x].nodes && nodes[x].nodes.length) windows = windows.concat(filterWindows(nodes[x].nodes, nodes[x].scratchpad_state));
		if(nodes[x].floating_nodes && nodes[x].floating_nodes.length) windows = windows.concat(filterWindows(nodes[x].floating_nodes, nodes[x].scratchpad_state));

		if(nodes[x].window === null || (nodes[x].window_properties && nodes[x].window_properties.class === 'i3bar')) continue;

		nodes[x].scratchpad_state = scratchpad_state || 'none';

		windows.push(nodes[x]);

		// console.log(JSON.stringify(nodes[x], null, '  '));
		console.log(`\n${nodes[x].window_properties.instance} : ${nodes[x].scratchpad_state !== 'none' ? 'SCRATCHPAD' : 'WORKSPACE'}`);
	}

	return windows;
}

function getWindows(cb){
	updateInfo(function(err){
		if(err) return cb(err);

		cb(null, filterWindows(Info.nodes));
	});
}

function getScratchpads(cb){
	getWindows(function(err, windows){
		if(err) return cb(err);

		var scratchpads = [], x = 0, count = windows.length;

		for(; x < count; ++x){
			if(windows[x].scratchpad_state === 'none') continue;

			scratchpads.push(windows[x]);

			// console.log(JSON.stringify(windows[x], null, '  '));
		}

		cb(null, scratchpads);
	});
}

updateInfo(function(err){
	if(err) return console.error(err);

	console.log(CMD);

	if(CMD[0] === 'move'){
		getFocusedWorkspace(function(err, workspace){
			if(err) return console.error(err);

			var newWorkspaceNumber;

			if(CMD[1] === 'next') newWorkspaceNumber = workspace.num + 1;

			else if(CMD[1] === 'prev') newWorkspaceNumber = Math.max(0, workspace.num - 1);

			exec(`i3-msg "move container to workspace number ${newWorkspaceNumber}", workspace number ${newWorkspaceNumber}`, function(){
				console.log('moved container | ', arguments);
			});
		});
	}

	else if(CMD[0] === 'scratchpad'){
		getScratchpads(function(err, scratchpads){
			if(err) return console.error(err);

			return console.log('\nscratchpad count: ', scratchpads.length);
		});
	}

	else if(CMD[0] === 'windows'){
		getWindows(function(err, windows){
			if(err) return console.error(err);

			return console.log('\nwindow count: ', windows.length);
		});
	}
});