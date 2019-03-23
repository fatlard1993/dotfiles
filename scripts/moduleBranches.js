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

folders.forEach((folder) => {
	exec(`cd ${path.join(baseFolder, folder)} && git branch -r`, (err, stdout, stderr) => {
		console.log(folder, '\n', stdout);
	});
});