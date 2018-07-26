const fs = require('fs');
const exec = require('child_process').exec;

var CMD = process.env.CMD.split(' ');

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