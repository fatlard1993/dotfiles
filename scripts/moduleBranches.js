#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

function getChildFolders(folder){
	return fs.readdirSync(folder).filter((entry) => {
		const stats = fs.lstatSync(path.join(folder, entry));

		return stats.isDirectory() && !stats.isSymbolicLink();
	});
}

const baseFolder = process.argv[2];
const folders = getChildFolders(baseFolder);
const logColor = {
	reset: '\x1b[0m',
	blue: '\x1b[34m',
	yellow: '\x1b[33m',
	green: '\x1b[32m',
	red: '\x1b[31m'
};

folders.forEach((folder) => {
	if(folder === 'node_modules') return;

	if(process.argv[3] === 'fix'){
		exec(`cd ${path.join(baseFolder, folder)} && git remote set-head origin -a && git fetch -p`, (err, stdout, stderr) => {
			if(stdout) console.log(`${logColor.blue}${folder}${logColor.reset}\n${stdout}`);
		});

		return;
	}

	exec(`cd ${path.join(baseFolder, folder)} && git branch -r`, (err, remoteBranches, stderr) => {
		remoteBranches = remoteBranches.replace(/origin\//g, '');

		exec(`cd ${path.join(baseFolder, folder)} && git rev-parse --abbrev-ref HEAD`, (err, currentBranch, stderr) => {
			currentBranch = currentBranch.replace('\n', '');
			var remoteBranchMatch = remoteBranches.match(/HEAD\s->\s(.*)/);

			if(!remoteBranchMatch) return console.log(`${logColor.red}Could not read branches for folder: ${folder}${logColor.reset}\n`);

			currentBranch = logColor[currentBranch === remoteBranchMatch[1] ? 'green' : 'red'] + currentBranch + logColor.reset;

			console.log(`${folder} : ${currentBranch}\n${remoteBranches.replace(/.*HEAD\s->\s.*\n/, '').replace(new RegExp(`.*${remoteBranchMatch[1]}\n`), '')}`);
		});
	});
});