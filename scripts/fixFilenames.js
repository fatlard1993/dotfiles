#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const baseFolder = process.cwd();
const files = fs.readdirSync(baseFolder).filter((entry) => {
	const stats = fs.lstatSync(path.join(baseFolder, entry));

	return !stats.isDirectory();
});

files.forEach((filename, index) => {
	if(process.argv[2] === '1' && index !== 1) return;

	var filenameRegex = /(.+)(s\d\de\d\d)(.+)?(?:\.|\s)(?:720|1080|bdr|brr|webr).+(\..+)/i;

	if(!filenameRegex.test(filename)) return console.log('Skipping', filename);

	console.log(`\noldFilename: ${filename}`);

	var fileParts = filename.match(filenameRegex);

	var showName = fileParts[1].replace(/\./g, ' ');

	var seasonEpisode = fileParts[2].toLowerCase();

	var description = fileParts[3] ? ' -'+ fileParts[3].replace(/\./g, ' ') : '';

	var extension = fileParts[4];

	var newFilename = showName + seasonEpisode + description + extension;

	console.log(`newFilename: ${newFilename}`);

	if(process.argv[2] === 'y') fs.rename(filename, newFilename, (err) => { if(err) console.error('ERROR ', err); });
});
